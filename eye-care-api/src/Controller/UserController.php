<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Repository\UserRepository;


class UserController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function createUser(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {        
        define('DEFAULT_ROLE', 'ROLE_USER');

        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $username = $data['username'];
        $password = $data['password'];
        
        // Vérifie que le compte n'existe pas déjà (email)
        // Changer la réponse en fonction des besoins en front
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($user) {
            return new JsonResponse(['message' => 'User already exist'], JsonResponse::HTTP_NOT_FOUND
            );
        }

        $user = new User();
        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($password);
        $user->setRoles([DEFAULT_ROLE]);

        $entityManager->persist($user);
        $entityManager->flush();

        // Changer la réponse en fonction des besoins en front
        return new JsonResponse(['status' => 'User created!'], JsonResponse::HTTP_CREATED);
    }
    
    #[Route('/login', name: 'login', methods: ['GET'])]
    public function login(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];

        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        // Changer la réponse en fonction des besoins en front
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND
            );
        }

        // Changer la réponse en fonction des besoins en front
        $realPassword = $user->getPassword();
        if ($realPassword !== $password) {
            return new JsonResponse(
                ['message' => 'Uncorrect password'],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        // Changer la réponse en fonction des besoins en front
        return new JsonResponse(['status' => 'Login successfull!'], JsonResponse::HTTP_CREATED
        );
    }

    #[Route('/user', name: 'get_users', methods: ['GET'])]
    public function getAllUsers(EntityManagerInterface $entityManager): JsonResponse
    {
        $users = $entityManager->getRepository(User::class)->findAll();

        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'password' => $user->getPassword(),
                'roles' => $user->getRoles()
            ];
        }
        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }

    #[Route('/user/{id}', name: 'get_user', methods: ['GET'])]
    public function getUserById(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND
            );
        }

        $data[] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
            'role' => $user->getRole()
        ];
        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }

    // Fonction de test temporaire
    #[Route('/private/api_token_test', name: 'api_token_test', methods: ['GET'])]
    public function getAllUsersApi(EntityManagerInterface $entityManager): JsonResponse
    {
        return new JsonResponse("Est authentifié", JsonResponse::HTTP_OK);
    }
}
