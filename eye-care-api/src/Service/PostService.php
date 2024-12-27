<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Category;
use App\Entity\Post;
use App\Entity\Vote;
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

    public function findPostsByCategory(string $value): array
    {
        $posts = $this->entityManager->getRepository(Post::class)->findBy(["category" => $value]);

        return $posts;
    }

    public function findPostById(int $id): ?Post
    {
        $post = $this->entityManager->getRepository(Post::class)->find($id);

        return $post;
    }

    public function createPost(User $user, ?Category $category, string $text, ?Post $postParent): Post
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

    public function getValideParent(?int $postParentId): ?Post
    {
        if(!$postParentId){
            return null;
        }

        $postParent = $this->findPostById($postParentId);
        if (!$postParent || $postParent->getPostParent()) {
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

    public function postsMapping(array $posts, ?User $user): array
    {
        foreach ($posts as $post) {
            $responses = [];
            foreach($post->getResponses() as $response)
            {
                $responseVoteCount = $this->getVoteCount($response, $user);
                $responses[] = [
                    'id' => $response->getId(),
                    'username' => $response->getUser()->getUsername(),
                    'user_roles' => $response->getUser()->getRoles(),
                    'text' => $response->getText(),
                    'created_at' => $response->getCreatedAt()->setTimezone(new \DateTimeZone('Europe/Paris'))->format('Y-m-d H:i:s'),
                    'like' => $responseVoteCount['like'],
                    'dislike' => $responseVoteCount['dislike'],
                    'is_liked' => $responseVoteCount['is_liked'],
                    'is_disliked' => $responseVoteCount['is_disliked'],
                ];
            }

            $voteCount = $this->getVoteCount($post, $user);
            $data[] = [
                'id' => $post->getId(),
                'username' => $post->getUser()->getUsername(),
                'user_roles' => $post->getUser()->getRoles(),
                'text' => $post->getText(),
                'created_at' => $post->getCreatedAt()->setTimezone(new \DateTimeZone('Europe/Paris'))->format('Y-m-d H:i:s'),
                'like' => $voteCount['like'],
                'dislike' => $voteCount['dislike'],
                'is_liked' => $voteCount['is_liked'],
                'is_disliked' => $voteCount['is_disliked'],
                'responses' => $responses
            ];
        }

        usort($data, function($a, $b) {
            return $b['like'] - $a['like'];
        });

        return $data;
    }

    public function getVoteCount(Post $post, ?User $user): array
    {
        $positiveVotes = 0;
        $negativeVotes = 0;
        $isLiked = false;
        $isDisliked = false;

        foreach ($post->getVotes() as $vote) {
            if ($vote->isVoteValue()) {
                $positiveVotes++;
            } else {
                $negativeVotes++;
            }
            if ($user && $vote->getUser() === $user){
                if ($vote->isVoteValue()) {
                    $isLiked = true;
                } else {
                    $isDisliked = true;
                }
            }
        }

        return [
            'like' => $positiveVotes,
            'dislike' => $negativeVotes,
            'is_liked' => $isLiked,
            'is_disliked' => $isDisliked,
        ];
    }

    public function persistAndFlush(Post $post): void
    {
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }
}