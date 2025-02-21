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
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class AdminUserController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private ParameterBagInterface $params;

    public function __construct(EntityManagerInterface $entityManager, UserService $userService, ParameterBagInterface $params)
    {
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->params = $params;
    }

    #[Route('/admin/user', name: 'get_users', methods: ['GET'])]
    public function getUsers(): JsonResponse
    {
        $users = $this->entityManager->getRepository(User::class)->findAll();
        if(!$users){
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $filteredUser = [];
        foreach($users as $user) {
            if(!in_array("ROLE_ADMIN", $user->getRoles())) {
                $filteredUser[] = $user;
            }
        }

        $mappedUsers = $this->userService->usersMapping($filteredUser);
        $data = $mappedUsers;

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/admin/user/{role}', name: 'get_users_by_role', methods: ['GET'])]
    public function getUsersByRole(string $role): JsonResponse
    {
        $users = $this->userService->findByRole($role);
        if(!$users){
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $mappedUsers = $this->userService->usersMapping($users);
        $data = $mappedUsers;

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/admin/user/{id}', name: 'admin_delete_user', methods: ['DELETE'])]
    public function adminDeleteUser(string $id): JsonResponse
    {
        $user = $this->userService->findUserByPropriety("id", $id);
        if(!$user){
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'User deleted'], Response::HTTP_OK);
    }
}
