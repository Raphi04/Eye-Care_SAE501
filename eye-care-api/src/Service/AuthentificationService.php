<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AuthentificationService
{
    public function getUserIdentifiers(User $user): array
    {
        return $data = [
            'api_token' => $user->getApiToken(),
            'username' => $user->getUsername()
        ];
    }

    public function isPasswordCorrect(User $user, string $password): bool
    {
        $realPassword = $user->getPassword();
        if ($realPassword !== $password) {
            return false;
        }
        return true;
    }
}