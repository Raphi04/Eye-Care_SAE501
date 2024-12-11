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

    /**
     * @var Collection<int, UserVisionDisorder>
     */
    #[ORM\OneToMany(targetEntity: UserVisionDisorder::class, mappedBy: 'visionDisorder')]
    private Collection $userVisionDisorders;

    public function __construct()
    {
        $this->userVisionDisorders = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, UserVisionDisorder>
     */
    public function getUserVisionDisorders(): Collection
    {
        return $this->userVisionDisorders;
    }

    public function addUserVisionDisorder(UserVisionDisorder $userVisionDisorder): static
    {
        if (!$this->userVisionDisorders->contains($userVisionDisorder)) {
            $this->userVisionDisorders->add($userVisionDisorder);
            $userVisionDisorder->setVisionDisorder($this);
        }

        return $this;
    }

    public function removeUserVisionDisorder(UserVisionDisorder $userVisionDisorder): static
    {
        if ($this->userVisionDisorders->removeElement($userVisionDisorder)) {
            // set the owning side to null (unless already changed)
            if ($userVisionDisorder->getVisionDisorder() === $this) {
                $userVisionDisorder->setVisionDisorder(null);
            }
        }

        return $this;
    }
}
