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
        this.type = "Boost";
        this.name = "BoostWeapon";
        this.ajouterTexture(BoostWeaponTexture);
        this.setTaille(20);
    }

}