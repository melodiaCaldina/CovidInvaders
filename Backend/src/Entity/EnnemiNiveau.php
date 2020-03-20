<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EnnemiNiveauRepository")
 */
class EnnemiNiveau
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Niveau", inversedBy="ennemiNiveaux")
     */
    private $niveau;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Ennemi", inversedBy="ennemiNiveaux")
     */
    private $ennemi;

    /**
     * @ORM\Column(type="integer")
     */
    private $nombre;

    public function __construct()
    {
        $this->niveau = new ArrayCollection();
        $this->ennemi = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Niveau[]
     */
    public function getNiveau(): Collection
    {
        return $this->niveau;
    }

    public function addNiveau(Niveau $niveau): self
    {
        if (!$this->niveau->contains($niveau)) {
            $this->niveau[] = $niveau;
        }

        return $this;
    }

    public function removeNiveau(Niveau $niveau): self
    {
        if ($this->niveau->contains($niveau)) {
            $this->niveau->removeElement($niveau);
        }

        return $this;
    }

    /**
     * @return Collection|Ennemi[]
     */
    public function getEnnemi(): Collection
    {
        return $this->ennemi;
    }

    public function addEnnemi(Ennemi $ennemi): self
    {
        if (!$this->ennemi->contains($ennemi)) {
            $this->ennemi[] = $ennemi;
        }

        return $this;
    }

    public function removeEnnemi(Ennemi $ennemi): self
    {
        if ($this->ennemi->contains($ennemi)) {
            $this->ennemi->removeElement($ennemi);
        }

        return $this;
    }

    public function getNombre(): ?int
    {
        return $this->nombre;
    }

    public function setNombre(int $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }
}
