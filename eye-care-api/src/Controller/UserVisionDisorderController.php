<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\UserVisionDisorderService;
use App\Service\UserService;
use App\Service\VisionDisorderService;
use App\Entity\UserVisionDisorder;


class UserVisionDisorderController extends AbstractController
{
    private UserVisionDisorderService $userVisionDisorderService;
    private UserService $userService;
    private VisionDisorderService $visionDisorderService;

    public function __construct(UserVisionDisorderService $userVisionDisorderService, UserService $userService, VisionDisorderService $visionDisorderService)
    {
        $this->userVisionDisorderService = $userVisionDisorderService;
        $this->userService = $userService;
        $this->visionDisorderService = $visionDisorderService;
    }

    #[Route('/user/user_vision_disorder', name: 'create_user_vision_disorder', methods: ['POST'])]
    public function createUserVisionDisorder(Request $request): JsonResponse
    {        
        $requestData = json_decode($request->getContent(), true);
        $disorderName = $requestData['vision_disorder'];
        $result = $requestData['result'];
        $apiToken = $request->headers->get('auth-token');

        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $visionDisorder = $this->visionDisorderService->findVisionDisorderByPropriety("disorder_name", $disorderName);
        if (!$visionDisorder) {
            return new JsonResponse(['message' => 'Vision not found'], Response::HTTP_NOT_FOUND);
        }

        $userId = $user->getId();
        $visionDisorderId = $visionDisorder->getId();

        $userVisionDisorder = $this->userVisionDisorderService->findUserVisionDisorderByProprieties("user", $userId, "visionDisorder", $visionDisorderId);
        if (!$userVisionDisorder) {
            $userVisionDisorder = new UserVisionDisorder();
            $userVisionDisorder = $this->userVisionDisorderService->createUserVisionDisorder($user, $visionDisorder, $result);

            $this->userVisionDisorderService->persistAndFlush($userVisionDisorder);
            return new JsonResponse(['message' => 'User vision disorder created'], Response::HTTP_OK);
        }

        $userVisionDisorder = $userVisionDisorder->setResult($result);

        $this->userVisionDisorderService->persistAndFlush($userVisionDisorder);
        return new JsonResponse(['message' => 'User vision disorder updated'], Response::HTTP_CREATED);
    }

    #[Route('/user/user_vision_disorder', name: 'get_user_and_vision_disorders', methods: ['GET'])]
    public function GetUserAndVisionDisorders(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $userVisionDisorders = $user->getUserVisionDisorders();

        $data = $this->userVisionDisorderService->userAndVisionDisordersMapping($user, $userVisionDisorders);

        return new JsonResponse($data, Response::HTTP_CREATED);
    }
}
