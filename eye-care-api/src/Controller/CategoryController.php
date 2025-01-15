<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\CategoryService;
use App\Service\UserService;


class CategoryController extends AbstractController
{
    private CategoryService $categoryService;
    private UserService $userService;

    public function __construct(CategoryService $categoryService, UserService $userService)
    {
        $this->categoryService = $categoryService;
        $this->userService = $userService;
    }

    #[Route('/user/category', name: 'create_category', methods: ['POST'])]
    public function createCategory(Request $request): JsonResponse
    {   
        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $requestData = json_decode($request->getContent(), true);
        $subject = $requestData['subject'];
        
        $categoryBySubject = $this->categoryService->findCategoryByPropriety("subject", $subject);
        if ($categoryBySubject) {
            return new JsonResponse(['message' => 'Category already exist'], Response::HTTP_CONFLICT);
        }

        $category = $this->categoryService->createCategory($subject, $user);
        $this->categoryService->persistAndFlush($category);

        return new JsonResponse(['message' => 'Category created'], Response::HTTP_CREATED);
    }

    // #[Route('/user/category', name: 'get_categories', methods: ['GET'])]
    // public function getCategories(): JsonResponse
    // {
    //     $categories = $this->categoryService->getAllCategories();
    //     if (!$categories) {
    //         return new JsonResponse(['message' => 'Categories not found'], Response::HTTP_NOT_FOUND);
    //     }

    //     $data = $this->categoryService->mapCategories($categories);

    //     return new JsonResponse($data, Response::HTTP_OK);
    // }

    // #[Route('/user/category/{id}', name: 'update_category', methods: ['PUT'])]
    // public function updateCategory(Request $request, $id): JsonResponse
    // {        
    //     $requestData = json_decode($request->getContent(), true);
    //     $subject = $requestData['subject'];
        
    //     $category = $this->categoryService->findCategoryByPropriety("id", $id);
    //     if (!$category) {
    //         return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
    //     }

    //     $category = $this->categoryService->updateCategory($category, $subject);
    //     $this->categoryService->persistAndFlush($category);

    //     return new JsonResponse(['message' => 'Category updated'], Response::HTTP_CREATED);
    // }

    // #[Route('/user/category/{id}', name: 'delete_category', methods: ['DELETE'])]
    // public function deleteCategory($id): JsonResponse
    // {        
    //     $category = $this->categoryService->findCategoryByPropriety("id", $id);
    //     if (!$category) {
    //         return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
    //     }

    //     $this->categoryService->removeAndFlush($category);

    //     return new JsonResponse(['message' => 'Category deleted'], Response::HTTP_CREATED);
    // }
}
