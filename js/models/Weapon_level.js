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
        this.ajouterTexture(textureWeapon11);
        this.ajouterTexture(textureWeapon12);
        this.setTaille(0);
        this.level = 0;
        this.MaxActive = 5;
        this.MaxActive6 = false;
        this.activerTexture(0);
    }
    setTexture(value) {
        this.level = value;
        this.animerWeapon();
    }
    animerWeapon() {
        if (this.level != 5 && this.level != 6) {
            this.activerTexture(this.level);
        } else if(this.level == 5) {
            this.MaxActive ++;
            if(this.MaxActive == 11){
                this.MaxActive = 5;
            }
            this.activerTexture(this.MaxActive);

        } else if(this.level == 6) {
            this.MaxActive6 = !this.MaxActive6;
            if(this.MaxActive6){
                this.activerTexture(11);
            }else{
                this.activerTexture(12);

            }

        }
    }
}