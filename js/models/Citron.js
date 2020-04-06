"use strict";
/**
 *peche
 */
class Citron extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 4;
        this.type = "ennemi";
        this.genre = "mob";
        this.name = "Citron";
        this.nbPDV = 7;
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.pointValue = 8;
        this.ajouterTexture(TextureCitron);
        this.ajouterTexture(CitronExplo1);
        this.ajouterTexture(CitronExplo2);
        this.ajouterTexture(CitronExplo3);
        this.ajouterTexture(CitronExplo4);
        this.ajouterTexture(CitronExplo5);
        this.ajouterTexture(CitronExplo6);
        this.ajouterTexture(CitronExplo7);
        this.ajouterTexture(CitronExplo8);
        this.ajouterTexture(CitronFlaque);
        this.ajouterTexture(CitronFlaque_10);
        this.ajouterTexture(CitronFlaque_20);
        this.ajouterTexture(CitronFlaque_30);
        this.ajouterTexture(CitronFlaque_40);
        this.ajouterTexture(CitronFlaque_50);
        this.ajouterTexture(CitronFlaque_60);
        this.ajouterTexture(CitronFlaque_70);
        this.ajouterTexture(CitronFlaque_80);
        this.ajouterTexture(CitronFlaque_90);
        this.activerTexture(0);
        this.setVitesse(4);
        this.setTaille(50);
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

        this.setTaille(100);
        this.setVitesse(0);
        this.isDead = true;
        var that = this;

        // setTimeout(function () { that.isDead = true; }, 80);
        setTimeout(function () { that.activerTexture(1); }, 80);
        setTimeout(function () { that.activerTexture(2); }, 160);
        setTimeout(function () { that.activerTexture(3); }, 240);
        setTimeout(function () { that.activerTexture(4); }, 320);
        setTimeout(function () { that.activerTexture(5); }, 400);
        setTimeout(function () { that.activerTexture(6); }, 480);
        setTimeout(function () { that.activerTexture(7); }, 560);
        setTimeout(function () { that.activerTexture(8); }, 640);
        setTimeout(function () { that.activerTexture(9); }, 800);
        setTimeout(function () { that.activerTexture(10); }, 7000);
        setTimeout(function () { that.activerTexture(11); }, 7200);
        setTimeout(function () { that.activerTexture(12); }, 7500);
        setTimeout(function () { that.activerTexture(13); }, 7800);
        setTimeout(function () { that.activerTexture(14); }, 8000);
        setTimeout(function () { that.activerTexture(15); }, 8200);
        setTimeout(function () { that.activerTexture(16); }, 8500);
        setTimeout(function () { that.activerTexture(17); }, 8800);
        setTimeout(function () { that.activerTexture(18); }, 9000);
        setTimeout(function () { that.mustDisappear = true; }, 12000);
        setTimeout(function () { that.isWin = true; }, 1600);

        var musicTir = document.querySelector("#audioExploTrash");
        musicTir.volume = 0.05;
        musicTir.play();
    }
}