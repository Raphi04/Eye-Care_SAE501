<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Category;
use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;

class PostService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findPostByPropriety(string $propriety, string $value): ?Post
    {
        $post = $this->entityManager->getRepository(Post::class)->findOneBy([$propriety => $value]);

        return $post;
    }

    public function findPostById(int $id): ?Post
    {
        $post = $this->entityManager->getRepository(Post::class)->find($id);

        return $post;
    }

    public function createPost(User $user, Category $category, string $text, ?Post $postParent): Post
    {
        $post = new Post();

        $post->setUser($user);
        $post->setCategory($category);
        $post->setText($text);
        
        $this->addCreatedAt($post);
        
        if($postParent){
            $post->setPostParent($postParent);
        }

        return $post;
    }

    public function getValideParent(?int $postParentId, Category $category): ?Post
    {
        if(!$postParentId){
            return null;
        }

        $postParent = $this->findPostById($postParentId);
        if (!$postParent || $postParent->getPostParent() || $postParent->getCategory() !== $category) {
            return null;
        }
        
        return $postParent;
    }

    public function addCreatedAt(Post $post): Post
    {
        $currentDate = new \DateTimeImmutable();

        $post->setCreatedAt($currentDate);
        return $post;
    }

    public function persistAndFlush(Post $post): void
    {
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }
}