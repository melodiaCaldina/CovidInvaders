"use strict";
/**
 * Presse agrume lancé par la joueur pour détruire les Pampmousses mutants
 */
class BigMunition extends ElementMobile {
    /**
	 * Constructeur
	 */
    constructor() {
        super();

        this.baseVitesse = 8;
        this.type = "Tirennemi";
        this.ajouterTexture(BigMunitions);

        this.setVitesse(8);
        this.setTaille(20);
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