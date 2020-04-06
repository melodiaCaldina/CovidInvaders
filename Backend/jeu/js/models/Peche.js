"use strict";
/**
 *peche
 */
class Peche extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 3;
        this.nbPDV = 10;
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.type = "ennemi";
        this.genre = "mob";
        this.name = "Peche";
        this.pointValue = 8;
        this.ajouterTexture(Texturepeche);
        this.ajouterTexture(PecheExplo1);
        this.ajouterTexture(PecheExplo2);
        this.ajouterTexture(PecheExplo3);
        this.ajouterTexture(PecheExplo4);
        this.ajouterTexture(PecheExplo5);
        this.ajouterTexture(PecheExplo6);
        this.ajouterTexture(PecheExplo7);
        this.ajouterTexture(PecheExplo8);
        this.ajouterTexture(PecheExplo9);
        this.ajouterTexture(PecheExplo10);
        this.ajouterTexture(PecheFlaque);
        this.ajouterTexture(PecheFlaque_10);
        this.ajouterTexture(PecheFlaque_20);
        this.ajouterTexture(PecheFlaque_30);
        this.ajouterTexture(PecheFlaque_40);
        this.ajouterTexture(PecheFlaque_50);
        this.ajouterTexture(PecheFlaque_60);
        this.ajouterTexture(PecheFlaque_70);
        this.ajouterTexture(PecheFlaque_80);
        this.ajouterTexture(PecheFlaque_90);
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