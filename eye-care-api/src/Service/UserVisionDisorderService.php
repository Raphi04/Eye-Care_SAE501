<?php

namespace App\Service;

use App\Entity\UserVisionDisorder;
use App\Entity\VisionDisorder;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserVisionDisorderService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findUserVisionDisorderByPropriety(string $propriety, string $value): ?UserVisionDisorder
    {
        $userVisionDisorder = $this->entityManager->getRepository(UserVisionDisorder::class)->findOneBy([$propriety => $value]);

        return $userVisionDisorder;
    }

    public function findUserVisionDisorderByProprieties(string $propriety1, int $value1, string $propriety2, int $value2): ?UserVisionDisorder
    {
        $userVisionDisorder = $this->entityManager->getRepository(UserVisionDisorder::class)->findOneBy([$propriety1 => $value1, $propriety2 => $value2]);

        return $userVisionDisorder;
    }

    public function createUserVisionDisorder(User $user, VisionDisorder $visionDisorder, int $result): UserVisionDisorder
    {
        $userVisionDisorder = new UserVisionDisorder();
        $userVisionDisorder->setUser($user);
        $userVisionDisorder->setVisionDisorder($visionDisorder);
        $userVisionDisorder->setResult($result);

        return $userVisionDisorder;
    }

    public function userVisionDisordersMapping($userVisionDisorders): array
    {
        foreach ($userVisionDisorders as $userVisionDisorder) {
            $mappedData[] = [
                'vision_disorder' => $userVisionDisorder->getVisionDisorder()->getDisorderName(),
                'result' => $userVisionDisorder->getResult(),
            ];
        }

        return $mappedData;
    }

    public function userAndVisionDisordersMapping(User $user, $userVisionDisorders): array
    {
        return [
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'vision_disorders' => $this->userVisionDisordersMapping($userVisionDisorders)
        ];
    }

    public function persistAndFlush(UserVisionDisorder $userVisionDisorder): void
    {
        $this->entityManager->persist($userVisionDisorder);
        $this->entityManager->flush();
    }
}