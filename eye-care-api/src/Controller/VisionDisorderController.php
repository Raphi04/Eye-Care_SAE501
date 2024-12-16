<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\VisionDisorderService;


class VisionDisorderController extends AbstractController
{
    private VisionDisorderService $visionDisorderService;

    public function __construct(VisionDisorderService $visionDisorderService)
    {
        $this->visionDisorderService = $visionDisorderService;
    }

    #[Route('/admin/vision_disorder', name: 'create_vision_disorder', methods: ['POST'])]
    public function createVisionDisorder(Request $request): JsonResponse
    {        
        $requestData = json_decode($request->getContent(), true);
        $disorderName = $requestData['disorder_name'];
        
        $visionDisorderByDisorderName = $this->visionDisorderService->findVisionDisorderByPropriety("disorder_name", $disorderName);
        if ($visionDisorderByDisorderName) {
            return new JsonResponse(['message' => 'Vision disorder already exist'], Response::HTTP_CONFLICT);
        }

        $visionDisorder = $this->visionDisorderService->createVisionDisorder($disorderName);
        $this->visionDisorderService->persistAndFlush($visionDisorder);

        return new JsonResponse(['message' => 'Vision disorder created'], Response::HTTP_CREATED);
    }
    
}
