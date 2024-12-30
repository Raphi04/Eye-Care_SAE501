<?php

namespace App\Entity;

use App\Repository\UserVisionDisorderResultRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserVisionDisorderResultRepository::class)]
class UserVisionDisorderResult
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $result = null;

    #[ORM\ManyToOne(inversedBy: 'userVisionDisorderResults')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user = null;

    #[ORM\ManyToOne(inversedBy: 'userVisionDisorderResults')]
    #[ORM\JoinColumn(nullable: false)]
    private ?VisionDisorder $vision_disorder = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getResult(): ?int
    {
        return $this->result;
    }

    public function setResult(int $result): static
    {
        $this->result = $result;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getVisionDisorder(): ?VisionDisorder
    {
        return $this->vision_disorder;
    }

    public function setVisionDisorder(?VisionDisorder $vision_disorder): static
    {
        $this->vision_disorder = $vision_disorder;

        return $this;
    }
}
