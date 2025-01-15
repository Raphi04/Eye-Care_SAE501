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


class UserUtilityController extends AbstractController
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

        $imageUrl = $user->getProfileImage() ? $this->params->get('profile_download_dir') . $user->getProfileImage() : null;

        $data = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
            'profile_image' => $imageUrl
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
