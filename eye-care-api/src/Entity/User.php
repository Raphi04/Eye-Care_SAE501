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

    #[ORM\Column(length: 255, unique: true)]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $apiToken = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $tokenExpiresAt = null;

    /**
     * @var Collection<int, UserVisionDisorder>
     */
    #[ORM\OneToMany(targetEntity: UserVisionDisorder::class, mappedBy: 'user')]
    private Collection $userVisionDisorders;

    public function __construct()
    {
        $this->userVisionDisorders = new ArrayCollection();
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
            $userVisionDisorder->setUser($this);
        }

        return $this;
    }

    public function removeUserVisionDisorder(UserVisionDisorder $userVisionDisorder): static
    {
        if ($this->userVisionDisorders->removeElement($userVisionDisorder)) {
            // set the owning side to null (unless already changed)
            if ($userVisionDisorder->getUser() === $this) {
                $userVisionDisorder->setUser(null);
            }
        }

        return $this;
    }
}
