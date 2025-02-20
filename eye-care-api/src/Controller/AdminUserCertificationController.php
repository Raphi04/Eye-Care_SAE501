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


class AdminUserCertificationController extends AbstractController
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

    #[Route('/admin/user_to_certificate', name: 'get_users_to_certificate', methods: ['GET'])]
    public function getUsersToCertificate(): JsonResponse
    {
        $users = $this->entityManager->getRepository(User::class)->findAll();
        $usersWithCertificate = [];
        foreach($users as $user){
            $isCertified = in_array('ROLE_CERTIFIED', $user->getRoles()) || in_array('ROLE_ADMIN', $user->getRoles());
            if($user->getCertificate() && !$isCertified){
                $usersWithCertificate[] = $user;
            }
        }
        
        if(!$usersWithCertificate){
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $mappedUsers = $this->userService->usersMapping($usersWithCertificate);
        $data = $mappedUsers;

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/admin/user_certificate/{id}', name: 'get_user_certificate', methods: ['GET'])]
    public function getUsersCertificate(string $id): BinaryFileResponse|JsonResponse
    {
        $user = $this->userService->findUserByPropriety("id",$id);
        if(!$user){
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $filePath = $user->getCertificate() ? $this->params->get('certificate_download_dir') . $user->getCertificate() : null;
        if (!$filePath || !file_exists($filePath)) {
            return new JsonResponse(['message' => 'Certificate not found'], Response::HTTP_NOT_FOUND);
        }

        return new BinaryFileResponse($filePath);
    }

    #[Route('/admin/user_certify/{id}', name: 'user_certify', methods: ['PUT'])]
    public function certifyUser(string $id): JsonResponse
    {
        $roles = ["ROLE_CERTIFIED"];

        $user = $this->userService->findUserByPropriety("id",$id);
        if(!$user){
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $user->setRoles($roles);
        $this->userService->persistAndFlush($user);

        return new JsonResponse(['message' => 'User certified'], Response::HTTP_OK);
    }

    #[Route('/admin/user_certify/{id}', name: 'user_refuse_certification', methods: ['DELETE'])]
    public function refuseCertificationUser(string $id): JsonResponse
    {
        $user = $this->userService->findUserByPropriety("id",$id);
        if(!$user){
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $certificate = $user->getCertificate();
        $uploadDir = $this->params->get('certificate_upload_dir');
        if($certificate){
            $oldCertificat = $uploadDir . '/' . $certificate;
            if (file_exists($oldCertificat)) {
                unlink($oldCertificat);
            }
        }

        $user->setCertificate(null);
        $this->userService->persistAndFlush($user);

        return new JsonResponse(['message' => 'Certification refused'], Response::HTTP_OK);
    }
}
