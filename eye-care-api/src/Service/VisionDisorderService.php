<?php

namespace App\Service;

use App\Entity\VisionDisorder;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class VisionDisorderService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findVisionDisorderByPropriety(string $propriety, string $value): ?VisionDisorder
    {
        $visioDisorder = $this->entityManager->getRepository(VisionDisorder::class)->findOneBy([$propriety => $value]);

        return $visioDisorder;
    }

    public function createVisionDisorder(string $disorderName): VisionDisorder
    {
        $visionDisorder = new VisionDisorder();
        $visionDisorder->setDisorderName($disorderName);

        return $visionDisorder;
    }

    public function visionDisorderMapping(VisionDisorder $visionDisorder): array
    {
        return [
            'disorder_name' => $visionDisorder->getDisorderName()
        ];
    }

    public function persistAndFlush(VisionDisorder $visionDisorder): void
    {
        $this->entityManager->persist($visionDisorder);
        $this->entityManager->flush();
    }
}