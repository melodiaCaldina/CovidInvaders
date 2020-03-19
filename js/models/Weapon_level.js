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
        this.setTaille(0);
        this.level = 0;
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
            var that = this;
            this.activerTexture(5);
            setTimeout(function () { that.activerTexture(4); }, 100);
            setTimeout(function () { that.activerTexture(5); }, 200);
           
        }
    }
}