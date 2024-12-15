<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class TokenService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function generateToken(): string
    {
        do
        {
            $randomToken = bin2hex(random_bytes(16));
            $userByApiToken = $this->entityManager->getRepository(User::class)->findOneBy(['apiToken' => $randomToken]);
        }
        while ($userByApiToken !== null);
        
        return $randomToken;
    }

    public function setTokenToUser(User $user, bool $flush)
    {
        $randomToken = $this->generateToken();

        $user->setApiToken($randomToken);
        
        if ($flush)
        {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }
    }

    public function getDatePlus72Hours(): \DateTime
    {
        $currentDateTime = new \DateTime();
        $tokenExpiresAt = $currentDateTime->modify('+3 days');
        
        return $tokenExpiresAt;
    }

    public function setTokenExpiration(User $user, bool $flush): void
    {
        $tokenExpiresAt = $this->getDatePlus72Hours();
        $user->setTokenExpiresAt($tokenExpiresAt);
        
        if ($flush)
        {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }
    }

    public function setUserTokenAndExpiration(User $user, bool $flush): void
    {
        $this->setTokenExpiration($user, $flush);
        $this->setTokenToUser($user, $flush);
    }

    public function isTokenValid(User $user): bool
    {
        $currentDateTime = new \DateTime();
        $tokenExpiration = $user->getTokenExpiresAt();

        if ($tokenExpiration < $currentDateTime){
            return false;
        }
        return true;
    }

    public function removeToken(User $user): void
    {
        $user->setApiToken(null);
        $user->setTokenExpiresAt(null);
        
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}