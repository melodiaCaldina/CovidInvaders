"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class BoostLife extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.type = "Boost";
        this.name = "BoostLife";
        this.ajouterTexture(BoostLifeTexture);
        this.setVitesse(0);
        this.setTaille(20);
        this.setDirection(0);
    }

}