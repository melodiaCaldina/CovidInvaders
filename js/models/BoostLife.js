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
        this.ajouterTexture(BoostLifeTexture);
        this.setVitesse(0);
        this.setTaille(15);
        this.setDirection(0);
    }

}