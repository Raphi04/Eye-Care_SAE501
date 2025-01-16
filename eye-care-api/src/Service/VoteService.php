<?php

namespace App\Service;

use App\Entity\Vote;
use App\Entity\User;
use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;

class VoteService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findVoteByProprieties(string $propriety1, int $value1, string $propriety2, int $value2): ?Vote
    {
        $vote = $this->entityManager->getRepository(Vote::class)->findOneBy([$propriety1 => $value1, $propriety2 => $value2]);

        return $vote;
    }

    public function createVote(User $user, Post $post, bool $voteValue): Vote
    {
        $vote = new Vote();
        $vote->setUser($user);
        $vote->setPost($post);
        $vote->setVoteValue($voteValue);

        return $vote;
    }

    public function persistAndFlush(Vote $vote): void
    {
        $this->entityManager->persist($vote);
        $this->entityManager->flush();
    }

    public function delete(Vote $vote): void
    {
        $this->entityManager->remove($vote);
        $this->entityManager->flush();
    }
}