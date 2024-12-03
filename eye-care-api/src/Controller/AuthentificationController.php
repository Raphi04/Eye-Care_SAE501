<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Service\TokenService;

class AuthentificationController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function createUser(TokenService $tokenService, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {        
        define('DEFAULT_ROLE', 'ROLE_USER');

        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $username = $data['username'];
        $password = $data['password'];
        
        $userByEmail = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        $userByUsername = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
        if ($userByEmail) {
            return new JsonResponse(['message' => 'Email already exist'], Response::HTTP_NOT_FOUND);
        }
        if ($userByUsername) {
            return new JsonResponse(['message' => 'Username already exist'], Response::HTTP_NOT_FOUND);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($password);
        $user->setRoles([DEFAULT_ROLE]);

        $tokenService->setUserTokenAndExpiration($user, false);
        $apiToken = $user->getApiToken();

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse($apiToken, Response::HTTP_CREATED);
    }
    
    #[Route('/login', name: 'login', methods: ['GET'])]
    public function login(TokenService $tokenService, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];

        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $realPassword = $user->getPassword();
        if ($realPassword !== $password) {
            return new JsonResponse(['message' => 'Uncorrect password'],Response::HTTP_NOT_FOUND);
        }

        $tokenService->setUserTokenAndExpiration($user, false);
        $apiToken = $user->getApiToken();

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse($apiToken, Response::HTTP_CREATED);
    }

    // Fonction de test temporaire
    #[Route('/private/api_token_test', name: 'api_token_test', methods: ['GET'])]
    public function apiTokenWorks(): JsonResponse
    {
        return new JsonResponse("Est authentifié", Response::HTTP_OK);
    }

    // // Fonction de test temporaire
    // #[Route('/admin/test', name: 'admin_role_test', methods: ['GET'])]
    // public function adminRoleWorks(): JsonResponse
    // {
    //     return new JsonResponse("Est admin", Response::HTTP_OK);
    // }

    // // Fonction de test temporaire
    // #[Route('/profile/test', name: 'user_role_test', methods: ['GET'])]
    // public function userRoleWorks(): JsonResponse
    // {
    //     return new JsonResponse("Est user", Response::HTTP_OK);
    // }
}
