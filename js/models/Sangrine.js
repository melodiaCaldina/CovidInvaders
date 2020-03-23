"use strict";
/**
 * Elément mobile représentant un Boss
 */
class Sangrine extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 4;
        this.type = "ennemi";
        this.ajouterTexture(TextureSangrine);
        this.ajouterTexture(sangrineTouche);
        this.ajouterTexture(sangrine_fin_10);
        this.ajouterTexture(sangrine_fin_20);
        this.ajouterTexture(sangrine_fin_30);
        this.ajouterTexture(sangrine_fin_40);
        this.ajouterTexture(sangrine_fin_50);
        this.ajouterTexture(sangrine_fin_60);
        this.ajouterTexture(sangrine_fin_70);
        this.ajouterTexture(sangrine_fin_80);
        this.ajouterTexture(sangrine_fin_90);
        this.ajouterTexture(sangrineSpeech);
        this.ajouterTexture(sangrineExplo01);
        this.ajouterTexture(sangrineExplo02);
        this.ajouterTexture(sangrineExplo03);
        this.ajouterTexture(sangrineExplo04);
        this.ajouterTexture(sangrineExplo05);
        this.ajouterTexture(sangrineExplo06);
        this.ajouterTexture(sangrineExplo07);
        this.ajouterTexture(sangrineExplo08);
        this.ajouterTexture(sangrineExplo09);
        this.ajouterTexture(sangrineExplo10);
        this.ajouterTexture(sangrineExplo11);
        this.ajouterTexture(sangrineExplo12);
        this.ajouterTexture(sangrineExplo13);
        this.ajouterTexture(sangrineExplo14);
        this.ajouterTexture(sangrineExplo15);
        this.activerTexture(0);
        this.setVitesse(4);
        this.setTaille(100);
        this.isClignoting = false;
        this.setDirection(0);
        this._timerClignotement = null;
        this._timerFinClignotement = null;
        this.nbPDV = 1;
    }

    setPDV(nb) {
        this.nbPDV = nb;
    }
    getPDV() {
        return this.nbPDV;
    }

    clignoter() {
        if (this.getIndiceTextureActive() == 0)
            this.activerTexture(1);
        else if (this.getIndiceTextureActive() == 1)
            this.activerTexture(0);
    }
    beginClignotement() {
        var that = this;
        if (!this.isClignoting) {
            this._timerClignotement = setInterval(function () { that.clignoter(); }, 100);
            this._timerFinClignotement = setTimeout(function () { that.endClignotement(); }, 1500);
            this.isClignoting = true;
        }
    }
    endClignotement() {
        clearInterval(this._timerClignotement);
        clearInterval(this._timerFinClignotement);
        if (this.getIndiceTextureActive() == 0 || this.getIndiceTextureActive() == 1)
            this.activerTexture(0);
        this.isClignoting = false;
    }

    beginDeath() {
        this.setVitesse(0);
        var that = this;

        setTimeout(function () { that.activerTexture(12); }, 80);
        setTimeout(function () { that.activerTexture(13); }, 160);
        setTimeout(function () { that.activerTexture(14); }, 240);
        setTimeout(function () { that.activerTexture(15); }, 320);
        setTimeout(function () { that.activerTexture(16); }, 400);
        setTimeout(function () { that.activerTexture(17); }, 480);
        setTimeout(function () { that.activerTexture(18); }, 560);
        setTimeout(function () { that.activerTexture(19); }, 640);
        setTimeout(function () { that.activerTexture(20); }, 720);
        setTimeout(function () { that.activerTexture(21); }, 800);
        setTimeout(function () { that.activerTexture(22); }, 880);
        setTimeout(function () { that.activerTexture(23); }, 960);
        setTimeout(function () { that.activerTexture(24); }, 1040);
        setTimeout(function () { that.activerTexture(25); }, 1120);


        setTimeout(function () { that.activerTexture(2); }, 1300);
        setTimeout(function () { that.activerTexture(3); }, 1380);
        setTimeout(function () { that.activerTexture(4); }, 1460);
        setTimeout(function () { that.activerTexture(5); }, 1540);
        setTimeout(function () { that.activerTexture(6); }, 1620);
        setTimeout(function () { that.activerTexture(7); }, 1700);
        setTimeout(function () { that.activerTexture(8); }, 1780);
        setTimeout(function () { that.activerTexture(9); }, 1860);
        setTimeout(function () { that.activerTexture(10); }, 1940);
    }

}