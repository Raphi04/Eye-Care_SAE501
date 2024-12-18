<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Service\TokenService;
use App\Service\UserService;
use App\Service\AuthentificationService;

class AuthentificationController extends AbstractController
{
    private AuthentificationService $authentificationService;
    private TokenService $tokenService;
    private UserService $userService;

    public function __construct(AuthentificationService $authentificationService, TokenService $tokenService, UserService $userService)
    {
        $this->authentificationService = $authentificationService;
        $this->tokenService = $tokenService;
        $this->userService = $userService;
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);
        $email = $requestData['email'];
        $username = $requestData['username'];
        $password = $requestData['password'];

        $userByEmail = $this->userService->findUserByPropriety("email", $email);
        $userByUsername = $this->userService->findUserByPropriety("username", $username);
        if ($userByEmail) {
            return new JsonResponse(['message' => 'Email already exist'], Response::HTTP_CONFLICT);
        }
        if ($userByUsername) {
            return new JsonResponse(['message' => 'Username already exist'], Response::HTTP_CONFLICT);
        }

        $user = $this->userService->createUser($email, $username, $password);
        $this->tokenService->setUserTokenAndExpiration($user, false);
        $this->userService->persistAndFlush($user);

        $data = $this->authentificationService->getUserIdentifiers($user);

        return new JsonResponse($data, Response::HTTP_CREATED);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);
        $email = $requestData['email'];
        $password = $requestData['password'];

        $user = $this->userService->findUserByPropriety("email", $email);
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $passwordIsCorrect = $this->authentificationService->isPasswordCorrect($user, $password);
        if (!$passwordIsCorrect) {
            return new JsonResponse(['message' => 'Incorrect password'], Response::HTTP_UNAUTHORIZED);
        }

        $this->tokenService->setUserTokenAndExpiration($user, false);
        $this->userService->persistAndFlush($user);
        $data = $this->authentificationService->getUserIdentifiers($user);

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/user/logout', name: 'logout', methods: ['POST'])]
    public function logout(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $this->tokenService->removeToken($user);

        return new JsonResponse("Token Removed", Response::HTTP_OK);
    }

    // Fonction de test temporaire
    #[Route('/user/api_token_test', name: 'api_token_test', methods: ['GET'])]
    public function apiTokenWorks(): JsonResponse
    {
        return new JsonResponse("Is connected as user", Response::HTTP_OK);
    }

    // Fonction de test temporaire
    #[Route('/admin/test', name: 'admin_role_test', methods: ['GET'])]
    public function adminRoleWorks(): JsonResponse
    {
        return new JsonResponse("Is admin", Response::HTTP_OK);
    }
}