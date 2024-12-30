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
     * @var Collection<int, UserVisionDisorderResult>
     */
    #[ORM\OneToMany(targetEntity: UserVisionDisorderResult::class, mappedBy: 'vision_disorder', orphanRemoval: true)]
    private Collection $userVisionDisorderResults;

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'user_vision_disorder')]
    private Collection $users;

    public function __construct()
    {
        $this->userVisionDisorderResults = new ArrayCollection();
        $this->users = new ArrayCollection();
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
     * @return Collection<int, UserVisionDisorderResult>
     */
    public function getUserVisionDisorderResults(): Collection
    {
        return $this->userVisionDisorderResults;
    }

    public function addUserVisionDisorderResult(UserVisionDisorderResult $userVisionDisorderResult): static
    {
        if (!$this->userVisionDisorderResults->contains($userVisionDisorderResult)) {
            $this->userVisionDisorderResults->add($userVisionDisorderResult);
            $userVisionDisorderResult->setVisionDisorder($this);
        }

        return $this;
    }

    public function removeUserVisionDisorderResult(UserVisionDisorderResult $userVisionDisorderResult): static
    {
        if ($this->userVisionDisorderResults->removeElement($userVisionDisorderResult)) {
            // set the owning side to null (unless already changed)
            if ($userVisionDisorderResult->getVisionDisorder() === $this) {
                $userVisionDisorderResult->setVisionDisorder(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addUserVisionDisorder($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            $user->removeUserVisionDisorder($this);
        }

        return $this;
    }
}
