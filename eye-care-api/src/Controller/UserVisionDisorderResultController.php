<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\UserVisionDisorderResultService;
use App\Service\UserService;
use App\Service\VisionDisorderService;
use App\Entity\UserVisionDisorderResult;


class UserVisionDisorderResultController extends AbstractController
{
    private UserVisionDisorderResultService $userVisionDisorderResultService;
    private UserService $userService;
    private VisionDisorderService $visionDisorderService;

    public function __construct(UserVisionDisorderResultService $userVisionDisorderResultService, UserService $userService, VisionDisorderService $visionDisorderService)
    {
        $this->userVisionDisorderResultService = $userVisionDisorderResultService;
        $this->userService = $userService;
        $this->visionDisorderService = $visionDisorderService;
    }

    #[Route('/user/user_vision_disorder_result', name: 'create_user_vision_disorder_result', methods: ['POST'])]
    public function createUserVisionDisorderResult(Request $request): JsonResponse
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

        $userVisionDisorderResult = $this->userVisionDisorderResultService->findUserVisionDisorderResultByProprieties("user", $userId, "vision_disorder", $visionDisorderId);
        if (!$userVisionDisorderResult) {
            $userVisionDisorderResult = new UserVisionDisorderResult();
            $userVisionDisorderResult = $this->userVisionDisorderResultService->createUserVisionDisorderResult($user, $visionDisorder, $result);

            $this->userVisionDisorderResultService->persistAndFlush($userVisionDisorderResult);
            return new JsonResponse(['message' => 'User vision disorder result created'], Response::HTTP_OK);
        }

        $userVisionDisorderResult = $userVisionDisorderResult->setResult($result);

        $this->userVisionDisorderResultService->persistAndFlush($userVisionDisorderResult);
        return new JsonResponse(['message' => 'User vision disorder updated'], Response::HTTP_CREATED);
    }

    #[Route('/user/user_vision_disorder_result', name: 'get_user_and_vision_disorder_results', methods: ['GET'])]
    public function GetUserAndVisionDisorders(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $userVisionDisorderResults = $user->getUserVisionDisorderResults();

        $data = $this->userVisionDisorderResultService->userAndVisionDisorderResultsMapping($user, $userVisionDisorderResults);

        return new JsonResponse($data, Response::HTTP_CREATED);
    }
}
