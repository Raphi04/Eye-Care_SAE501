<?php

namespace App\Service;

use App\Entity\UserVisionDisorderResult;
use App\Entity\VisionDisorder;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\UserVisionDisorderResultService;
use App\Service\UserVisionDisorderService;

class ProfileService
{
    private EntityManagerInterface $entityManager;
    private UserVisionDisorderService $userVisionDisorderService;
    private UserVisionDisorderResultService $userVisionDisorderResultService;

    public function __construct(EntityManagerInterface $entityManager, UserVisionDisorderResultService $userVisionDisorderResultService, UserVisionDisorderService $userVisionDisorderService)
    {
        $this->entityManager = $entityManager;
        $this->userVisionDisorderResultService = $userVisionDisorderResultService;
        $this->userVisionDisorderService = $userVisionDisorderService;
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
}