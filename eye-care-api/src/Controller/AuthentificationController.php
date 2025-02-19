<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Service\TokenService;
use App\Service\UserService;
use App\Service\AuthentificationService;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class AuthentificationController extends AbstractController
{
    private AuthentificationService $authentificationService;
    private TokenService $tokenService;
    private UserService $userService;
    private ParameterBagInterface $params;

    public function __construct(AuthentificationService $authentificationService, TokenService $tokenService, UserService $userService, ParameterBagInterface $params)
    {
        $this->authentificationService = $authentificationService;
        $this->tokenService = $tokenService;
        $this->userService = $userService;
        $this->params = $params;
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $certificate = $request->files->get('certificate');
        $email = $request->request->get('email');
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        $userByEmail = $this->userService->findUserByPropriety("email", $email);
        if ($userByEmail) {
            return new JsonResponse(['message' => 'Email already exist'], Response::HTTP_CONFLICT);
        }

        $user = $this->userService->createUser($email, $username, $password);
        $this->tokenService->setUserTokenAndExpiration($user, false);
        
        if ($certificate) {
            if (!$certificate->isValid() || $certificate->getMimeType() !== 'application/pdf') {
                return new JsonResponse(['message' => 'Invalid file type or upload error'], Response::HTTP_BAD_REQUEST);
            }
            $uploadDir = $this->params->get('certificate_upload_dir');
            $certificateName = uniqid() . '.' . $certificate->guessExtension();
            $certificate->move($uploadDir, $certificateName);
            $user->setCertificate($certificateName);
        }

        $this->userService->persistAndFlush($user);

        $data = $this->authentificationService->getUserIdentifiers($user);

        return new JsonResponse($data, Response::HTTP_CREATED);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        try {
            $requestData = json_decode($request->getContent(), true);
            $email = $requestData['email'];
            $password = $requestData['password'];

            $user = $this->userService->findUserByPropriety("email", $email);
            if (!$user) {
                return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
            }

            $passwordIsCorrect = $this->authentificationService->isPasswordCorrect($user, $password);
            if (!$passwordIsCorrect) {
                return new JsonResponse(['message' => 'Incorrect password'], Response::HTTP_UNAUTHORIZED);
            }

            $this->tokenService->setUserTokenAndExpiration($user, false);
            $this->userService->persistAndFlush($user);
            $data = $this->authentificationService->getUserIdentifiers($user);

            return new JsonResponse($data, Response::HTTP_OK);
        } catch (\Exception $e) {
            error_log($e->getMessage());
            return new JsonResponse(['message' => $e->getMessage()], $e->getCode() ?: Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/user/logout', name: 'logout', methods: ['POST'])]
    public function logout(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $this->tokenService->removeToken($user);

        return new JsonResponse(['message' => 'Token Removed'], Response::HTTP_OK);
    }
}