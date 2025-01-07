<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $apiToken = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $tokenExpiresAt = null;

    /**
     * @var Collection<int, UserVisionDisorderResult>
     */
    #[ORM\OneToMany(targetEntity: UserVisionDisorderResult::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $userVisionDisorderResults;

    /**
     * @var Collection<int, VisionDisorder>
     */
    #[ORM\ManyToMany(targetEntity: VisionDisorder::class, inversedBy: 'users')]
    private Collection $user_vision_disorder;

    /**
     * @var Collection<int, Post>
     */
    #[ORM\OneToMany(targetEntity: Post::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $posts;

    /**
     * @var Collection<int, Vote>
     */
    #[ORM\OneToMany(targetEntity: Vote::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $votes;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $profile_image = null;

    public function __construct()
    {
        $this->userVisionDisorderResults = new ArrayCollection();
        $this->user_vision_disorder = new ArrayCollection();
        $this->posts = new ArrayCollection();
        $this->votes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getApiToken(): ?string
    {
        return $this->apiToken;
    }

    public function setApiToken(?string $apiToken): static
    {
        $this->apiToken = $apiToken;

        return $this;
    }

    // public function setRandomApiToken(): static
    // {
    //     $randomToken = bin2hex(random_bytes(10));
    //     $this->apiToken = $randomToken;
        
    //     return $this;
    // }

    public function getTokenExpiresAt(): ?\DateTimeInterface
    {
        return $this->tokenExpiresAt;
    }

    public function setTokenExpiresAt(?\DateTimeInterface $tokenExpiresAt): static
    {
        $this->tokenExpiresAt = $tokenExpiresAt;

        return $this;
    }

    // public function setTokenExpiresAtAfter72Hours(): static
    // {
    //     $currentDateTime = new \DateTime();
    //     $tokenExpiresAt = $currentDateTime->modify('+3 days');
    //     $this->tokenExpiresAt = $tokenExpiresAt;

    //     return $this;
    // }

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
            $userVisionDisorderResult->setUser($this);
        }

        return $this;
    }

    public function removeUserVisionDisorderResult(UserVisionDisorderResult $userVisionDisorderResult): static
    {
        if ($this->userVisionDisorderResults->removeElement($userVisionDisorderResult)) {
            // set the owning side to null (unless already changed)
            if ($userVisionDisorderResult->getUser() === $this) {
                $userVisionDisorderResult->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, VisionDisorder>
     */
    public function getUserVisionDisorder(): Collection
    {
        return $this->user_vision_disorder;
    }

    public function addUserVisionDisorder(VisionDisorder $userVisionDisorder): static
    {
        if (!$this->user_vision_disorder->contains($userVisionDisorder)) {
            $this->user_vision_disorder->add($userVisionDisorder);
        }

        return $this;
    }

    public function removeUserVisionDisorder(VisionDisorder $userVisionDisorder): static
    {
        $this->user_vision_disorder->removeElement($userVisionDisorder);

        return $this;
    }

    /**
     * @return Collection<int, Post>
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): static
    {
        if (!$this->posts->contains($post)) {
            $this->posts->add($post);
            $post->setUser($this);
        }

        return $this;
    }

    public function removePost(Post $post): static
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getUser() === $this) {
                $post->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Vote>
     */
    public function getVotes(): Collection
    {
        return $this->votes;
    }

    public function addVote(Vote $vote): static
    {
        if (!$this->votes->contains($vote)) {
            $this->votes->add($vote);
            $vote->setUser($this);
        }

        return $this;
    }

    public function removeVote(Vote $vote): static
    {
        if ($this->votes->removeElement($vote)) {
            // set the owning side to null (unless already changed)
            if ($vote->getUser() === $this) {
                $vote->setUser(null);
            }
        }

        return $this;
    }

    public function getProfileImage(): ?string
    {
        return $this->profile_image;
    }

    public function setProfileImage(?string $profile_image): static
    {
        $this->profile_image = $profile_image;

        return $this;
    }
}
