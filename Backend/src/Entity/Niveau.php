<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NiveauRepository")
 */
class Niveau
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $label;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\EnnemiNiveau", mappedBy="niveau")
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

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

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
            $ennemiNiveau->addNiveau($this);
        }

        return $this;
    }

    public function removeEnnemiNiveau(EnnemiNiveau $ennemiNiveau): self
    {
        if ($this->ennemiNiveaux->contains($ennemiNiveau)) {
            $this->ennemiNiveaux->removeElement($ennemiNiveau);
            $ennemiNiveau->removeNiveau($this);
        }

        return $this;
    }
}
