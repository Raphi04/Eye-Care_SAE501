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

    public function postsMapping(array $posts): array
    {
        foreach ($posts as $post) {
            $voteCount = $this->getVoteCount($post);

            $responses = [];
            foreach($post->getResponses() as $response)
            {
                $responseVoteCount = $this->getVoteCount($response);
                $responses[] = [
                    'id' => $response->getId(),
                    'username' => $response->getUser()->getUsername(),
                    'user_roles' => $response->getUser()->getRoles(),
                    'text' => $response->getText(),
                    'created_at' => $response->getCreatedAt()->setTimezone(new \DateTimeZone('Europe/Paris'))->format('Y-m-d H:i:s'),
                    'positive_votes' => $responseVoteCount['positive'],
                    'negative_votes' => $responseVoteCount['negative'],
                ];
            }

            $data[] = [
                'id' => $post->getId(),
                'username' => $post->getUser()->getUsername(),
                'user_roles' => $post->getUser()->getRoles(),
                'text' => $post->getText(),
                'created_at' => $post->getCreatedAt()->setTimezone(new \DateTimeZone('Europe/Paris'))->format('Y-m-d H:i:s'),
                'positive_votes' => $voteCount['positive'],
                'negative_votes' => $voteCount['negative'],
                'responses' => $responses
            ];
        }
        return $data;
    }

    public function getVoteCount(Post $post): array
{
    $positiveVotes = 0;
    $negativeVotes = 0;

    foreach ($post->getVotes() as $vote) {
        if ($vote->isVoteValue()) {
            $positiveVotes++;
        } else {
            $negativeVotes++;
        }
    }

    return [
        'positive' => $positiveVotes,
        'negative' => $negativeVotes,
    ];
}

    public function persistAndFlush(Post $post): void
    {
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }
}