﻿"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class changeW1 extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.name = "Weapon1";
        this.ajouterTexture(changeWeapon);
        this.setVitesse(0);
        this.setTaille(120);
    }

}