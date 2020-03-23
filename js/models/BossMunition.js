﻿"use strict";
/**
 * Presse agrume lancé par la joueur pour détruire les Pampmousses mutants
 */
class BossMunition extends ElementMobile {
    /**
	 * Constructeur
	 */
    constructor() {
        super();

        this.baseVitesse = 10;
        this.type = "Tirennemi";
        this.ajouterTexture(BossTextureMunition);

        this.setVitesse(10);
        this.setTaille(10);
    }

    /**
	 * Animation du presse agrume
	 */
    animer() {
        //A chaque appel le presse agrume tourne de 6 degres
        this.setRotation(this.getRotation() + Math.PI / 30);

        super.animer();
    }
}