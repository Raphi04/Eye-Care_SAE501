<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\Query\ResultSetMappingBuilder;

class UserService
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    public function findUserByPropriety(string $propriety, string $value): ?User
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy([$propriety => $value]);

        return $user;
    }

    public function findByRole(string $role): array
    {
        // The ResultSetMapping maps the SQL result to entities
        $rsm = new ResultSetMappingBuilder($this->entityManager);
        $rsm->addRootEntityFromClassMetadata(User::class, 'u');
    
        $rawQuery = sprintf(
            "SELECT u.*
            FROM user u
            WHERE JSON_CONTAINS(u.roles, :role, '$')",
            $rsm->generateSelectClause()
        );
    
        $query = $this->entityManager->createNativeQuery($rawQuery, $rsm);
        $query->setParameter('role', json_encode($role));
        return $query->getResult();
    }

    public function createUser(string $email, string $username, string $password): User
    {
        define('DEFAULT_ROLE', 'ROLE_USER');

        $user = new User();
        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);

        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($hashedPassword);
        $user->setRoles([DEFAULT_ROLE]);

        return $user;
    }

    public function updateUser(User $user, string $email, string $username, string $password): Void
    {
        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);

        if(!empty($email)){
            $user->setEmail($email);
        }
        if(!empty($username)){
            $user->setUsername($username);
        }
        if(!empty($password)){
            $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
            $user->setPassword($hashedPassword);
        }
    }

    public function usersMapping(array $users): array
    {
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles(),
            ];
        }
        return $data;
    }

    public function userMapping(User $user): array
    {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
        ];
    }

    public function persistAndFlush(User $user): void
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}