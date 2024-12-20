<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\CategoryService;


class CategoryController extends AbstractController
{
    private CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    #[Route('/admin/category', name: 'create_category', methods: ['POST'])]
    public function createCategory(Request $request): JsonResponse
    {        
        $requestData = json_decode($request->getContent(), true);
        $subject = $requestData['subject'];
        
        $categoryBySubject = $this->categoryService->findCategoryByPropriety("subject", $subject);
        if ($categoryBySubject) {
            return new JsonResponse(['message' => 'Category already exist'], Response::HTTP_CONFLICT);
        }

        $category = $this->categoryService->createCategory($subject);
        $this->categoryService->persistAndFlush($category);

        return new JsonResponse(['message' => 'Category created'], Response::HTTP_CREATED);
    } 
}
