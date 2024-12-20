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

    public function createPost(User $user, Category $category, string $text, ?int $postParentId): Post
    {
        $post = new Post();

        $post->setUser($user);
        $post->setCategory($category);
        $post->setText($text);
        if($postParentId){
            $post = $this->addPostParent($post, $postParentId);
        }

        return $post;
    }

    public function addPostParent(Post $post, int $postParentId): ?Post
    {
        $postParent = $this->findPostById($postParentId);
        if($postParent && !$postParent->getPostParent()){
            $post->setPostParent($postParent);
        }

        return $post;
    }

    public function persistAndFlush(Post $post): void
    {
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }
}