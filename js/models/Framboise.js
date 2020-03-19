"use strict";
/**
 *peche
 */
class Framboise extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.nbPDV = 5;
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.ajouterTexture(TextureFramboise);
        this.ajouterTexture(framboiseExplo1);
        this.ajouterTexture(framboiseExplo2);
        this.ajouterTexture(framboiseExplo3);
        this.ajouterTexture(framboiseExplo4);
        this.ajouterTexture(framboiseExplo5);
        this.ajouterTexture(framboiseExplo6);
        this.ajouterTexture(framboiseExplo7);
        this.ajouterTexture(framboiseExplo8);
        this.ajouterTexture(framboiseExplo9);
        this.ajouterTexture(framboiseExplo10);
        this.ajouterTexture(framboiseFlaque);
        this.ajouterTexture(framboiseFlaque_10);
        this.ajouterTexture(framboiseFlaque_20);
        this.ajouterTexture(framboiseFlaque_30);
        this.ajouterTexture(framboiseFlaque_40);
        this.ajouterTexture(framboiseFlaque_50);
        this.ajouterTexture(framboiseFlaque_60);
        this.ajouterTexture(framboiseFlaque_70);
        this.ajouterTexture(framboiseFlaque_80);
        this.ajouterTexture(framboiseFlaque_90);
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