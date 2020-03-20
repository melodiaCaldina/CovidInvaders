"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class weaponLevel extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.ajouterTexture(textureWeapon0);
        this.ajouterTexture(textureWeapon1);
        this.ajouterTexture(textureWeapon2);
        this.ajouterTexture(textureWeapon3);
        this.ajouterTexture(textureWeapon4);
        this.ajouterTexture(textureWeapon5);
        this.ajouterTexture(textureWeapon6);
        this.ajouterTexture(textureWeapon7);
        this.ajouterTexture(textureWeapon8);
        this.ajouterTexture(textureWeapon9);
        this.ajouterTexture(textureWeapon10);
        this.setTaille(0);
        this.level = 0;
        this.MaxActive = 5;
        this.activerTexture(0);
    }
    setTexture(value) {
        this.level = value;
        this.animerWeapon();
    }
    animerWeapon() {
        if (this.level != 5) {
            this.activerTexture(this.level);
        } else {
            this.MaxActive ++;
            if(this.MaxActive == 11){
                this.MaxActive = 5;
            }
            this.activerTexture(this.MaxActive);

        }
    }
}