"use strict";
/**
 * Type BOSS
 */
class Screamer extends ElementMobile {
    /**
	 * Constructeur
	 */
    constructor() {
        super();

        this.ajouterTexture(Screamer1);
        this.ajouterTexture(Screamer2);

        this.setVitesse(0);
        this.setTaille(0);
    }

    /**
	 * Animation du presse agrume
	 */
    animer() {
        //A chaque appel le presse agrume tourne de 6 degres

        super.animer();
    }
}