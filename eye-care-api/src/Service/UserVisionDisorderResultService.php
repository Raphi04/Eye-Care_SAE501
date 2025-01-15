<?php

namespace App\Service;

use App\Entity\UserVisionDisorderResult;
use App\Entity\VisionDisorder;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserVisionDisorderResultService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findUserVisionDisorderResultByProprieties(string $propriety1, int $value1, string $propriety2, int $value2): ?UserVisionDisorderResult
    {
        $userVisionDisorder = $this->entityManager->getRepository(UserVisionDisorderResult::class)->findOneBy([$propriety1 => $value1, $propriety2 => $value2]);

        return $userVisionDisorder;
    }

    public function createUserVisionDisorderResult(User $user, VisionDisorder $visionDisorder, int $result): UserVisionDisorderResult
    {
        $userVisionDisorder = new UserVisionDisorderResult();
        $userVisionDisorder->setUser($user);
        $userVisionDisorder->setVisionDisorder($visionDisorder);
        $userVisionDisorder->setResult($result);

        return $userVisionDisorder;
    }

    public function userVisionDisorderResultsMapping($userVisionDisorders): array
    {
        $mappedData = [];

        foreach ($userVisionDisorders as $userVisionDisorder) {
            $mappedData[] = [
                'vision_disorder' => $userVisionDisorder->getVisionDisorder()->getDisorderName(),
                'result' => $userVisionDisorder->getResult(),
            ];
        }

        return $mappedData;
    }

    public function persistAndFlush(UserVisionDisorderResult $userVisionDisorder): void
    {
        $this->entityManager->persist($userVisionDisorder);
        $this->entityManager->flush();
    }
}