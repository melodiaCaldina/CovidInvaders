<?php

namespace App\Controller;

use App\Entity\Joueur;
use App\Form\JoueurType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class MainController extends AbstractController
{
    /**
     * @Route("/main", name="main")
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function index(Request $request, EntityManagerInterface $entityManager)
    {
//        $joueur = new Joueur();
//        $form = $this->createForm(JoueurType::class, $joueur);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $entityManager->persist($joueur);
//            $entityManager->flush();
////            return $this->render('main/game.html.twig', [
////                'player' => $joueur,
////            ]);
//            header('Location: file://C:/Users/Antoine/Desktop/CESI/COVID-Invaders/CovidInvaders/index.html.twig');
//
//        }

        return $this->render('index.html.twig');
    }

    /**
     * @Route ("/saveScore", name="score")
     * @param Request $request
     * @return Response
     */
    public function newScore(Request $request)
    {
        //dd('dfhcshik');

        $manager = $this->getDoctrine()->getManager();
        $name = $request->get('name');
        $score = $request->get('score');
        $niveau = $request->get('level');
        $ip = $request->get('ip');

        $user = $this->getDoctrine()->getRepository(Joueur::class)->findOneBy(['nom' => $name, 'ip' => $ip]);
        /** @var Joueur $user */
        if ($user !== null) {
            if ($user->getScore() > $score) {
                $user->setScore($score);
            }
            if ($user->getNiveau() > $niveau) {
                $user->setNiveau($niveau);
            }
            $manager->persist($user);
        } else {
            $newUser = new Joueur();

            $newUser->setNom($name);
            $newUser->setScore($score);
            $newUser->setNiveau($niveau);
            $newUser->setIp($ip);
            $manager->persist($newUser);
        }
        $manager->flush();
        return new Response();
    }
}
