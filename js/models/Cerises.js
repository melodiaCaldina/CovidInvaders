"use strict";
/**
 *peche
 */
class Cerises extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 2;
        this.nbPDV = 8;
        this.type = "ennemi";
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.ajouterTexture(TextureCerise);
        this.ajouterTexture(ceriseFlaque);
        this.ajouterTexture(ceriseFlaque_10);
        this.ajouterTexture(ceriseFlaque_20);
        this.ajouterTexture(ceriseFlaque_30);
        this.ajouterTexture(ceriseFlaque_40);
        this.ajouterTexture(ceriseFlaque_50);
        this.ajouterTexture(ceriseFlaque_60);
        this.ajouterTexture(ceriseFlaque_70);
        this.ajouterTexture(ceriseFlaque_80);
        this.ajouterTexture(ceriseFlaque_90);
        this.activerTexture(0);
        this.setVitesse(2);
        this.setTaille(40);
        this.setDirection(Math.floor((Math.random() * 360) + 1) * 0.0174533);
    }

    getPDV() {
        return this.nbPDV;
    }
    setPDV(value) {
        this.nbPDV = value;
    }

    getDead() {
        return this.isDead;
    }
    getWin() {
        return this.isWin;
    }
    getMustDisappear() {
        return this.mustDisappear;
    }
    beginDeath() {
        this.isDead = true;
        this.setVitesse(0);
        var that = this;

        setTimeout(function () { that.activerTexture(1); }, 80);
        setTimeout(function () { that.activerTexture(2); }, 7000);
        setTimeout(function () { that.activerTexture(3) }, 7200);
        setTimeout(function () { that.activerTexture(4); }, 7500);
        setTimeout(function () { that.activerTexture(5); }, 7800);
        setTimeout(function () { that.activerTexture(6); }, 8000);
        setTimeout(function () { that.activerTexture(7); }, 8200);
        setTimeout(function () { that.activerTexture(8); }, 8500);
        setTimeout(function () { that.activerTexture(9); }, 8800);
        setTimeout(function () { that.activerTexture(10); }, 9000);
        setTimeout(function () { that.mustDisappear = true; }, 12000);
        setTimeout(function () { that.isWin = true; }, 1600);

        var musicTir = document.querySelector("#audioExploTrash");
        musicTir.volume = 0.05;
        musicTir.play();
    }
}