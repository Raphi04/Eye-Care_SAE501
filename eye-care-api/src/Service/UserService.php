<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findUserByPropriety(string $propriety, string $value): ?User
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy([$propriety => $value]);

        return $user;
    }

    public function createUser(string $email, string $username, string $password): User
    {
        define('DEFAULT_ROLE', 'ROLE_USER');

        $user = new User();
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($password);
        $user->setRoles([DEFAULT_ROLE]);

        return $user;
    }

    public function usersMapping(array $users): array
    {
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'password' => $user->getPassword(),
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
            'password' => $user->getPassword(),
            'role' => $user->getRoles(),
        ];
    }

    public function persistAndFlush(User $user): void
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}