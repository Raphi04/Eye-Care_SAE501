<?php

namespace App\Service;

use App\Entity\VisionDisorder;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\VisionDisorderService;

class UserVisionDisorderService
{
    private EntityManagerInterface $entityManager;
    private VisionDisorderService $visionDisorderService;

    public function __construct(EntityManagerInterface $entityManager, VisionDisorderService $visionDisorderService)
    {
        $this->entityManager = $entityManager;
        $this->visionDisorderService = $visionDisorderService;
    }

    public function addVisionDisordersToUser(User $user, array $visionDisorderNames): void
    {
        foreach ($visionDisorderNames as $visionDisorderName) {
            $visionDisorder = $this->visionDisorderService->findVisionDisorderByPropriety("disorder_name", $visionDisorderName);
            if (!$visionDisorder) {
                continue;
            }

            $user->addUserVisionDisorder($visionDisorder);
        }
    }

    public function userVisionDisordersMapping($userVisionDisorders): array
    {
        $mappedData = [];

        foreach ($userVisionDisorders as $userVisionDisorder) {
            $mappedData[] = [
                'vision_disorder' => $userVisionDisorder->getDisorderName()
            ];
        }

        return $mappedData;
    }
}