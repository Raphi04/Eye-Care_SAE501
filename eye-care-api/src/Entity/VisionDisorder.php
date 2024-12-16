<?php

namespace App\Entity;

use App\Repository\VisionDisorderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisionDisorderRepository::class)]
class VisionDisorder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $disorder_name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDisorderName(): ?string
    {
        return $this->disorder_name;
    }

    public function setDisorderName(string $disorder_name): static
    {
        $this->disorder_name = $disorder_name;

        return $this;
    }
}
