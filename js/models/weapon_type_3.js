﻿"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class changeW3 extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.name = "Weapon3";
        this.ajouterTexture(changeWeapon_3);
        this.setVitesse(0);
        this.setTaille(120);
    }

}