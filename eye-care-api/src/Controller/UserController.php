<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;


class UserController extends AbstractController
{
    #[Route('/user', name: 'get_users', methods: ['GET'])]
    public function getAllUsers(EntityManagerInterface $entityManager): JsonResponse
    {
        $users = $entityManager->getRepository(User::class)->findAll();
        if (!$users) {
            return new JsonResponse(['message' => 'No users'], Response::HTTP_NOT_FOUND);
        }

        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'password' => $user->getPassword(),
                'roles' => $user->getRoles()
            ];
        }
        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/user/{id}', name: 'get_user', methods: ['GET'])]
    public function getUserById(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $data[] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
            'role' => $user->getRoles()
        ];
        return new JsonResponse($data, Response::HTTP_OK);
    }
}
