<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Service\UserService;
use App\Service\UserVisionDisorderService;


class UserVisionDisorderController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private UserVisionDisorderService $userVisionDisorderService;

    public function __construct(EntityManagerInterface $entityManager, UserService $userService, UserVisionDisorderService $userVisionDisorderService)
    {
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->userVisionDisorderService = $userVisionDisorderService;
    }

    #[Route('/user/user_vision_disorder', name: 'add_user_vision_disorder', methods: ['POST'])]
    public function createVisionDisorder(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);
        $visionDisorderNames = $requestData['vision_disorders'];
        $apiToken = $request->headers->get('auth-token');
        
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $this->userVisionDisorderService->addVisionDisordersToUser($user, $visionDisorderNames);

        $this->userService->persistAndFlush($user);
        return new JsonResponse(['message' => 'Vision disorder created'], Response::HTTP_CREATED);
    }

    #[Route('/user/user_vision_disorder', name: 'user_vision_disorder', methods: ['GET'])]
    public function GetUserVisionDisorders(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $userVisionDisorders = $user->getUserVisionDisorder();
        $data = $this->userVisionDisorderService->userVisionDisordersMapping($userVisionDisorders);

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
