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
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;


class UserController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserService $userService;
    private ProfileService $profileService;
    private ParameterBagInterface $params;

    public function __construct(EntityManagerInterface $entityManager, UserService $userService, ProfileService $profileService, ParameterBagInterface $params)
    {
        $this->entityManager = $entityManager;
        $this->userService = $userService;
        $this->profileService = $profileService;
        $this->params = $params;
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

        $data = [
            'roles' => $user->getRoles()
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/user/user_info', name: 'user_info', methods: ['GET'])]
    public function GetUserInfo(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $userRoles = $user->getRoles();
        $username = $user->getUsername();
        $userId = $user->getId();

        $data = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'roles' => $user->getRoles()
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/user/user', name: 'my_user_update', methods: ['PUT'])]
    public function updateUser(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);
        $email = $requestData['email'];
        $username = $requestData['username'];
        $password = $requestData['password'];

        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $this->userService->updateUser($user, $email, $username, $password);
        $this->userService->persistAndFlush($user);

        return new JsonResponse(['message' => 'User updated'], Response::HTTP_OK);
    }

    #[Route('/user/user', name: 'user_delete', methods: ['DELETE'])]
    public function deleteUser(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'User deleted'], Response::HTTP_OK);
    }

    #[Route('/user/profile_image', name: 'profile_image', methods: ['POST'])]
    public function profileImage(Request $request): JsonResponse
    {
        $image = $request->files->get('image');
        
        if (!$image) {
            return new JsonResponse(['message' => 'No file provided'], Response::HTTP_BAD_REQUEST);
        }

        $uploadDir = $this->params->get('profile_upload_dir');
        $imageName = uniqid() . '.' . $image->guessExtension();

        $image->move($uploadDir, $imageName);

        return new JsonResponse(['message' => 'Profile image created/updated'], Response::HTTP_CREATED);
    }
}
