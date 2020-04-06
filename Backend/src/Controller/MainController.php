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
        $joueur = new Joueur();
        $form = $this->createForm(JoueurType::class, $joueur);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($joueur);
            $entityManager->flush();
//            return $this->render('main/game.html.twig', [
//                'player' => $joueur,
//            ]);
            header('Location: file://C:/Users/Antoine/Desktop/CESI/COVID-Invaders/CovidInvaders/index.html');

        }

        return $this->render('main/index.html.twig', [
            'form' => $form->createView(),
            'player' => null,
        ]);
    }

    /**
     * @Route ("/game", name="game")
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param Joueur $joueur
     * @return Response
     */
    public function game(Request $request, EntityManagerInterface $entityManager, Joueur $joueur)
    {
        $joueur = $this->get('joueur');
        return $this->render('main/game.html.twig', [
            'player' => $joueur,
        ]);

    }

    /**
     * @Route ("/ajax/save/score", name="game")
     * @param Request $request
     * @return Response
     */
    public function newScore(Request $request)
    {
        dd('dfhcshik');

        $manager = $this->getDoctrine()->getManager();
        $name = $request->get('name');
        $score = $request->get('score');

        $user = $this->getDoctrine()->getRepository(Joueur::class)->findBy(['nom' => $name]);
        /** @var Joueur $user */
        if ($user !== null) {
            $user->addScore($score);
        } else {
            $newUser = new Joueur();
            $newUser->setNom($name);
            $newUser->addScore($score);
            $manager->persist($newUser);
        }
        $manager->flush();
        return new Response();
    }
}
