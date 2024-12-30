<?php

namespace App\Service;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;

class CategoryService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function findCategoryByPropriety(string $propriety, string $value): ?Category
    {
        $category = $this->entityManager->getRepository(Category::class)->findOneBy([$propriety => $value]);

        return $category;
    }

    public function createCategory(string $subject): Category
    {
        $category = new Category();

        $category->setSubject($subject);

        return $category;
    }

    public function persistAndFlush(Category $category): void
    {
        $this->entityManager->persist($category);
        $this->entityManager->flush();
    }
}