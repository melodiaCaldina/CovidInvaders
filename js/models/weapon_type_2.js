﻿"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class changeW2 extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.ajouterTexture(changeWeapon_2);
        this.setVitesse(0);
        this.setTaille(120);
    }

}