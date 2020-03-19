"use strict";
/**
 * Elément mobile représentant un Boss
 */
class Boss extends ElementMobile {

    /**
	 * Constructeur
	 */
    constructor() {
        super();
        this.ajouterTexture(BossTexture);
        this.ajouterTexture(BossTexture2);
        this.ajouterTexture(BossTexture3);
        this.ajouterTexture(BossTexture4);
        this.ajouterTexture(BossTexture5);
        this.ajouterTexture(BossTexture6);
        this.ajouterTexture(BossTexture7);
        this.ajouterTexture(BossTexture8);
        this.ajouterTexture(BossExplo1);
        this.ajouterTexture(BossExplo2);
        this.ajouterTexture(BossExplo3);
        this.ajouterTexture(BossExplo4);
        this.ajouterTexture(BossExplo5);
        this.ajouterTexture(BossExplo6);
        this.ajouterTexture(BossExplo7);
        this.ajouterTexture(BossExplo8);
        this.ajouterTexture(BossExplo9);
        this.ajouterTexture(BossExplo10);
        this.ajouterTexture(BossExplo11);
        this.ajouterTexture(BossExplo12);
        this.ajouterTexture(BossExplo13);
        this.ajouterTexture(BossExplo14);
        this.ajouterTexture(BossExplo15);
        this.ajouterTexture(BossExplo16);
        this.ajouterTexture(BossExplo17);
        this.ajouterTexture(BossExplo18);
        this.ajouterTexture(BossEclate1);
        this.ajouterTexture(BossEclate2);
        this.ajouterTexture(BossEclate3);
        this.ajouterTexture(BossEclate4);
        this.ajouterTexture(BossEclate5);
        this.ajouterTexture(BossEclate6);
        this.ajouterTexture(BossEclate7);
        this.ajouterTexture(BossEclate8);
        this.ajouterTexture(BossEclate9);
        this.ajouterTexture(BossEclate10);
        this.ajouterTexture(BossEclate11);
        this.ajouterTexture(BossEclate12);
        this.ajouterTexture(BossEclate13);
        this.ajouterTexture(BossEclate14);
        this.ajouterTexture(BossEclate15);
        this.ajouterTexture(BossEclate16);
        this.ajouterTexture(BossAppearTexture);
        this.activerTexture(0);
        this.setVitesse(3);
        this.setTaille(200);
        this.isClignoting = false;
        this.setDirection(0);
        this._timerClignotement = null;
        this._timerFinClignotement = null;
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
        
        setTimeout(function () { that.activerTexture(8); }, 40);
        setTimeout(function () { that.activerTexture(9); }, 80);
        setTimeout(function () { that.activerTexture(10); }, 120);
        setTimeout(function () { that.activerTexture(11); }, 160);
        setTimeout(function () { that.activerTexture(12); }, 200);
        setTimeout(function () { that.activerTexture(13); }, 240);
        setTimeout(function () { that.activerTexture(14); }, 280);
        setTimeout(function () { that.activerTexture(15); }, 320);
        setTimeout(function () { that.activerTexture(16); }, 360);
        setTimeout(function () { that.activerTexture(17); }, 400);
        setTimeout(function () { that.activerTexture(18); }, 440);
        setTimeout(function () { that.activerTexture(19); }, 480);
        setTimeout(function () { that.activerTexture(20); }, 520);
        setTimeout(function () { that.activerTexture(21); }, 560);
        setTimeout(function () { that.activerTexture(22); }, 600);
        setTimeout(function () { that.activerTexture(23); }, 640);
        setTimeout(function () { that.activerTexture(24); }, 680);
        setTimeout(function () { that.activerTexture(25); }, 720);
        setTimeout(function () { that.activerTexture(26); }, 760);
        setTimeout(function () { that.activerTexture(27); }, 800);
        setTimeout(function () { that.activerTexture(28); }, 840);
        setTimeout(function () { that.activerTexture(29); }, 880);
        setTimeout(function () { that.activerTexture(30); }, 920);
        setTimeout(function () { that.activerTexture(31); }, 960);
        setTimeout(function () { that.activerTexture(32); }, 1000);
        setTimeout(function () { that.activerTexture(33); }, 1040);
        setTimeout(function () { that.activerTexture(34); }, 1080);
        setTimeout(function () { that.activerTexture(35); }, 1120);
        setTimeout(function () { that.activerTexture(36); }, 1160);
        setTimeout(function () { that.activerTexture(37); }, 1200);
        setTimeout(function () { that.activerTexture(38); }, 1240);
        setTimeout(function () { that.activerTexture(39); }, 1280);
        setTimeout(function () { that.activerTexture(40); }, 1320);
    }
    
}