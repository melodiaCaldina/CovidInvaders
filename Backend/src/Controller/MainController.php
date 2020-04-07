<?php

namespace App\Controller;

use App\Entity\Joueur;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
        return $this->render('index.html.twig');
    }

    /**
     * @Route("/getScore", name="leaderboard")
     * @return Response
     */
    public function getScoresLeaderBoard(): Response
    {
        $scores = $this->getDoctrine()->getRepository(Joueur::class)->findTop10();

        return new Response(json_encode($scores));
    }

    /**
     * @Route ("/saveScore", name="score")
     * @param Request $request
     * @return Response
     */
    public function newScore(Request $request)
    {
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

    /**
     * @Route("/getScream", name="get.scream")
     * @param Request $request
     * @return Response
     */
    public function getScreamInfo(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(Joueur::class)->findOneBy(['ip' => $request->get('ip')]);

        /** @var Joueur $user */
        $scream = $user->getScream();

        return new Response(json_encode($scream));
    }

    /**
     * @Route("/setScreamAll", name="set.scream.all")
     * @return Response
     */
    public function setScreamToAll()
    {
        $manager = $this->getDoctrine()->getManager();

        $users = $this->getDoctrine()->getRepository(Joueur::class)->findAll();

        /** @var Joueur $user */
        foreach ($users as $user) {
            $user->setScream(1);
        }
        $manager->flush();

        return new Response();
    }

    /**
     * @Route("", name="")
     * @param Request $request
     * @return Response
     */
    public function setSelfScream(Request $request)
    {
        $manager = $this->getDoctrine()->getManager();

        $scream = $request->get('scream');
        $user = $this->getDoctrine()->getRepository(Joueur::class)->findOneBy(['ip' => $request->get('ip')]);

        /** @var Joueur $user */
        $user->setScream($scream);

        $manager->flush();

        return new Response();
    }
}
