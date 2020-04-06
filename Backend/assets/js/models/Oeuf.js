"use strict";
/**
 * Presse agrume lancé par la joueur pour détruire les Pampmousses mutants
 */
class Oeuf extends ElementMobile {
    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.mustDisappear = false;
        this.ajouterTexture(OeufTexture);

        this.setVitesse(0);
        this.setTaille(0);
    }
    setDisappear(value) {
        this.mustDisappear = value;
    }
    getDisappear() {
        return this.mustDisappear;
    }
    /**
	 * Animation du presse agrume
	 */
    animer() {
        //A chaque appel le presse agrume tourne de 6 degres

        super.animer();
    }
}