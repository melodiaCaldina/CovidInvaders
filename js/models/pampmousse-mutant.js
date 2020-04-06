"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class PampmousseMutant extends ElementMobile
{
    
	/**
	 * Constructeur
	 */
    constructor()
	{
        super();
        this.baseVitesse = 3;
        this.isDead = false;
        this.mustDisappear = false;
        this.isWin = false;
        this.type = "ennemi";
        this.genre = "trash";
        this.name = "Trash";
        this.pointValue = 1;
	    this.ajouterTexture(pampmousseTexture1);
	    this.ajouterTexture(pampmousseTexture2);
	    this.ajouterTexture(pampmousseTexture3);
	    this.ajouterTexture(pampmousseTexture4);
	    this.ajouterTexture(textureDeathP1);
	    this.ajouterTexture(textureDeathP2);
	    this.ajouterTexture(textureDeathP3);
	    this.ajouterTexture(textureDeathP4);
	    this.ajouterTexture(textureDeathP5);
	    this.ajouterTexture(textureDeathP6);
	    this.ajouterTexture(textureDeathP7);
	    this.ajouterTexture(textureDeathP8);
	    this.ajouterTexture(textureDeathP9);
	    this.ajouterTexture(textureDeathP10);
	    this.ajouterTexture(textureDeathP11);
	    this.ajouterTexture(textureDeathP12);
	    this.ajouterTexture(textureDeathP13);
	    this.ajouterTexture(textureFlaqueF);
	    this.ajouterTexture(textureFlaque10);
	    this.ajouterTexture(textureFlaque20);
	    this.ajouterTexture(textureFlaque30);
	    this.ajouterTexture(textureFlaque40);
	    this.ajouterTexture(textureFlaque50);
	    this.ajouterTexture(textureFlaque60);
	    this.ajouterTexture(textureFlaque70);
	    this.ajouterTexture(textureFlaque80);
	    this.ajouterTexture(textureFlaque90);
	    this.textureAleatoire();
	    this.setVitesse(3);
	    this.setTaille(30);
	    this.setDirection(Math.floor((Math.random() * 360) + 1)*0.0174533);
	}

    textureAleatoire() {
        if (!this.isDead) {
            var alea = Math.floor((Math.random() * 4) + 1);
            this.activerTexture(alea - 1);
        }
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
        setTimeout(function () { that.activerTexture(4); }, 40);
        setTimeout(function () { that.activerTexture(5); }, 80);
        setTimeout(function () { that.activerTexture(6); }, 120);
        setTimeout(function () { that.activerTexture(7); }, 160);
        setTimeout(function () { that.activerTexture(8); }, 200);
        setTimeout(function () { that.activerTexture(9); }, 240);
        setTimeout(function () { that.activerTexture(10); }, 280);
        setTimeout(function () { that.activerTexture(11); }, 320);
        setTimeout(function () { that.activerTexture(12); }, 360);
        setTimeout(function () { that.activerTexture(13); }, 400);
        setTimeout(function () { that.activerTexture(14); }, 440);
        setTimeout(function () { that.activerTexture(15); }, 480);
        setTimeout(function () { that.activerTexture(16); }, 520);
        setTimeout(function () { that.activerTexture(17); }, 560);
        setTimeout(function () { that.activerTexture(18); }, 7000);
        setTimeout(function () { that.activerTexture(19); }, 7200);
        setTimeout(function () { that.activerTexture(20); }, 7500);
        setTimeout(function () { that.activerTexture(21); }, 7800);
        setTimeout(function () { that.activerTexture(22); }, 8000);
        setTimeout(function () { that.activerTexture(23); }, 8200);
        setTimeout(function () { that.activerTexture(24); }, 8500);
        setTimeout(function () { that.activerTexture(25); }, 8800);
        setTimeout(function () { that.activerTexture(26); }, 9000);
        setTimeout(function () { that.mustDisappear = true; }, 12000);
        setTimeout(function () { that.isWin = true; }, 1600);

        var musicTir = document.querySelector("#audioExploTrash");
        musicTir.volume = 0.05;
        musicTir.play();
    }
}