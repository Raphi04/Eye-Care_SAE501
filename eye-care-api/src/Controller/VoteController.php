<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\VoteService;
use App\Service\UserService;
use App\Service\PostService;
use App\Entity\Vote;


class VoteController extends AbstractController
{
    private VoteService $voteService;
    private UserService $userService;
    private PostService $postService;

    public function __construct(VoteService $voteService, UserService $userService, PostService $postService)
    {
        $this->voteService = $voteService;
        $this->userService = $userService;
        $this->postService = $postService;
    }

    #[Route('/user/vote', name: 'vote', methods: ['POST'])]
    public function createVote(Request $request): JsonResponse
    {        
        $requestData = json_decode($request->getContent(), true);
        $postId = $requestData['post_id'];
        $voteValue = $requestData['vote_value'];
        $apiToken = $request->headers->get('auth-token');

        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $post = $this->postService->findPostById($postId);
        if (!$post) {
            return new JsonResponse(['message' => 'Post not found'], Response::HTTP_NOT_FOUND);
        }

        $userId = $user->getId();
        $postId = $post->getId();

        $vote = $this->voteService->findVoteByProprieties("user", $userId, "post", $postId);
        if (!$vote) {
            $vote = $this->voteService->createVote($user, $post, $voteValue);

            $this->voteService->persistAndFlush($vote);
            return new JsonResponse(['message' => 'Vote value created'], Response::HTTP_CREATED);
        }

        $vote = $vote->setVoteValue($voteValue);

        $this->voteService->persistAndFlush($vote);
        return new JsonResponse(['message' => 'Vote value updated'], Response::HTTP_OK);
    }

    #[Route('/user/vote/{post_id}', name: 'delete_vote', methods: ['DELETE'])]
    public function deleteVote(Request $request, int $post_id): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);
        $userId = $user->getId();

        $vote = $this->voteService->findVoteByProprieties("user", $userId, "post", $post_id);
        if(!$vote)
        {
            return new JsonResponse(['message' => 'Vote not found'], Response::HTTP_NOT_FOUND);
        }

        $this->voteService->delete($vote);

        return new JsonResponse(['message' => 'Vote deleted'], Response::HTTP_OK);
    }
}
