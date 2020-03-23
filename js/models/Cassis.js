"use strict";
/**
 *peche
 */
class Cassis extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 3;
        this.type = "ennemi";
        this.nbPDV = 3;
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.ajouterTexture(TextureCassis);
        this.ajouterTexture(cassisExplo1);
        this.ajouterTexture(cassisExplo2);
        this.ajouterTexture(cassisExplo3);
        this.ajouterTexture(cassisExplo4);
        this.ajouterTexture(cassisExplo5);
        this.ajouterTexture(cassisExplo6);
        this.ajouterTexture(cassisExplo7);
        this.ajouterTexture(cassisExplo8);
        this.ajouterTexture(cassisExplo9);
        this.ajouterTexture(cassisExplo10);
        this.ajouterTexture(cassisFlaque);
        this.ajouterTexture(cassisFlaque_10);
        this.ajouterTexture(cassisFlaque_20);
        this.ajouterTexture(cassisFlaque_30);
        this.ajouterTexture(cassisFlaque_40);
        this.ajouterTexture(cassisFlaque_50);
        this.ajouterTexture(cassisFlaque_60);
        this.ajouterTexture(cassisFlaque_70);
        this.ajouterTexture(cassisFlaque_80);
        this.ajouterTexture(cassisFlaque_90);
        this.activerTexture(0);
        this.setVitesse(3);
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
        setTimeout(function () { that.activerTexture(1); }, 80);
        setTimeout(function () { that.activerTexture(2); }, 160);
        setTimeout(function () { that.activerTexture(3); }, 240);
        setTimeout(function () { that.activerTexture(4); }, 320);
        setTimeout(function () { that.activerTexture(5); }, 400);
        setTimeout(function () { that.activerTexture(6); }, 480);
        setTimeout(function () { that.activerTexture(7); }, 560);
        setTimeout(function () { that.activerTexture(8); }, 640);
        setTimeout(function () { that.activerTexture(9); }, 720);
        setTimeout(function () { that.activerTexture(10); }, 800);
        setTimeout(function () { that.activerTexture(11); }, 960);
        setTimeout(function () { that.activerTexture(12); }, 7000);
        setTimeout(function () { that.activerTexture(13) }, 7200);
        setTimeout(function () { that.activerTexture(14); }, 7500);
        setTimeout(function () { that.activerTexture(15); }, 7800);
        setTimeout(function () { that.activerTexture(16); }, 8000);
        setTimeout(function () { that.activerTexture(17); }, 8200);
        setTimeout(function () { that.activerTexture(18); }, 8500);
        setTimeout(function () { that.activerTexture(19); }, 8800);
        setTimeout(function () { that.activerTexture(20); }, 9000);
        setTimeout(function () { that.mustDisappear = true; }, 12000);
        setTimeout(function () { that.isWin = true; }, 1600);

        var musicTir = document.querySelector("#audioExploTrash");
        musicTir.volume = 0.05;
        musicTir.play();
    }
}