"use strict";
/**
 *peche
 */
class Mure extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 3;
        this.nbPDV = 5;
        this.type = "ennemi";
        this.genre = "mob";
        this.name = "Mure";
        this.pointValue = 4;
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.ajouterTexture(TextureMure);
        this.ajouterTexture(mureExplo1);
        this.ajouterTexture(mureExplo2);
        this.ajouterTexture(mureExplo3);
        this.ajouterTexture(mureExplo4);
        this.ajouterTexture(mureExplo5);
        this.ajouterTexture(mureExplo6);
        this.ajouterTexture(mureExplo7);
        this.ajouterTexture(mureExplo8);
        this.ajouterTexture(mureExplo9);
        this.ajouterTexture(mureExplo10);
        this.ajouterTexture(mureFlaque);
        this.ajouterTexture(mureFlaque_10);
        this.ajouterTexture(mureFlaque_20);
        this.ajouterTexture(mureFlaque_30);
        this.ajouterTexture(mureFlaque_40);
        this.ajouterTexture(mureFlaque_50);
        this.ajouterTexture(mureFlaque_60);
        this.ajouterTexture(mureFlaque_70);
        this.ajouterTexture(mureFlaque_80);
        this.ajouterTexture(mureFlaque_90);
        this.activerTexture(0);
        this.setVitesse(3);
        this.setTaille(35);
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