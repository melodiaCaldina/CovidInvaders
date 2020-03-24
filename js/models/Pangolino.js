"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class Pangolino extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.countText = 0;
        this.type = "Pangolino";
        this.ajouterTexture(Pangolino1);
        this.ajouterTexture(Pangolino2);
        this.ajouterTexture(Pangolino3);
        this.activerTexture(this.countText);
        this.setVitesse(8);
        this.setTaille(150);
    }


    ChangeText(){
        this.countText++;
        if(this.countText >= 3){
            this.countText = 0;
        }
        this.activerTexture(this.countText);


    }

}