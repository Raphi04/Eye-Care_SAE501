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
        $userVisionDisorderResult = $this->entityManager->getRepository(UserVisionDisorderResult::class)->findOneBy([$propriety1 => $value1, $propriety2 => $value2]);

        return $userVisionDisorderResult;
    }

    public function createUserVisionDisorderResult(User $user, VisionDisorder $visionDisorder, int $result): UserVisionDisorderResult
    {
        $userVisionDisorderResult = new UserVisionDisorderResult();
        $userVisionDisorderResult->setUser($user);
        $userVisionDisorderResult->setVisionDisorder($visionDisorder);
        $userVisionDisorderResult->setResult($result);

        return $userVisionDisorderResult;
    }

    public function userVisionDisorderResultsMapping($userVisionDisorderResults): array
    {
        $mappedData = [];

        foreach ($userVisionDisorderResults as $userVisionDisorderResult) {
            $mappedData[] = [
                'id' => $userVisionDisorderResult->getId(),
                'vision_disorder' => $userVisionDisorderResult->getVisionDisorder()->getDisorderName(),
                'result' => $userVisionDisorderResult->getResult(),
            ];
        }

        return $mappedData;
    }

    public function persistAndFlush(UserVisionDisorderResult $userVisionDisorderResult): void
    {
        $this->entityManager->persist($userVisionDisorderResult);
        $this->entityManager->flush();
    }
}