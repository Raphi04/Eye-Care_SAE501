<?php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostRepository::class)]
class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $text = null;

    /**
     * @var Collection<int, Post>
     */
    #[ORM\OneToMany(mappedBy: 'post_parent', targetEntity: Post::class, cascade: ['persist', 'remove'])]
    private Collection $responses;

    #[ORM\ManyToOne(targetEntity: Post::class, inversedBy: 'responses')]
    #[ORM\JoinColumn(onDelete: 'CASCADE', nullable: true)]
    private ?Post $post_parent = null;

    #[ORM\ManyToOne(inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user = null;

    public function __construct()
    {
        $this->responses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    /**
     * @return Collection<int, Post>
     */
    public function getResponses(): Collection
    {
        return $this->responses;
    }

    public function addResponse(Post $response): static
    {
        if (!$this->responses->contains($response)) {
            $this->responses->add($response);
            $response->setPostParent($this);
        }

        return $this;
    }

    public function removeResponse(Post $response): static
    {
        if ($this->responses->removeElement($response)) {
            if ($response->getPostParent() === $this) {
                $response->setPostParent(null);
            }
        }

        return $this;
    }

    public function getPostParent(): ?Post
    {
        return $this->post_parent;
    }

    public function setPostParent(?Post $post_parent): static
    {
        $this->post_parent = $post_parent;

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
}
