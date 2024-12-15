<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthentificationService
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function getUserIdentifiers(User $user): array
    {
        return $data = [
            'api_token' => $user->getApiToken(),
            'username' => $user->getUsername()
        ];
    }

    public function isPasswordCorrect(User $user, string $password): bool
    {
        return $this->passwordHasher->isPasswordValid($user, $password);
    }
}