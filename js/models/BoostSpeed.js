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
        this.setVitesse(40);
        this.setTaille(50);
        this.setDirection(3.1459);
    }

}