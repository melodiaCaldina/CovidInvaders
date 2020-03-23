"use strict";
/**
 * Elément mobile représentant un Boss
 */
class FramboiseUltime extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.type = "ennemi";
        this.ajouterTexture(Ultime);
        this.ajouterTexture(UltimeClignotant);
        this.ajouterTexture(Ultime75);
        this.ajouterTexture(Ultime75Clignotant);
        this.ajouterTexture(Ultime50);
        this.ajouterTexture(Ultime50Clignotant);
        this.ajouterTexture(Ultime25);
        this.ajouterTexture(Ultime25Clignotant);
        this.ajouterTexture(UltimeFin10);
        this.ajouterTexture(UltimeFin20);
        this.ajouterTexture(UltimeFin30);
        this.ajouterTexture(UltimeFin40);
        this.ajouterTexture(UltimeFin50);
        this.ajouterTexture(UltimeFin60);
        this.ajouterTexture(UltimeFin70);
        this.ajouterTexture(UltimeFin80);
        this.ajouterTexture(UltimeFin90);
        this.ajouterTexture(UltimeFin);
        this.ajouterTexture(UltimeExplo01);
        this.ajouterTexture(UltimeExplo02);
        this.ajouterTexture(UltimeExplo03);
        this.ajouterTexture(UltimeExplo04);
        this.ajouterTexture(UltimeExplo05);
        this.ajouterTexture(UltimeExplo06);
        this.ajouterTexture(UltimeExplo07);
        this.ajouterTexture(UltimeExplo08);
        this.ajouterTexture(UltimeExplo09);
        this.ajouterTexture(UltimeExplo10);
        this.ajouterTexture(UltimeExplo11);
        this.ajouterTexture(UltimeExplo12);
        this.ajouterTexture(UltimeExplo13);
        this.ajouterTexture(UltimeExplo14);
        this.ajouterTexture(UltimeExplo15);
        this.ajouterTexture(UltimeExplo16);
        this.ajouterTexture(UltimeExplo17);
        this.ajouterTexture(UltimeExplo18);
        this.ajouterTexture(UltimeExplo19);
        this.ajouterTexture(UltimeSpeech);
        this.activerTexture(0);
        this.setVitesse(5);
        this.setTaille(600);
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
        if (this.getIndiceTextureActive() == 2)
            this.activerTexture(3);
        else if (this.getIndiceTextureActive() == 3)
            this.activerTexture(2);
        if (this.getIndiceTextureActive() == 4)
            this.activerTexture(5);
        else if (this.getIndiceTextureActive() == 5)
            this.activerTexture(4);
        if (this.getIndiceTextureActive() == 6)
            this.activerTexture(7);
        else if (this.getIndiceTextureActive() == 7)
            this.activerTexture(6);
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
        else if (this.getIndiceTextureActive() == 2 || this.getIndiceTextureActive() == 3)
            this.activerTexture(2);
        else if (this.getIndiceTextureActive() == 4 || this.getIndiceTextureActive() == 5)
            this.activerTexture(4);
        else if (this.getIndiceTextureActive() == 6 || this.getIndiceTextureActive() == 7)
            this.activerTexture(6);
        this.isClignoting = false;
    }

    beginDeath() {
        this.setVitesse(0);
        var that = this;

        setTimeout(function () { that.activerTexture(18); }, 80);
        setTimeout(function () { that.activerTexture(19); }, 160);
        setTimeout(function () { that.activerTexture(20); }, 240);
        setTimeout(function () { that.activerTexture(21); }, 320);
        setTimeout(function () { that.activerTexture(22); }, 400);
        setTimeout(function () { that.activerTexture(23); }, 480);
        setTimeout(function () { that.activerTexture(24); }, 560);
        setTimeout(function () { that.activerTexture(25); }, 640);
        setTimeout(function () { that.activerTexture(26); }, 720);
        setTimeout(function () { that.activerTexture(27); }, 800);
        setTimeout(function () { that.activerTexture(28); }, 880);
        setTimeout(function () { that.activerTexture(29); }, 960);
        setTimeout(function () { that.activerTexture(30); }, 1040);
        setTimeout(function () { that.activerTexture(31); }, 1120);
        setTimeout(function () { that.activerTexture(32); }, 1200);
        setTimeout(function () { that.activerTexture(33); }, 1280);
        setTimeout(function () { that.activerTexture(34); }, 1360);
        setTimeout(function () { that.activerTexture(35); }, 1440);
        setTimeout(function () { that.activerTexture(36); }, 1520);
        setTimeout(function () { that.activerTexture(17); }, 1600);
        setTimeout(function () { that.activerTexture(16); }, 1800);
        setTimeout(function () { that.activerTexture(15); }, 1880);
        setTimeout(function () { that.activerTexture(14); }, 1960);
        setTimeout(function () { that.activerTexture(13); }, 2040);
        setTimeout(function () { that.activerTexture(12); }, 2120);
        setTimeout(function () { that.activerTexture(11); }, 2200);
        setTimeout(function () { that.activerTexture(10); }, 2280);
        setTimeout(function () { that.activerTexture(9); }, 2360);
        setTimeout(function () { that.activerTexture(8); }, 2440);
    }

}