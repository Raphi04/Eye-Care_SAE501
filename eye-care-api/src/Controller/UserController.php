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
use App\Service\ProfileService;


class UserController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private ProfileService $profileService;

    public function __construct(EntityManagerInterface $entityManager, UserService $userService, ProfileService $profileService)
    {
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->profileService = $profileService;
    }

    #[Route('/user/profile', name: 'get_profile', methods: ['GET'])]
    public function GetUserProfile(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $userVisionDisorderResults = $user->getUserVisionDisorderResults();
        $userVisionDisorders = $user->getUserVisionDisorder();

        $data = $this->profileService->profileMapping($user, $userVisionDisorderResults, $userVisionDisorders);

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/user/user_roles', name: 'user_roles', methods: ['GET'])]
    public function GetRoles(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $userRoles = $user->getRoles();

        return new JsonResponse($userRoles, Response::HTTP_OK);
    }

    // #[Route('/user', name: 'get_users', methods: ['GET'])]
    // public function getAllUsers(): JsonResponse
    // {
    //     $users = $this->entityManager->getRepository(User::class)->findAll();
    //     if (!$users) {
    //         return new JsonResponse(['message' => 'No users'], Response::HTTP_NOT_FOUND);
    //     }

    //     $data = $this->userService->usersMapping($users);
    //     return new JsonResponse($data, Response::HTTP_OK);
    // }

    // #[Route('/user/{id}', name: 'get_user', methods: ['GET'])]
    // public function getUserById(int $id): JsonResponse
    // {
    //     $user = $this->entityManager->getRepository(User::class)->find($id);
    //     if (!$user) {
    //         return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
    //     }

    //     $data = $this->userService->userMapping($user);
    //     return new JsonResponse($data, Response::HTTP_OK);
    // }
}
