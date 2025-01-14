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


class CertificationController extends AbstractController
{
    private UserService $userService;
    private ParameterBagInterface $params;

    public function __construct(UserService $userService, ParameterBagInterface $params)
    {
        $this->userService = $userService;
        $this->params = $params;
    }

    #[Route('/user/certificate', name: 'upload_certificate', methods: ['POST'])]
    public function uploadCertificat(Request $request): JsonResponse
    {
        $certificate = $request->files->get('certificate');
        
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);
        $userCertificat = $user->getCertificate();
        
        if (!$certificate) {
            return new JsonResponse(['message' => 'No file provided'], Response::HTTP_BAD_REQUEST);
        }

        if (!$certificate->isValid() || $certificate->getMimeType() !== 'application/pdf') {
            return new JsonResponse(['message' => 'Invalid file type or upload error'], Response::HTTP_BAD_REQUEST);
        }

        $uploadDir = $this->params->get('certificate_upload_dir');
        $certificateName = uniqid() . '.' . $certificate->guessExtension();

        if($userCertificat){
            $oldCertificat = $uploadDir . '/' . $userCertificat;
            if (file_exists($oldCertificat)) {
                unlink($oldCertificat);
            }
        }

        $certificate->move($uploadDir, $certificateName);

        $user->setCertificate($certificateName);
        $this->userService->persistAndFlush($user);

        return new JsonResponse(['message' => 'Certificat created or updated'], Response::HTTP_CREATED);
    }
}