<?php

namespace App\Entity;

use App\Repository\UserVisionDisorderRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserVisionDisorderRepository::class)]
class UserVisionDisorder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'userVisionDisorders')]
    private ?user $user = null;

    #[ORM\ManyToOne(inversedBy: 'userVisionDisorders')]
    private ?visionDisorder $visionDisorder = null;

    #[ORM\Column]
    private ?int $result = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getVisionDisorder(): ?visionDisorder
    {
        return $this->visionDisorder;
    }

    public function setVisionDisorder(?visionDisorder $visionDisorder): static
    {
        $this->visionDisorder = $visionDisorder;

        return $this;
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
}
