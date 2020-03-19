"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class BoostSpeed extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.ajouterTexture(BoostSpeedTexture);
        this.setVitesse(0);
        this.setTaille(15);
        this.setDirection(0);
    }

}