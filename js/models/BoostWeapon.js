"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class BoostWeapon extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.ajouterTexture(BoostWeaponTexture);
        this.setTaille(15);
    }

}