﻿"use strict";
/**
 * Elément mobile représentant un Boss
 */
class Fraise extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.baseVitesse = 3;
        this.type = "ennemi";
        this.genre = "boss";
        this.name = "Fraise";
        this.pointValue = 20;
        this.ajouterTexture(TextureFraise);
        this.ajouterTexture(fraiseTouche);
        this.ajouterTexture(fraise_fin_10);
        this.ajouterTexture(fraise_fin_20);
        this.ajouterTexture(fraise_fin_30);
        this.ajouterTexture(fraise_fin_40);
        this.ajouterTexture(fraise_fin_50);
        this.ajouterTexture(fraise_fin_60);
        this.ajouterTexture(fraise_fin_70);
        this.ajouterTexture(fraise_fin_80);
        this.ajouterTexture(fraise_fin_90);
        this.ajouterTexture(fraiseSpeech);
        this.activerTexture(0);
        this.setVitesse(3);
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

        setTimeout(function () { that.activerTexture(2); }, 40);
        setTimeout(function () { that.activerTexture(3); }, 80);
        setTimeout(function () { that.activerTexture(4); }, 120);
        setTimeout(function () { that.activerTexture(5); }, 160);
        setTimeout(function () { that.activerTexture(6); }, 200);
        setTimeout(function () { that.activerTexture(7); }, 240);
        setTimeout(function () { that.activerTexture(8); }, 280);
        setTimeout(function () { that.activerTexture(9); }, 320);
        setTimeout(function () { that.activerTexture(10); }, 360);
    }

}