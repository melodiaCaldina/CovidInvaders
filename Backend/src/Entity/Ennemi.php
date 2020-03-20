<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EnnemiRepository")
 */
class Ennemi
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $nom;

    /**
     * @ORM\Column(type="integer")
     */
    private $point;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $boss;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\EnnemiNiveau", mappedBy="ennemi")
     */
    private $ennemiNiveaux;

    public function __construct()
    {
        $this->ennemiNiveaux = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPoint(): ?int
    {
        return $this->point;
    }

    public function setPoint(int $point): self
    {
        $this->point = $point;

        return $this;
    }

    public function getBoss(): ?bool
    {
        return $this->boss;
    }

    public function setBoss(?bool $boss): self
    {
        $this->boss = $boss;

        return $this;
    }

    /**
     * @return Collection|EnnemiNiveau[]
     */
    public function getEnnemiNiveaux(): Collection
    {
        return $this->ennemiNiveaux;
    }

    public function addEnnemiNiveau(EnnemiNiveau $ennemiNiveau): self
    {
        if (!$this->ennemiNiveaux->contains($ennemiNiveau)) {
            $this->ennemiNiveaux[] = $ennemiNiveau;
            $ennemiNiveau->addEnnemi($this);
        }

        return $this;
    }

    public function removeEnnemiNiveau(EnnemiNiveau $ennemiNiveau): self
    {
        if ($this->ennemiNiveaux->contains($ennemiNiveau)) {
            $this->ennemiNiveaux->removeElement($ennemiNiveau);
            $ennemiNiveau->removeEnnemi($this);
        }

        return $this;
    }
}
