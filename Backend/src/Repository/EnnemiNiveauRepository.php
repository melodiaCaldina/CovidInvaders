<?php

namespace App\Repository;

use App\Entity\EnnemiNiveau;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method EnnemiNiveau|null find($id, $lockMode = null, $lockVersion = null)
 * @method EnnemiNiveau|null findOneBy(array $criteria, array $orderBy = null)
 * @method EnnemiNiveau[]    findAll()
 * @method EnnemiNiveau[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EnnemiNiveauRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EnnemiNiveau::class);
    }

    // /**
    //  * @return EnnemiNiveau[] Returns an array of EnnemiNiveau objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EnnemiNiveau
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
