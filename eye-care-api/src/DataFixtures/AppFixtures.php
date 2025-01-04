<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use App\Entity\VisionDisorder;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        //Users
        $adminUser = new User();
        $password = $this->passwordHasher->hashPassword($adminUser, 'password');
        $adminUser->setUsername('admin');
        $adminUser->setEmail('admin@gmail.com');
        $adminUser->setRoles(["ROLE_ADMIN"]);
        $adminUser->setPassword($password);
        $manager->persist($adminUser);

        $certifiedUser = new User();
        $password = $this->passwordHasher->hashPassword($certifiedUser, 'password');
        $certifiedUser->setUsername('certified');
        $certifiedUser->setEmail('certified@gmail.com');
        $certifiedUser->setRoles(["ROLE_CERTIFIED"]);
        $certifiedUser->setPassword($password);
        $manager->persist($certifiedUser);

        $user = new User();
        $password = $this->passwordHasher->hashPassword($user, 'password');
        $user->setUsername('user');
        $user->setEmail('user@gmail.com');
        $user->setRoles(["ROLE_USER"]);
        $user->setPassword($password);
        $manager->persist($user);

        //Vision Disorders
        $myopie = new VisionDisorder();
        $myopie->setDisorderName("myopie");
        $manager->persist($myopie);

        $daltonisme = new VisionDisorder();
        $daltonisme->setDisorderName("daltonisme");
        $manager->persist($daltonisme);

        //Categories
        $accueilCategory = new Category();
        $accueilCategory->setSubject("accueil");
        $manager->persist($accueilCategory);

        $myopieCategory = new Category();
        $myopieCategory->setSubject("myopie");
        $manager->persist($myopieCategory);

        $presbytieCategory = new Category();
        $presbytieCategory->setSubject("presbytie");
        $manager->persist($presbytieCategory);

        $astigmatismeCategory = new Category();
        $astigmatismeCategory->setSubject("astigmatisme");
        $manager->persist($astigmatismeCategory);

        $daltonismeCategory = new Category();
        $daltonismeCategory->setSubject("daltonisme");
        $manager->persist($daltonismeCategory);

        $dmlaCategory = new Category();
        $dmlaCategory->setSubject("dmla");
        $manager->persist($dmlaCategory);

        $hypermetropieCategory = new Category();
        $hypermetropieCategory->setSubject("hypermetropie");
        $manager->persist($hypermetropieCategory);

        $manager->flush();
    }
}
