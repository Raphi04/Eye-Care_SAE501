<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\UserVisionDisorderResultService;
use App\Service\UserVisionDisorderService;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ProfileService
{
    private UserVisionDisorderService $userVisionDisorderService;
    private UserVisionDisorderResultService $userVisionDisorderResultService;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserVisionDisorderResultService $userVisionDisorderResultService, UserVisionDisorderService $userVisionDisorderService, UserPasswordHasherInterface $passwordHasher)
    {
        $this->userVisionDisorderResultService = $userVisionDisorderResultService;
        $this->userVisionDisorderService = $userVisionDisorderService;
        $this->passwordHasher = $passwordHasher;
    }

    public function profileMapping(User $user, $userVisionDisorderResults, $userVisionDisorders): array
    {
        return [
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'vision_disorder' => $this->userVisionDisorderService->userVisionDisordersMapping($userVisionDisorders),
            'vision_disorder_result' => $this->userVisionDisorderResultService->userVisionDisorderResultsMapping($userVisionDisorderResults)
        ];
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
}