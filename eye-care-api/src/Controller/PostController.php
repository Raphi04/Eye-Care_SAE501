<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\PostService;
use App\Service\UserService;
use App\Service\CategoryService;


class PostController extends AbstractController
{
    private PostService $postService;
    private UserService $userService;
    private CategoryService $categoryService;

    public function __construct(PostService $postService, UserService $userService, CategoryService $categoryService)
    {
        $this->postService = $postService;
        $this->userService = $userService;
        $this->categoryService = $categoryService;
    }

    #[Route('/user/post', name: 'create_post', methods: ['POST'])]
    public function createPost(Request $request): JsonResponse
    {        
        $requestData = json_decode($request->getContent(), true);
        $subject = $requestData['subject'];
        $text = $requestData['text'];
        $postParentId = $requestData['post_parent_id'];

        $apiToken = $request->headers->get('auth-token');
        $user = $this->userService->findUserByPropriety("apiToken", $apiToken);

        $category = null;
        if (!$postParentId) {
            if (!$subject) {
                return new JsonResponse(['message' => 'Subject is required for posts without parent'], Response::HTTP_BAD_REQUEST);
            }
    
            $category = $this->categoryService->findCategoryByPropriety("subject", $subject);
            if (!$category) {
                return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
            }
        }

        $postParent = $this->postService->getValideParent($postParentId);
        if ($postParentId && !$postParent)
        {
            return new JsonResponse(['message' => 'PostParent not found or invalid'], Response::HTTP_NOT_FOUND);
        }

        $post = $this->postService->createPost($user, $category, $text, $postParent);
        $this->postService->persistAndFlush($post);

        $data = ['id' => $post->getId()];

        return new JsonResponse($data, Response::HTTP_CREATED);
    }

    #[Route('/post/{subject}', name: 'get_post_by_category', methods: ['GET'])]
    public function getPostByCategory(Request $request, string $subject): JsonResponse
    {
        $user = null;
        if($request->headers->has('auth-token'))
        {
            $apiToken = $request->headers->get('auth-token');
            $user = $this->userService->findUserByPropriety("apiToken", $apiToken);
        }

        $category = $this->categoryService->findCategoryByPropriety("subject", $subject);
        $posts = $this->postService->findPostsByCategory($category->getId());

        $data = $this->postService->postsMapping($posts, $user);

        return new JsonResponse($data, Response::HTTP_OK);
    }
}
