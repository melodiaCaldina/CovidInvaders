"use strict";
/**
 *peche
 */
class miniCerise extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 5;
        this.nbPDV = 4;
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.type = "ennemi";
        this.ajouterTexture(TextureCerise1);
        this.ajouterTexture(TextureCerise2);
        this.ajouterTexture(TextureCerise3);
        this.ajouterTexture(TextureCerise4);
        this.ajouterTexture(TextureCerise5);
        this.ajouterTexture(TextureCerise6);
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
        this.setVitesse(5);
        this.setTaille(20);
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
        setTimeout(function () { that.activerTexture(6); }, 80);
        setTimeout(function () { that.activerTexture(7); }, 7000);
        setTimeout(function () { that.activerTexture(8) }, 7200);
        setTimeout(function () { that.activerTexture(9); }, 7500);
        setTimeout(function () { that.activerTexture(10); }, 7800);
        setTimeout(function () { that.activerTexture(11); }, 8000);
        setTimeout(function () { that.activerTexture(12); }, 8200);
        setTimeout(function () { that.activerTexture(13); }, 8500);
        setTimeout(function () { that.activerTexture(14); }, 8800);
        setTimeout(function () { that.activerTexture(15); }, 9000);
        setTimeout(function () { that.mustDisappear = true; }, 12000);
        setTimeout(function () { that.isWin = true; }, 1600);

        var musicTir = document.querySelector("#audioExploTrash");
        musicTir.volume = 0.05;
        musicTir.play();
    }
}