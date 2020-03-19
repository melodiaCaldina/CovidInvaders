"use strict";
/**
 * Jeu "L'attaque des Pampmousses Mutants !"
 */
class Jeu extends Sujet
{
	/**
	 * Constructeur
	 */
	constructor(controleur)
	{
	    super();
        this.musicIntro = document.querySelector("#audioPlayerIntro");
	    this.musicTrash = document.querySelector("#audioPlayerTrash");
	    this.musicBoss = document.querySelector("#audioPlayerBoss");
	    this.musicFinalBoss = document.querySelector("#audioPlayerFinalBoss");
	    this.ajouterObservateur(controleur);
	    this.timerIntro = null;
	    this.timerBoss = null;
	    this.timerTrash = null;
	    this.alterTime = false;
	    this.weaponLevel = null;
	    this.tir1 = false;
	    this.tir2 = false;
	    this.tir3 = false;
	    this.tir4 = false;
	    this.tir5 = false;
	    this.tir6 = false;
	    this.tir7 = false;
	    this.tir8 = false;
	    this.tir9 = false;
	    this.tir10 = false;
	    this.tir11= false;
	    this.tir12= false;
	    this.tir13= false;
	    this.tir14= false;
	    this.tir15 = false;
	    this.cineBoss = false;
	    this._shield = 0;
	    this._weapon = 0;

		//Fabrique permettant de générer les différents éléments graphiques du jeu
		this._fabriqueElement = new FabriqueElement();

		//Liste des éléments graphiques présents sur le plateau
		this._elementsGraphiques = new ElementsGraphiques(this);

		//Elément graphique symbolisant le joueur
		this._joueur = null;

		//Indique que le niveau est terminé
		this._termine = true;

		//Indique le niveau est gagné
		this._gagne = false;

		//Indique le numéro du niveau en cours
		this._niveau = 0;

		//Indique le score du joueur
		this._score = 0;

		//Dimensions du plateau de jeu
		this._largeurPlateau = 0;
		this._hauteurPlateau = 0;

		//Timer plaçant régulièrement des bonus sur le plateau
		this._timerBonus = null;
		this._nbPDV = 5;
		this._moveTrash = false;
		this._bless = false;
		this._bossPDV = 50;
        this._bossMaxPDV = 50;

        this.musicIntro.volume = 1;
        this.musicIntro.currentTime = 0;
        this.musicIntro.play();
		this.letIntro();
		
	}

    letIntro() {
        var that = this;
        this.timerIntro = setInterval(function () {
            setTimeout(function () { that.musicIntro.volume = 0.4; }, 1000);
            setTimeout(function () { that.musicIntro.volume = 0.3; }, 2000);
            setTimeout(function () { that.musicIntro.volume = 0.2; }, 3000);
            setTimeout(function () { that.musicIntro.volume = 0.1; }, 4000);
            setTimeout(function () { that.musicIntro.volume = 0; }, 4500);
            //setTimeout(function () { that.musicIntro.currentTime = 0; }, 4600);
            setTimeout(function () { that.musicIntro.volume = 0.1; }, 5000);
            setTimeout(function () { that.musicIntro.volume = 0.2; }, 5800);
            setTimeout(function () { that.musicIntro.volume = 0.3; }, 6500);
            setTimeout(function () { that.musicIntro.volume = 0.4; }, 7200);
            setTimeout(function () { that.musicIntro.volume = 0.5; }, 8000);

        }, 27000);
        setTimeout(function () { that.musicIntro.volume = 0.1; }, 200);
        setTimeout(function () { that.musicIntro.volume = 0.2; }, 500);
        setTimeout(function () { that.musicIntro.volume = 0.3; }, 800);
        setTimeout(function () { that.musicIntro.volume = 0.4; }, 1000);
        setTimeout(function () { that.musicIntro.volume = 0.5; }, 1200);
    }
    removePDV() {
        if (!this._bless) {
            this._bless = true;
            if (this._shield == 0) {
                this._nbPDV--;
                this._weapon--;
                if (this._weapon < 0)
                    this._weapon = 0;
            }
            else
                this._shield--;
            if (this._shield == 0)
                this._joueur.setHasShield(false);
        }
        setTimeout(function () { controleur.bless(); }, 3000);
    }
    removePDVFort() {
        if (!this._bless) {
            this._bless = true;
            if (this._shield == 0) {
                this._nbPDV--;
                this._weapon--;
                if (this._weapon < 0)
                    this._weapon = 0;
            }
            else if (this._shield == 1) {
                this._shield--;
                this._nbPDV--;
                this._weapon--;
                if (this._weapon < 0)
                    this._weapon = 0;
                if (this._shield == 0)
                    this._joueur.setHasShield(false);
            } else {
                this._shield = 0;
                this._joueur.setHasShield(false);
            }
        }
        setTimeout(function () { controleur.bless(); }, 3000);
    }
    
    bless() {
        this._bless = false;
    }

    animePlayer() {
        if (this._joueur != null)
            this._joueur.anime();
    }

    animeWeaponLevel() {
        for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
            var element = this._elementsGraphiques.get(iElement);
            if (element instanceof (weaponLevel)) {
                this._elementsGraphiques.remove(iElement);
            }
        }
        if (this.weaponLevel instanceof weaponLevel) {
            this.weaponLevel.setTexture(this._weapon);
            this._elementsGraphiques.add(this.weaponLevel);
        }
    }

    scream() {
        var that = this;
        that.musicTrash.pause();
        that.musicBoss.pause();
        document.querySelector('#ScreamerSound1').volume = 0.3;
        document.querySelector('#ScreamerSound1').play();
        setTimeout(function () {
            $('#screamerIMG').show();
            $('#Screamer1').show();
            $('#head').hide();
            $('#infos').hide();
        }, 3000);
        setTimeout(function () {
            $('#screamerIMG').hide();
            $('#Screamer1').hide();
            $('#head').show();
            $('#infos').show();
        }, 3120);

        
        setTimeout(function () {
            document.querySelector('#ScreamerSound2').volume = 0.6;
            document.querySelector('#ScreamerSound2').play();
            $('#screamerIMG').show();
            $('#Screamer2').show();
            $('#head').hide();
            $('#infos').hide();
        }, 13000);
        setTimeout(function () {
            $('#screamerIMG').hide();
            $('#Screamer2').hide();
            $('#head').show();
            $('#infos').show();
        }, 13180);

        setTimeout(function () {
            $('#screamer').show();
            $('#ScreamerVid').show();
            $('#head').hide();
            $('#infos').hide();
            var video = document.querySelector('#ScreamerVid');
            video.play();
        }, 22000);
        setTimeout(function () {
            $('#screamer').hide();
            $('#ScreamerVid').hide();
            $('#head').show();
            $('#infos').show();
            if((that._niveau+1) %10 != 0)
                that.musicTrash.play();
            else
                that.musicBoss.play();
        }, 24500);

    }

	/**
	 * Retourne le niveau auquel se trouve le joueur
	 */
	getNiveau()
	{
		return this._niveau;
	}

	/**
	 * Retourne le score du joueur
	 */
	getScore()
	{
		return this._score;
	}

	/**
	 * Retourne le nombre de munitions du joueur
	 */
	getNombreMunitions()
	{
		return this._joueur.getMunitions();
	}

	/**
	 * Retourne le nombre de points de vie du joueur
	 */
	getPointsDeVie()
	{
		return this._joueur.getPointsDeVie();
	}

	/**
	 * Définit les dimensions du plateau de jeu
	 */
	setDimensionsPlateau(largeur, hauteur)
	{
		this._largeurPlateau = largeur;
		this._hauteurPlateau = hauteur;
	}

	/**
	 * Indique si la partie est terminée
	 */
	estTermine()
	{
	    
		return this._termine;
	}

	/**
	 * Indique si la joueur a gangé la manche
	 */
	estGagne()
	{
		return this._gagne;
	}

	/**
	 * Démarre une nouvelle partie
	 */
	nouveau()
	{
		this._termine = false;
		this._gagne = false;
		controleur.tirBossEnd();
		controleur.tirTrashEnd();
		this._score = 0;
		if (localStorage.getItem("high-score") == null)
		    localStorage.setItem("high-score", "0");
		this._niveau = 0;
		this._nbPDV = 5;
		this.musicBoss.currentTime = 0;
		this.musicTrash.currentTime = 0;
		var that = this;
		setTimeout(function () { that.musicIntro.volume = 0.4; }, 1000);
		setTimeout(function () { that.musicIntro.volume = 0.3; }, 2000);
		setTimeout(function () { that.musicIntro.volume = 0.2; }, 3000);
		setTimeout(function () { that.musicIntro.volume = 0.1; }, 4000);
		setTimeout(function () { that.musicIntro.volume = 0; }, 4500);
		setTimeout(function () { that.musicIntro.pause(); }, 5000);
		clearInterval(this.timerIntro);
		this.demarrerNiveau();
	}
	getShield() {
	    return this._shield;
	}
	/**
	 * Passe au niveau suivant
	 */
	niveauSuivant()
	{
	    
		this._termine = false;
		this._gagne = false;
		this._niveau++;
		this._score++;
		if (localStorage.getItem("high-score") == null)
		    localStorage.setItem("high-score", "0");
		if (parseInt(localStorage.getItem("high-score"), 10) < this._score) {
		    localStorage.removeItem("high-score");
		    localStorage.setItem("high-score", this._score.toString());
		}
		if ((this._niveau + 1) % 10 === 0)
		    this._nbPDV++;

		this.demarrerNiveau();
	}

	/**
	 * Démarre le niveau
	 */
	demarrerNiveau()
	{
	    setTimeout(function(){controleur.tirEnd();},10);
		//Suppression des précédents éléments graphiques
	    this._elementsGraphiques.clear();
		this._joueur = this._fabriqueElement.create('humain');
		this.weaponLevel = this._fabriqueElement.create('weaponLevel');
		this.weaponLevel.setXY((this._largeurPlateau / 20) * 19, (this._hauteurPlateau / 20) * 10);
		this._elementsGraphiques.add(this.weaponLevel);
		this._joueur.setXY(this._largeurPlateau / 2, this._hauteurPlateau / 2);
		var that = this;
		if (this._shield > 0)
		    this._joueur.setHasShield(true);
		this._joueur.immuniser();
		//Création du joueur
		

		//Création des pampmousses mutants initiaux en fonction du niveau
		if ((this._niveau + 1)%15 === 0) {
		    var that = this;
		    this._joueur.setVitesse(0);
		    this._joueur.setIsInCT(true);
		    var inter = setInterval(function () { that._joueur.setVitesse(0); }, 20);
		    setTimeout(function () { that._joueur.setVitesse(8); }, 14000);
		    setTimeout(function () { that._joueur.setIsInCT(false); }, 14000);
		    setTimeout(function () { clearInterval(inter); }, 13500);
		    this._bossMaxPDV = 1300;
		    this._bossPDV = this._bossMaxPDV;
		    this.ajouterUltime(this._bossMaxPDV);
		    setTimeout(function () { that.musicTrash.volume = 0.04; }, 1000);
		    setTimeout(function () { that.musicTrash.volume = 0.03; }, 2000);
		    setTimeout(function () { that.musicTrash.volume = 0.02; }, 3000);
		    setTimeout(function () { that.musicTrash.volume = 0.01; }, 4000);
		    setTimeout(function () { that.musicTrash.volume = 0; }, 4500);
		    setTimeout(function () { that.musicTrash.pause(); }, 5000);
		    setTimeout(function () { that.musicBoss.volume = 0.04; }, 1000);
		    setTimeout(function () { that.musicBoss.volume = 0.03; }, 2000);
		    setTimeout(function () { that.musicBoss.volume = 0.02; }, 3000);
		    setTimeout(function () { that.musicBoss.volume = 0.01; }, 4000);
		    setTimeout(function () { that.musicBoss.volume = 0; }, 4500);
		    setTimeout(function () { that.musicBoss.pause(); }, 5000);
		    clearInterval(this.timerTrash);
		    that.musicFinalBoss.volume = 0;
		    this.musicFinalBoss.play();
		    this.timerBoss = setInterval(function () {
		        setTimeout(function () { that.musicFinalBoss.volume = 0.04; }, 1000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.03; }, 2000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.02; }, 3000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.01; }, 4000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0; }, 4500);
		        setTimeout(function () { that.musicFinalBoss.currentTime = 0; }, 4500);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.01; }, 5000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.02; }, 5800);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.03; }, 6500);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.04; }, 7200);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.05; }, 8000);

		    }, 300000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.01; }, 1000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.02; }, 2000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.03; }, 3000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.04; }, 4000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.05; }, 5000);
		    setTimeout(function () { that.musicTrash.currentTime = 0; }, 6000);
		    setTimeout(function () { controleur.tirBegin(); }, 14000);
		    

		    this._bless = true;
		    setTimeout(function () { controleur.bless(); }, 3000);
		    this._joueur.setPDV(this._nbPDV);
		    this._elementsGraphiques.add(this._joueur);
		    
		}

		else if ((this._niveau+2) % 3 === 0) {
		    var that = this;
		    this._joueur.setVitesse(0);
		    this._joueur.setIsInCT(true);
		    var inter = setInterval(function () { that._joueur.setVitesse(0); }, 20);
		    setTimeout(function () { that._joueur.setVitesse(8); }, 14000);
		    setTimeout(function () { that._joueur.setIsInCT(false); }, 14000);
		    setTimeout(function () { clearInterval(inter); }, 13500);
		    
		    if ((this._niveau + 1) % 15 === 2) {
		        this._bossMaxPDV = 50;
		        this._bossPDV = this._bossMaxPDV;
		        this.ajouterBoss();
		    } else if ((this._niveau + 1) % 15 === 5) {
		        this._bossMaxPDV = 100;
		        this._bossPDV = this._bossMaxPDV;
		        this.ajouterAnanas(this._bossMaxPDV);
		    } else if ((this._niveau + 1) % 15 === 8) {
		        this._bossMaxPDV = 150;
		        this._bossPDV = this._bossMaxPDV;
		        this.ajouterAbricot(this._bossMaxPDV);
		    } else if ((this._niveau + 1) % 15 === 11) {
		        this._bossMaxPDV = 250;
		        this._bossPDV = this._bossMaxPDV;
		        this.ajouterSangrine(this._bossMaxPDV);
		    } else if ((this._niveau + 1) % 15 === 14) {
		        this._bossMaxPDV = 500;
		        this._bossPDV = this._bossMaxPDV;
		        this.ajouterMangue(this._bossMaxPDV);
		    }


		    setTimeout(function () { that.musicTrash.volume = 0.04; }, 1000);
		    setTimeout(function () { that.musicTrash.volume = 0.03; }, 2000);
		    setTimeout(function () { that.musicTrash.volume = 0.02; }, 3000);
		    setTimeout(function () { that.musicTrash.volume = 0.01; }, 4000);
		    setTimeout(function () { that.musicTrash.volume = 0; }, 4500);
		    setTimeout(function () { that.musicTrash.pause(); }, 5000);
		    clearInterval(this.timerTrash);
		    that.musicBoss.volume = 0;
		    this.musicBoss.play();
		    this.timerBoss = setInterval(function () {
		        setTimeout(function () { that.musicBoss.volume = 0.04; }, 1000);
		        setTimeout(function () { that.musicBoss.volume = 0.03; }, 2000);
		        setTimeout(function () { that.musicBoss.volume = 0.02; }, 3000);
		        setTimeout(function () { that.musicBoss.volume = 0.01; }, 4000);
		        setTimeout(function () { that.musicBoss.volume = 0; }, 4500);
		        setTimeout(function () { that.musicBoss.currentTime = 0; }, 4500);
		        setTimeout(function () { that.musicBoss.volume = 0.01; }, 5000);
		        setTimeout(function () { that.musicBoss.volume = 0.02; }, 5800);
		        setTimeout(function () { that.musicBoss.volume = 0.03; }, 6500);
		        setTimeout(function () { that.musicBoss.volume = 0.04; }, 7200);
		        setTimeout(function () { that.musicBoss.volume = 0.05; }, 8000);

		    }, 150000);
		    setTimeout(function () { that.musicBoss.volume = 0.01; }, 1000);
		    setTimeout(function () { that.musicBoss.volume = 0.02; }, 2000);
		    setTimeout(function () { that.musicBoss.volume = 0.03; }, 3000);
		    setTimeout(function () { that.musicBoss.volume = 0.04; }, 4000);
		    setTimeout(function () { that.musicBoss.volume = 0.05; }, 5000);
		    setTimeout(function () { that.musicTrash.currentTime = 0; }, 6000);
		    setTimeout(function () { controleur.tirBegin(); }, 14000);
		    

		    this._bless = true;
		    setTimeout(function () { controleur.bless(); }, 3000);
		    this._joueur.setPDV(this._nbPDV);
		    this._elementsGraphiques.add(this._joueur);
		    
		} else {
		    

		    this._bless = true;
		    setTimeout(function () { controleur.bless(); }, 3000);
		    this._joueur.setPDV(this._nbPDV);
		    this._elementsGraphiques.add(this._joueur);
		    var nombrePampmousses = 0;
		    var nbCassis = 0;
		    var nbCerise = 0;
		    var nbCitron = 0;
		    var nbFramboise = 0;
		    var nbMure = 0;
		    var nbPeche = 0;
		    var multiplicateur = Math.floor(this._niveau/15)+1;
		    if ((this._niveau + 1) % 15 === 1) {
		        nombrePampmousses = 3 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 4) {
		        nombrePampmousses = 6 * multiplicateur;
		        nbCerise = 3 * multiplicateur;
		        nbPeche = 2 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 7) {
		        nombrePampmousses = 16 * multiplicateur;
		        nbFramboise = 5 * multiplicateur;
		        nbMure = 5 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 10) {
		        nombrePampmousses = 12 * multiplicateur;
		        nbCassis = 8 * multiplicateur;
		        nbFramboise = 6 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 13) {
		        nombrePampmousses = 13 * multiplicateur;
		        nbCassis = 9 * multiplicateur;
		        nbCerise = 8 * multiplicateur;
		        nbFramboise = 7 * multiplicateur;
		        nbMure = 6 * multiplicateur;
		        nbPeche = 5 * multiplicateur;
		        nbCitron = 4 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 3) {
		        nombrePampmousses = 7 * multiplicateur;
		        nbCassis = 2 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 6) {
		        nombrePampmousses = 18 * multiplicateur;
		        nbCassis = 5 * multiplicateur;
		        nbCitron = 2 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 9) {
		        nombrePampmousses = 20 * multiplicateur;
		        nbCerise = 7 * multiplicateur;
		        nbCitron = 4 * multiplicateur;
		        nbMure = 3 * multiplicateur;
		    } else if ((this._niveau + 1) % 15 === 12) {
		        nombrePampmousses = 25 * multiplicateur;
		        nbPeche = 6 * multiplicateur;
		        nbMure = 8 * multiplicateur;
		        nbCitron = 2 * multiplicateur;
		    }

		    if ((this._niveau + 1) %3 ==0 || this._niveau == 0) {

		        var that = this;
		        setTimeout(function () { controleur.tirBossEnd(); }, 0);
		        setTimeout(function () { that.musicBoss.volume = 0.04; }, 1000);
		        setTimeout(function () { that.musicBoss.volume = 0.03; }, 2000);
		        setTimeout(function () { that.musicBoss.volume = 0.02; }, 3000);
		        setTimeout(function () { that.musicBoss.volume = 0.01; }, 4000);
		        setTimeout(function () { that.musicBoss.volume = 0; }, 4500);
		        setTimeout(function () { that.musicBoss.pause(); }, 5000);
		        clearInterval(this.timerBoss);
		        that.musicTrash.volume = 0;
		        this.musicTrash.play();
		        this.timerTrash = setInterval(function () {
		            setTimeout(function () { that.musicTrash.volume = 0.04; }, 1000);
		            setTimeout(function () { that.musicTrash.volume = 0.03; }, 2000);
		            setTimeout(function () { that.musicTrash.volume = 0.02; }, 3000);
		            setTimeout(function () { that.musicTrash.volume = 0.01; }, 4000);
		            setTimeout(function () { that.musicTrash.volume = 0; }, 4500);
		            setTimeout(function () { that.musicTrash.currentTime = 0; }, 4500);
		            setTimeout(function () { that.musicTrash.volume = 0.01; }, 5000);
		            setTimeout(function () { that.musicTrash.volume = 0.02; }, 5800);
		            setTimeout(function () { that.musicTrash.volume = 0.03; }, 6500);
		            setTimeout(function () { that.musicTrash.volume = 0.04; }, 7200);
		            setTimeout(function () { that.musicTrash.volume = 0.05; }, 8000);

		        }, 240000);
		        setTimeout(function () { that.musicTrash.volume = 0.01; }, 1000);
		        setTimeout(function () { that.musicTrash.volume = 0.02; }, 2000);
		        setTimeout(function () { that.musicTrash.volume = 0.03; }, 3000);
		        setTimeout(function () { that.musicTrash.volume = 0.04; }, 4000);
		        setTimeout(function () { that.musicTrash.volume = 0.05; }, 5000);
		        setTimeout(function () { that.musicBoss.currentTime = 0; }, 5200);
		    }
		    for (var iPampmousse = 0; iPampmousse < nombrePampmousses; ++iPampmousse) {
		        this.ajouterPampmousseMutant();
		    }
		    for (var iPampmousse = 0; iPampmousse < nbCassis; ++iPampmousse) {
		        this.ajouterCassis();
		    }
		    for (var iPampmousse = 0; iPampmousse < nbCerise; ++iPampmousse) {
		        this.ajouterCerises();
		    }
		    for (var iPampmousse = 0; iPampmousse < nbCitron; ++iPampmousse) {
		        this.ajouterCitron();
		    }
		    for (var iPampmousse = 0; iPampmousse < nbMure; ++iPampmousse) {
		        this.ajouterMure();
		    }
		    for (var iPampmousse = 0; iPampmousse < nbFramboise; ++iPampmousse) {
		        this.ajouterFramboise();
		    }
		    for (var iPampmousse = 0; iPampmousse < nbPeche; ++iPampmousse) {
		        this.ajouterPeche();
		    }
		    setTimeout(function () { controleur.tirBegin(); }, 2000);

		}
		this._joueur.donnerMunition();
		this.demarrerDistributionBonus();
	}

	/**
	 * Ajoute un élément graphique sur le plateau de jeu
	 */
	ajouterElement(element)
	{
		element.setXY(Math.floor(Math.random() * this._largeurPlateau), Math.floor(Math.random() * this._hauteurPlateau));

		this._elementsGraphiques.add(element);
	}
	Shield() {
	    this._shield = 2;
	    this._joueur.setHasShield(true);
	}
	Weapon() {
	    this._weapon = 5;
	}
	Cheat() {
	    this._nbPDV++;
	    this._nbPDV++;
	    this._nbPDV++;
	    this._joueur.setPDV(this._nbPDV);
	    this._joueur.donnerMunition();
	    this._joueur.donnerMunition();
	    this._joueur.donnerMunition();
	}
	/**
	 * Ajoute un pampmousse mutant sur le plateau de jeu
	 */
	ajouterPampmousseMutant() {
	    this.ajouterElement(this._fabriqueElement.create('pampmousse mutant'));
	}
	ajouterPeche() {
	    this.ajouterElement(this._fabriqueElement.create('peche'));
	}
	ajouterCitron() {
	    this.ajouterElement(this._fabriqueElement.create('citron'));
	}
	ajouterCassis() {
	    this.ajouterElement(this._fabriqueElement.create('cassis'));
	}
	ajouterCerises() {
	    this.ajouterElement(this._fabriqueElement.create('cerise'));
	}
	ajouterFramboise() {
	    this.ajouterElement(this._fabriqueElement.create('framboise'));
	}
	ajouterMure() {
	    this.ajouterElement(this._fabriqueElement.create('mure'));
	}

	ajouterAbricot(value) {
	    this.ajouterElement(this._fabriqueElement.create('Abricot'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Abricot)) {
	            element.setPDV(value);
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(11); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 14000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);
	}

	ajouterMangue(value) {
	    this.ajouterElement(this._fabriqueElement.create('mangue'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Mangue)) {
	            element.setPDV(value);
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(11); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 14000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);
	}

	ajouterFraise(value) {
	    this.ajouterElement(this._fabriqueElement.create('fraise'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Fraise)) {
	            element.setPDV(value);
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(11); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 14000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);
	}
	ajouterOrange(value) {
	    this.ajouterElement(this._fabriqueElement.create('orange'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Orange)) {
	            element.setPDV(value);
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(11); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 14000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);
	}

	ajouterSangrine(value) {
	    this.ajouterElement(this._fabriqueElement.create('sangrine'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Sangrine)) {
	            element.setPDV(value);
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(11); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 14000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);
	}
	ajouterUltime(value) {
	    this.ajouterElement(this._fabriqueElement.create('ultime'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (FramboiseUltime)) {
	            element.setPDV(value);
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(37); }, 8500);
	            setTimeout(function () { element.setVitesse(2); }, 14000);
	            setTimeout(function () { element.setDirection(90*0.0174533); }, 13000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);
	}

	ajouterAnanas(value) {
	    this.ajouterElement(this._fabriqueElement.create('ananas'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Ananas)) {
	            element.setPDV(value);
	            element.setXY(0, Math.floor(6*this._hauteurPlateau / 10));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(11); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 14000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);
	}

	ajouterBoss() {
	    this.ajouterElement(this._fabriqueElement.create('Boss'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Boss)) {
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.activerTexture(42); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 14000);
	            setTimeout(function () { element.activerTexture(0); }, 14000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 14000);

	}

	/**
	 * Ajoute une munition sur le plateau de jeu
	 */
	ajouterMunition()
	{
		this.ajouterElement(this._fabriqueElement.create('munition'));
	}

	/**
	 * Démarre la distribution aléatoire des munitions sur la plateau
	 */
	demarrerDistributionBonus()
	{
		var that = this;
		this._timerBonus = setTimeout(function ()
		{
			that.distribuerBonus();
		}, Math.floor(Math.random() * 2000) + 3000);
		
	}

	/**
	 * Ajoute une munition sur le plateau et prépare la prochaine distribution
	 */
	distribuerBonus()
	{
	    this.ajouterMunition();
	    var alea = Math.floor(Math.random() * 32);
	    if (alea == 1 || alea == 5) {
	        this.ajouterElement(this._fabriqueElement.create('BoostSpeed'));
	    } else if (alea == 2 || alea == 6 || alea == 7 ) {
	        this.ajouterElement(this._fabriqueElement.create('BoostWeapon'));
	    } else if (alea == 3) {
	        this.ajouterElement(this._fabriqueElement.create('BoostLife'));
	    } else if (alea == 4 || alea == 8 ) {
	        this.ajouterElement(this._fabriqueElement.create('BoostShield'));
	    }
		this.demarrerDistributionBonus();
	}

	/**
	 * Oriente le joueur vers les coordonnées données
	 * @param coordonnees Coordonnées vers lequel on souhaite que le joueur se dirige
	 */
	orienterJoueurVers(coordonnees)
	{
		this._joueur.orienterVers(coordonnees);
	}

	/**
	 * Génère un tire du joueur
	 */
	tirer() {
	    //Si le joueur possède des munitions
	    if (!this.cineBoss) {
	        if (this._joueur.possedeMunitions()) {
	            //On retire une munition au joueur
	            if (!this.tir1) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir1 = true;
	                setTimeout(function () { that.tir1 = false; }, 1200);
	            } else if (!this.tir2) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir2");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir2 = true;
	                setTimeout(function () { that.tir2 = false; }, 1200);
	            } else if (!this.tir3) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir3");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir3 = true;
	                setTimeout(function () { that.tir3 = false; }, 1200);
	            } else if (!this.tir4) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir4");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir4 = true;
	                setTimeout(function () { that.tir4 = false; }, 1200);
	            } else if (!this.tir5) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir5");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir5 = true;
	                setTimeout(function () { that.tir5 = false; }, 1200);
	            } else if (!this.tir6) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir6");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir6 = true;
	                setTimeout(function () { that.tir6 = false; }, 1200);
	            } else if (!this.tir7) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir7");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir7 = true;
	                setTimeout(function () { that.tir7 = false; }, 1200);
	            } else if (!this.tir8) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir8");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir8 = true;
	                setTimeout(function () { that.tir8 = false; }, 1200);
	            } else if (!this.tir9) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir9");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir9 = true;
	                setTimeout(function () { that.tir9 = false; }, 1200);
	            } else if (!this.tir10) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir11");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir11 = true;
	                setTimeout(function () { that.tir11 = false; }, 1200);
	            } else if (!this.tir11) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir11");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir11 = true;
	                setTimeout(function () { that.tir11 = false; }, 1200);
	            } else if (!this.tir12) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir12");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir12 = true;
	                setTimeout(function () { that.tir12 = false; }, 1200);
	            } else if (!this.tir13) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir13");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir13 = true;
	                setTimeout(function () { that.tir13 = false; }, 1200);
	            } else if (!this.tir14) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir14");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir14 = true;
	                setTimeout(function () { that.tir14 = false; }, 1200);
	            } else if (!this.tir15) {
	                this._joueur.tirer();
	                var musicTir = document.querySelector("#audioPlayerTir15");
	                musicTir.volume = 0.05;
	                musicTir.play();
	                var that = this;
	                this.tir15 = true;
	                setTimeout(function () { that.tir15 = false; }, 1200);
	            }
	            //On place un presse-agrumes sur le plateau qui se déplace dans la même direction que le joueur
	            if (this._weapon == 0) {
	                var presseAgrumes = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                this._elementsGraphiques.add(presseAgrumes);
	            } else if (this._weapon == 1) {
	                var presseAgrumes = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                var presseAgrumes2 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes2.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes2.setDirection(this._joueur.getDirection() - (15 * 0.0174533));
	                presseAgrumes2.setRotation(this._joueur.getRotation() - (15 * 0.0174533));
	                var presseAgrumes3 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes3.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes3.setDirection(this._joueur.getDirection() + (15 * 0.0174533));
	                presseAgrumes3.setRotation(this._joueur.getRotation() + (15 * 0.0174533));
	                this._elementsGraphiques.add(presseAgrumes);
	                this._elementsGraphiques.add(presseAgrumes2);
	                this._elementsGraphiques.add(presseAgrumes3);
	            } else if (this._weapon == 2) {
	                var presseAgrumes = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                var presseAgrumes2 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes2.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes2.setDirection(this._joueur.getDirection() - (10 * 0.0174533));
	                presseAgrumes2.setRotation(this._joueur.getRotation() - (10 * 0.0174533));
	                var presseAgrumes3 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes3.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes3.setDirection(this._joueur.getDirection() + (10 * 0.0174533));
	                presseAgrumes3.setRotation(this._joueur.getRotation() + (10 * 0.0174533));
	                var presseAgrumes4 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes4.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes4.setDirection(this._joueur.getDirection() - (20 * 0.0174533));
	                presseAgrumes4.setRotation(this._joueur.getRotation() - (20 * 0.0174533));
	                var presseAgrumes5 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes5.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes5.setDirection(this._joueur.getDirection() + (20 * 0.0174533));
	                presseAgrumes5.setRotation(this._joueur.getRotation() + (20 * 0.0174533));
	                this._elementsGraphiques.add(presseAgrumes);
	                this._elementsGraphiques.add(presseAgrumes2);
	                this._elementsGraphiques.add(presseAgrumes3);
	                this._elementsGraphiques.add(presseAgrumes4);
	                this._elementsGraphiques.add(presseAgrumes5);
	            } else if (this._weapon == 3) {
	                var presseAgrumes = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                var presseAgrumes2 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes2.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes2.setDirection(this._joueur.getDirection() - (10 * 0.0174533));
	                presseAgrumes2.setRotation(this._joueur.getRotation() - (10 * 0.0174533));
	                var presseAgrumes3 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes3.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes3.setDirection(this._joueur.getDirection() + (10 * 0.0174533));
	                presseAgrumes3.setRotation(this._joueur.getRotation() + (10 * 0.0174533));
	                var presseAgrumes4 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes4.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes4.setDirection(this._joueur.getDirection() - (20 * 0.0174533));
	                presseAgrumes4.setRotation(this._joueur.getRotation() - (20 * 0.0174533));
	                var presseAgrumes5 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes5.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes5.setDirection(this._joueur.getDirection() + (20 * 0.0174533));
	                presseAgrumes5.setRotation(this._joueur.getRotation() + (20 * 0.0174533));
	                var presseAgrumes6 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes6.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes6.setDirection(this._joueur.getDirection() - (30 * 0.0174533));
	                presseAgrumes6.setRotation(this._joueur.getRotation() - (30 * 0.0174533));
	                var presseAgrumes7 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes7.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes7.setDirection(this._joueur.getDirection() + (30 * 0.0174533));
	                presseAgrumes7.setRotation(this._joueur.getRotation() + (30 * 0.0174533));
	                this._elementsGraphiques.add(presseAgrumes);
	                this._elementsGraphiques.add(presseAgrumes2);
	                this._elementsGraphiques.add(presseAgrumes3);
	                this._elementsGraphiques.add(presseAgrumes4);
	                this._elementsGraphiques.add(presseAgrumes5);
	                this._elementsGraphiques.add(presseAgrumes6);
	                this._elementsGraphiques.add(presseAgrumes7);
	            } else if (this._weapon == 4) {
	                var that = this;
	                var rad = this._joueur.getDirection();
	                for (var i = 0; i < 15; i++) {

	                    rad += 24 * i;
	                    rad = rad * 0.0174533;
	                    var bossMunition = this._fabriqueElement.create('presse agrumes');
	                    bossMunition.setCoordonnees(this._joueur.getCoordonnees());
	                    bossMunition.setDirection(rad);
	                    bossMunition.setRotation(rad);

	                    this._elementsGraphiques.add(bossMunition);
	                }
	            } else if (this._weapon == 5) {

	                var that = this;
	                var rad = this._joueur.getDirection();
	                for (var i = 0; i < 20; i++) {

	                    rad += 18 * i;
	                    rad = rad * 0.0174533;
	                    var bossMunition = this._fabriqueElement.create('presse agrumes');
	                    bossMunition.setCoordonnees(this._joueur.getCoordonnees());
	                    bossMunition.setDirection(rad);
	                    bossMunition.setRotation(rad);

	                    this._elementsGraphiques.add(bossMunition);
	                }
	                var presseAgrumes = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                var presseAgrumes2 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes2.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes2.setDirection(this._joueur.getDirection() - (2 * 0.0174533));
	                presseAgrumes2.setRotation(this._joueur.getRotation() - (2 * 0.0174533));
	                var presseAgrumes3 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes3.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes3.setDirection(this._joueur.getDirection() + (2 * 0.0174533));
	                presseAgrumes3.setRotation(this._joueur.getRotation() + (2 * 0.0174533));
	                var presseAgrumes4 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes4.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes4.setDirection(this._joueur.getDirection() - (3 * 0.0174533));
	                presseAgrumes4.setRotation(this._joueur.getRotation() - (3 * 0.0174533));
	                var presseAgrumes5 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes5.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes5.setDirection(this._joueur.getDirection() + (3 * 0.0174533));
	                presseAgrumes5.setRotation(this._joueur.getRotation() + (3 * 0.0174533));
	                var presseAgrumes6 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes6.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes6.setDirection(this._joueur.getDirection() - (4 * 0.0174533));
	                presseAgrumes6.setRotation(this._joueur.getRotation() - (4 * 0.0174533));
	                var presseAgrumes7 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes7.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes7.setDirection(this._joueur.getDirection() + (4 * 0.0174533));
	                presseAgrumes7.setRotation(this._joueur.getRotation() + (4 * 0.0174533));
	                var presseAgrumes8 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes8.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes8.setDirection(this._joueur.getDirection() + (5 * 0.0174533));
	                presseAgrumes8.setRotation(this._joueur.getRotation() + (5 * 0.0174533));
	                var presseAgrumes9 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes9.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes9.setDirection(this._joueur.getDirection() - (5 * 0.0174533));
	                presseAgrumes9.setRotation(this._joueur.getRotation() - (5 * 0.0174533));
	                var presseAgrumes10 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes10.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes10.setDirection(this._joueur.getDirection() + (6 * 0.0174533));
	                presseAgrumes10.setRotation(this._joueur.getRotation() + (6 * 0.0174533));
	                var presseAgrumes11 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes11.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes11.setDirection(this._joueur.getDirection() - (6 * 0.0174533));
	                presseAgrumes11.setRotation(this._joueur.getRotation() - (6 * 0.0174533));
	                var presseAgrumes12 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes12.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes12.setDirection(this._joueur.getDirection() + (7 * 0.0174533));
	                presseAgrumes12.setRotation(this._joueur.getRotation() + (7 * 0.0174533));
	                var presseAgrumes13 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes13.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes13.setDirection(this._joueur.getDirection() - (7 * 0.0174533));
	                presseAgrumes13.setRotation(this._joueur.getRotation() - (7 * 0.0174533));
	                var presseAgrumes14 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes14.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes14.setDirection(this._joueur.getDirection() + (8 * 0.0174533));
	                presseAgrumes14.setRotation(this._joueur.getRotation() + (8 * 0.0174533));
	                var presseAgrumes15 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes15.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes15.setDirection(this._joueur.getDirection() - (8 * 0.0174533));
	                presseAgrumes15.setRotation(this._joueur.getRotation() - (8 * 0.0174533));
	                var presseAgrumes16 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes16.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes16.setDirection(this._joueur.getDirection() + (9 * 0.0174533));
	                presseAgrumes16.setRotation(this._joueur.getRotation() + (9 * 0.0174533));
	                var presseAgrumes17 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes17.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes17.setDirection(this._joueur.getDirection() - (9 * 0.0174533));
	                presseAgrumes17.setRotation(this._joueur.getRotation() - (9 * 0.0174533));
	                var presseAgrumes18 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes18.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes18.setDirection(this._joueur.getDirection() + (10 * 0.0174533));
	                presseAgrumes18.setRotation(this._joueur.getRotation() + (10 * 0.0174533));
	                var presseAgrumes19 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes19.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes19.setDirection(this._joueur.getDirection() - (10 * 0.0174533));
	                presseAgrumes19.setRotation(this._joueur.getRotation() - (10 * 0.0174533));
	                var presseAgrumes20 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes20.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes20.setDirection(this._joueur.getDirection() + (11 * 0.0174533));
	                presseAgrumes20.setRotation(this._joueur.getRotation() + (11 * 0.0174533));
	                var presseAgrumes21 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes21.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes21.setDirection(this._joueur.getDirection() - (11 * 0.0174533));
	                presseAgrumes21.setRotation(this._joueur.getRotation() - (11 * 0.0174533));
	                var presseAgrumes22 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes22.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes22.setDirection(this._joueur.getDirection() + (12 * 0.0174533));
	                presseAgrumes22.setRotation(this._joueur.getRotation() + (12 * 0.0174533));
	                var presseAgrumes23 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes23.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes23.setDirection(this._joueur.getDirection() - (12 * 0.0174533));
	                presseAgrumes23.setRotation(this._joueur.getRotation() - (12 * 0.0174533));
	                var presseAgrumes24 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes24.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes24.setDirection(this._joueur.getDirection() + (13 * 0.0174533));
	                presseAgrumes24.setRotation(this._joueur.getRotation() + (13 * 0.0174533));
	                var presseAgrumes25 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes25.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes25.setDirection(this._joueur.getDirection() - (13 * 0.0174533));
	                presseAgrumes25.setRotation(this._joueur.getRotation() - (13 * 0.0174533));
	                var presseAgrumes26 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes26.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes26.setDirection(this._joueur.getDirection() + (14 * 0.0174533));
	                presseAgrumes26.setRotation(this._joueur.getRotation() + (14 * 0.0174533));
	                var presseAgrumes27 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes27.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes27.setDirection(this._joueur.getDirection() - (14 * 0.0174533));
	                presseAgrumes27.setRotation(this._joueur.getRotation() - (14 * 0.0174533));
	                var presseAgrumes28 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes28.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes28.setDirection(this._joueur.getDirection() + (15 * 0.0174533));
	                presseAgrumes28.setRotation(this._joueur.getRotation() + (15 * 0.0174533));
	                var presseAgrumes29 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes29.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes29.setDirection(this._joueur.getDirection() - (15 * 0.0174533));
	                presseAgrumes29.setRotation(this._joueur.getRotation() - (15 * 0.0174533));
	                var presseAgrumes30 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes30.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes30.setDirection(this._joueur.getDirection() + (1 * 0.0174533));
	                presseAgrumes30.setRotation(this._joueur.getRotation() + (1 * 0.0174533));
	                var presseAgrumes31 = this._fabriqueElement.create('presse agrumes');
	                presseAgrumes31.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes31.setDirection(this._joueur.getDirection() - (1 * 0.0174533));
	                presseAgrumes31.setRotation(this._joueur.getRotation() - (1 * 0.0174533));
	                
	                this._elementsGraphiques.add(presseAgrumes);
	                this._elementsGraphiques.add(presseAgrumes2);
	                this._elementsGraphiques.add(presseAgrumes3);
	                this._elementsGraphiques.add(presseAgrumes4);
	                this._elementsGraphiques.add(presseAgrumes5);
	                this._elementsGraphiques.add(presseAgrumes6);
	                this._elementsGraphiques.add(presseAgrumes7);
	                this._elementsGraphiques.add(presseAgrumes8);
	                this._elementsGraphiques.add(presseAgrumes9);
	                this._elementsGraphiques.add(presseAgrumes10);
	                this._elementsGraphiques.add(presseAgrumes11);
	                this._elementsGraphiques.add(presseAgrumes12);
	                this._elementsGraphiques.add(presseAgrumes13);
	                this._elementsGraphiques.add(presseAgrumes14);
	                this._elementsGraphiques.add(presseAgrumes15);
	                this._elementsGraphiques.add(presseAgrumes16);
	                this._elementsGraphiques.add(presseAgrumes17);
	                this._elementsGraphiques.add(presseAgrumes18);
	                this._elementsGraphiques.add(presseAgrumes19);
	                this._elementsGraphiques.add(presseAgrumes20);
	                this._elementsGraphiques.add(presseAgrumes21);
	                this._elementsGraphiques.add(presseAgrumes22);
	                this._elementsGraphiques.add(presseAgrumes23);
	                this._elementsGraphiques.add(presseAgrumes24);
	                this._elementsGraphiques.add(presseAgrumes25);
	                this._elementsGraphiques.add(presseAgrumes26);
	                this._elementsGraphiques.add(presseAgrumes27);
	                this._elementsGraphiques.add(presseAgrumes28);
	                this._elementsGraphiques.add(presseAgrumes29);
	                this._elementsGraphiques.add(presseAgrumes30);
	                this._elementsGraphiques.add(presseAgrumes31);
	            }

	        }
	    }
	}
	tirBossBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Boss) || element instanceof Orange) {
	            var that = this;
	            var nbCoups = 10 + Math.floor(this._niveau / 2) + 1;
	            var rad = 0;
	            for (var i = 0; i < nbCoups; i++) {

	                rad += Math.floor(360 / nbCoups) * i;
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BossMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);

	                this._elementsGraphiques.add(bossMunition);


	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}

	tirUltime1() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof FramboiseUltime) {
	            var that = this;
	            var nbCoups = 30;
	            var rad = 0;
	            for (var i = 0; i < nbCoups; i++) {

	                rad += Math.floor(360 / nbCoups) * i;
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BossMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);

	                this._elementsGraphiques.add(bossMunition);


	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}

	tirUltime2() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (FramboiseUltime)) {
	            var that = this;
	            var oeuf = this._fabriqueElement.create('oeuf');
	            oeuf.setCoordonnees(element.getCoordonnees());
	            this._elementsGraphiques.add(oeuf);
	            var that = this;
	            setTimeout(function () {
	                var alea = Math.random();
	                if (alea < 0.2) {
	                    var peche1 = that._fabriqueElement.create('sangrine');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    peche1.setPDV(20);
	                    that._elementsGraphiques.add(peche1);
	                } else if (alea > 0.2 && alea < 0.5) {
	                    var peche1 = that._fabriqueElement.create('mangue');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    peche1.setPDV(20);
	                    that._elementsGraphiques.add(peche1);
	                } else if (alea > 0.5 && alea < 0.8) {
	                    var peche1 = that._fabriqueElement.create('Abricot');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    peche1.setPDV(20);
	                    that._elementsGraphiques.add(peche1);
	                    var peche3 = that._fabriqueElement.create('fraise');
	                    peche3.setCoordonnees(oeuf.getCoordonnees());
	                    peche3.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    peche1.setPDV(20);
	                    that._elementsGraphiques.add(peche3);
	                } else {
	                    var peche1 = that._fabriqueElement.create('ananas');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    peche1.setPDV(20);
	                    that._elementsGraphiques.add(peche1);
	                }
	                setTimeout(function () {
	                    var peche2 = that._fabriqueElement.create('orange');
	                    peche2.setCoordonnees(oeuf.getCoordonnees());
	                    peche2.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    peche2.setPDV(20);
	                }, 3000);

	                that._elementsGraphiques.add(peche2);
	                oeuf.setDisappear(true);
	                for (var iElement = 0; iElement < that._elementsGraphiques.length() ; ++iElement) {
	                    var element = that._elementsGraphiques.get(iElement);
	                    if (element instanceof (Oeuf)) {
	                        if (element.getDisappear())
	                            that._elementsGraphiques.remove(iElement);
	                    }
	                }
	            }, 7000);


	        }

	    }

	}

	tirUltime3() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof FramboiseUltime) {
	            var that = this;
	            var nbCoups = 30;
	            var rad = 0;
	            for (var i = 0; i < nbCoups; i++) {

	                rad += Math.floor(360 / nbCoups) * i;
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BigMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);

	                this._elementsGraphiques.add(bossMunition);


	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}


	tirUltime4() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (FramboiseUltime)) {
	            var that = this;
	            var oeuf = this._fabriqueElement.create('oeuf');
	            oeuf.setCoordonnees(element.getCoordonnees());
	            this._elementsGraphiques.add(oeuf);
	            var that = this;
	            setTimeout(function () {
	                for (i = 0; i < 2;i++){
	                    var alea = Math.random();
	                    if (alea < 0.2) {
	                        var peche1 = that._fabriqueElement.create('peche');
	                        peche1.setCoordonnees(oeuf.getCoordonnees());
	                        peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                        that._elementsGraphiques.add(peche1);
	                    } else if (alea > 0.2 && alea < 0.5) {
	                        var peche1 = that._fabriqueElement.create('citron');
	                        peche1.setCoordonnees(oeuf.getCoordonnees());
	                        peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                        that._elementsGraphiques.add(peche1);
	                    } else if (alea > 0.5 && alea < 0.8) {
	                        var peche1 = that._fabriqueElement.create('framboise');
	                        peche1.setCoordonnees(oeuf.getCoordonnees());
	                        peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                        that._elementsGraphiques.add(peche1);
	                        var peche3 = that._fabriqueElement.create('mure');
	                        peche3.setCoordonnees(oeuf.getCoordonnees());
	                        peche3.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                        that._elementsGraphiques.add(peche3);
	                    } else {
	                        var peche1 = that._fabriqueElement.create('cassis');
	                        peche1.setCoordonnees(oeuf.getCoordonnees());
	                        peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                        that._elementsGraphiques.add(peche1);
	                    }

	                    var peche2 = that._fabriqueElement.create('fraise');
	                    peche2.setPDV(20);
	                    peche2.setCoordonnees(oeuf.getCoordonnees());
	                    peche2.setDirection((((Math.random() * 360) + 1) * 0.0174533));

	                    that._elementsGraphiques.add(peche2);
	                    oeuf.setDisappear(true);
	                    for (var iElement = 0; iElement < that._elementsGraphiques.length() ; ++iElement) {
	                        var element = that._elementsGraphiques.get(iElement);
	                        if (element instanceof (Oeuf)) {
	                            if (element.getDisappear())
	                                that._elementsGraphiques.remove(iElement);
	                        }
	                    }}
	            }, 7000);


	        }

	    }

	}

	tirTrashBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (PampmousseMutant) || element instanceof Citron || element instanceof Mure || element instanceof Peche || element instanceof miniCerise) {
	            if (!element.getDead()) {
	                var rad = Math.floor(Math.random() * 360 + 1);
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BossMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);


	                this._elementsGraphiques.add(bossMunition);

	                var musicTir = document.querySelector("#audioPlayerTirBoss");
	                musicTir.volume = 0.05;
	                musicTir.play();
	            }
	        }

	        if (element instanceof (Cassis) || element instanceof (Cerises)) {
	            if (!element.getDead()) {
	                var rad = Math.floor(Math.random() * 360 + 1);
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BossMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);
	                var bossMunition2 = this._fabriqueElement.create('BossMunition');
	                bossMunition2.setCoordonnees(element.getCoordonnees());
	                bossMunition2.setDirection(rad + (120 * 0.0174533));
	                var bossMunition3 = this._fabriqueElement.create('BossMunition');
	                bossMunition3.setCoordonnees(element.getCoordonnees());
	                bossMunition3.setDirection(rad + (240 * 0.0174533));


	                this._elementsGraphiques.add(bossMunition);
	                this._elementsGraphiques.add(bossMunition2);
	                this._elementsGraphiques.add(bossMunition3);

	                var musicTir = document.querySelector("#audioPlayerTirBoss");
	                musicTir.volume = 0.05;
	                musicTir.play();
	            }
	        }
	        if (element instanceof (Framboise) ) {
	            if (!element.getDead()) {
	                var rad = Math.floor(Math.random() * 360 + 1);
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BigMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);


	                this._elementsGraphiques.add(bossMunition);

	                var musicTir = document.querySelector("#audioPlayerTirBoss");
	                musicTir.volume = 0.05;
	                musicTir.play();
	            }
	        }

	    }

	}
	GrosTirBossBegin() {
	    //Si le joueur possède des munitions
	    if (!this.cineBoss) {
	        for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	            var element = this._elementsGraphiques.get(iElement);
	            if (element instanceof (Boss) || element instanceof Abricot || element instanceof Ananas || element instanceof Fraise || element instanceof Mangue || element instanceof Orange) {
	                var rad = 0;
	                for (var i = 0; i < 60; i++) {
	                    rad += 6 * i;
	                    rad = rad * 0.0174533;
	                    var bossMunition = this._fabriqueElement.create('BossMunition');
	                    bossMunition.setCoordonnees(element.getCoordonnees());
	                    bossMunition.setDirection(rad);


	                    this._elementsGraphiques.add(bossMunition);
	                }
	                var musicTir = document.querySelector("#audioPlayerBigTirBoss");
	                musicTir.volume = 0.05;
	                musicTir.play();
	            }
	        }
	    }

	}
	
	tirAbricotBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Abricot)) {
	            var that = this;
	            var nbCoups = 10 + Math.floor(this._niveau / 2) + 1;
	            var rad = 0;
	            for (var i = 0; i < nbCoups; i++) {

	                rad += Math.floor(360 / nbCoups) * i;
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BigMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);

	                this._elementsGraphiques.add(bossMunition);


	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}

	tirMangueBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Mangue)) {
	            var that = this;
	            if (Math.random() < 0.5) {
	                var nbCoups = 10 + Math.floor(this._niveau / 2) + 1;
	                var rad = 0;
	                for (var i = 0; i < nbCoups; i++) {

	                    rad += Math.floor(360 / nbCoups) * i;
	                    rad = rad * 0.0174533;
	                    var bossMunition = this._fabriqueElement.create('BigMunition');
	                    bossMunition.setCoordonnees(element.getCoordonnees());
	                    bossMunition.setDirection(rad);

	                    this._elementsGraphiques.add(bossMunition);


	                }
	            } else {
	                var nbCoups = 10 + Math.floor(this._niveau / 2) + 1;
	                var rad = 0;
	                for (var i = 0; i < nbCoups; i++) {

	                    rad += Math.floor(360 / nbCoups) * i;
	                    rad = rad * 0.0174533;
	                    var bossMunition = this._fabriqueElement.create('BossMunition');
	                    bossMunition.setCoordonnees(element.getCoordonnees());
	                    bossMunition.setDirection(rad);

	                    this._elementsGraphiques.add(bossMunition);


	                }
	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}
	tirFraiseBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Fraise)) {
	            var that = this;
	            var nbCoups = 20;
	            var rad = 0;
	            for (var i = 0; i < nbCoups; i++) {

	                rad += Math.floor(360 / nbCoups) * i;
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BigMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);

	                this._elementsGraphiques.add(bossMunition);


	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}
	tirSangrineBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Sangrine)) {
	            var that = this;
	            var nbCoups = 15;
	            var rad = 0;
	            for (var i = 0; i < nbCoups; i++) {

	                rad += Math.floor(360 / nbCoups) * i;
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BigMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);

	                this._elementsGraphiques.add(bossMunition);


	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}
	popAbricotBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Abricot)) {
	            var that = this;
	            var oeuf = this._fabriqueElement.create('oeuf');
	            oeuf.setCoordonnees(element.getCoordonnees());
	            this._elementsGraphiques.add(oeuf);
	            var that = this;
	            setTimeout(function () {
	                var peche1 = that._fabriqueElement.create('peche');
	                peche1.setCoordonnees(oeuf.getCoordonnees());
	                peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));

	                that._elementsGraphiques.add(peche1);
	                var peche2 = that._fabriqueElement.create('pampmousse mutant');
	                peche2.setCoordonnees(oeuf.getCoordonnees());
	                peche2.setDirection((((Math.random() * 360) + 1) * 0.0174533));

	                that._elementsGraphiques.add(peche2);
	                oeuf.setDisappear(true);
	                for (var iElement = 0; iElement < that._elementsGraphiques.length() ; ++iElement) {
	                    var element = that._elementsGraphiques.get(iElement);
	                    if (element instanceof (Oeuf)) {
	                        if (element.getDisappear())
	                            that._elementsGraphiques.remove(iElement);
	                    }
	                }
	            }, 7000);


	        }

	    }

	}

	tirAnanasBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Ananas)) {
	            var that = this;
	            var nbCoups = 15 + Math.floor(this._niveau / 2) + 1;
	            var rad = 0;
	            for (var i = 0; i < nbCoups; i++) {

	                rad += Math.floor(360 / nbCoups) * i;
	                rad = rad * 0.0174533;
	                var bossMunition = this._fabriqueElement.create('BigMunition');
	                bossMunition.setCoordonnees(element.getCoordonnees());
	                bossMunition.setDirection(rad);

	                this._elementsGraphiques.add(bossMunition);


	            }
	            var musicTir = document.querySelector("#audioPlayerTirBoss");
	            musicTir.volume = 0.05;
	            musicTir.play();
	        }

	    }

	}
	popAnanasBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Ananas)) {
	            var that = this;
	            var oeuf = this._fabriqueElement.create('oeuf');
	            oeuf.setCoordonnees(element.getCoordonnees());
	            this._elementsGraphiques.add(oeuf);
	            var that = this;
	            setTimeout(function () {
	                var peche1 = that._fabriqueElement.create('citron');
	                peche1.setCoordonnees(oeuf.getCoordonnees());
	                peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));

	                that._elementsGraphiques.add(peche1);
	                var peche2 = that._fabriqueElement.create('pampmousse mutant');
	                peche2.setCoordonnees(oeuf.getCoordonnees());
	                peche2.setDirection((((Math.random() * 360) + 1) * 0.0174533));

	                that._elementsGraphiques.add(peche2);
	                oeuf.setDisappear(true);
	                for (var iElement = 0; iElement < that._elementsGraphiques.length() ; ++iElement) {
	                    var element = that._elementsGraphiques.get(iElement);
	                    if (element instanceof (Oeuf)) {
	                        if (element.getDisappear())
	                            that._elementsGraphiques.remove(iElement);
	                    }
	                }
	            }, 7000);


	        }

	    }

	}
	popSangrineBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Sangrine)) {
	            var that = this;
	            var oeuf = this._fabriqueElement.create('oeuf');
	            oeuf.setCoordonnees(element.getCoordonnees());
	            this._elementsGraphiques.add(oeuf);
	            var that = this;
	            setTimeout(function () {
	                var alea = Math.random();
	                if (alea < 0.2) {
	                    var peche1 = that._fabriqueElement.create('peche');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                } else if (alea > 0.2 && alea < 0.5) {
	                    var peche1 = that._fabriqueElement.create('citron');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                } else if (alea > 0.5 && alea < 0.8) {
	                    var peche1 = that._fabriqueElement.create('framboise');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                    var peche3 = that._fabriqueElement.create('mure');
	                    peche3.setCoordonnees(oeuf.getCoordonnees());
	                    peche3.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche3);
	                } else {
	                    var peche1 = that._fabriqueElement.create('cassis');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                }

	                var peche2 = that._fabriqueElement.create('pampmousse mutant');
	                peche2.setCoordonnees(oeuf.getCoordonnees());
	                peche2.setDirection((((Math.random() * 360) + 1) * 0.0174533));

	                that._elementsGraphiques.add(peche2);
	                oeuf.setDisappear(true);
	                for (var iElement = 0; iElement < that._elementsGraphiques.length() ; ++iElement) {
	                    var element = that._elementsGraphiques.get(iElement);
	                    if (element instanceof (Oeuf)) {
	                        if (element.getDisappear())
	                            that._elementsGraphiques.remove(iElement);
	                    }
	                }
	            }, 7000);


	        }

	    }

	}
	popOrangeBegin() {
	    //Si le joueur possède des munitions
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Orange)) {
	            var that = this;
	            var oeuf = this._fabriqueElement.create('oeuf');
	            oeuf.setCoordonnees(element.getCoordonnees());
	            this._elementsGraphiques.add(oeuf);
	            var that = this;
	            setTimeout(function () {
	                var alea = Math.random();
	                if (alea < 0.2) {
	                    var peche1 = that._fabriqueElement.create('citron');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                } else if (alea > 0.2 && alea < 0.5) {
	                    var peche1 = that._fabriqueElement.create('cerise');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                } else if (alea > 0.5 && alea < 0.8) {
	                    var peche1 = that._fabriqueElement.create('mure');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                    var peche3 = that._fabriqueElement.create('mure');
	                    peche3.setCoordonnees(oeuf.getCoordonnees());
	                    peche3.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche3);
	                } else {
	                    var peche1 = that._fabriqueElement.create('framboise');
	                    peche1.setCoordonnees(oeuf.getCoordonnees());
	                    peche1.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                    that._elementsGraphiques.add(peche1);
	                }

	                var peche2 = that._fabriqueElement.create('pampmousse mutant');
	                peche2.setCoordonnees(oeuf.getCoordonnees());
	                peche2.setDirection((((Math.random() * 360) + 1) * 0.0174533));

	                that._elementsGraphiques.add(peche2);
	                oeuf.setDisappear(true);
	                for (var iElement = 0; iElement < that._elementsGraphiques.length() ; ++iElement) {
	                    var element = that._elementsGraphiques.get(iElement);
	                    if (element instanceof (Oeuf)) {
	                        if (element.getDisappear())
	                            that._elementsGraphiques.remove(iElement);
	                    }
	                }
	            }, 7000);


	        }

	    }

	}
	/**
	 * Termine la partie
	 */
	terminer()
	{
		this._termine = true;

		clearTimeout(this._timerBonus);

		this.notifier();
	}

	/**
	 * Anime les éléments du jeu
	 */
	animer()
	{
		this._elementsGraphiques.animer(this._largeurPlateau, this._hauteurPlateau);

		this.gererCollissions();

		if (this._elementsGraphiques.getNombrePampmoussesMutants() == 0)
		{
			this._gagne = true;
			this.terminer();
		}

		this.notifier();
	}
	animerHumain(dir)
	{
		if(dir==0){
			this._elementsGraphiques.animerHumainUp(this._largeurPlateau, this._hauteurPlateau);
			} else if(dir==1){
				this._elementsGraphiques.animerHumainLeft(this._largeurPlateau, this._hauteurPlateau);
			} else if (dir==2){
				this._elementsGraphiques.animerHumainDown(this._largeurPlateau, this._hauteurPlateau);
			} else if(dir==3){
				this._elementsGraphiques.animerHumainRight(this._largeurPlateau, this._hauteurPlateau);
			}
		this.gererCollissions();

		if (this._elementsGraphiques.getNombrePampmoussesMutants() == 0)
		{
			this._gagne = true;
			this.terminer();
		}

		this.notifier();
	}

	/**
	 * Gère les éventuelles collisions entre les éléments présents sur le plateau de jeu
	 */
	gererCollissions()
	{
		//Pour chaque éléments du plateau de jeu
	    try{for(var iElement = 0; iElement < this._elementsGraphiques.length(); ++iElement)
	        {
	        var element = this._elementsGraphiques.get(iElement);

	        if (element instanceof ElementMobile)
	        {
	            //Teste la collision des éléments avec les murs
	            if (this.testerCollisionsMurs(element))
	            {
	                //Si un pampmousse mutant touche un mur, il change de direction
	                if (element instanceof Framboise || element instanceof Mure || element instanceof PampmousseMutant || element instanceof Peche || element instanceof Cassis || element instanceof Cerises || element instanceof miniCerise)
	                {
	                    element.setDirection((((Math.random() * 360) + 1)*0.0174533));
	                }
	                else if (element instanceof PresseAgrumes || element instanceof BossMunition || element instanceof BigMunition) {
	                    //Si c'est un presse agrume, il est détruit
	                    this._elementsGraphiques.remove(iElement);
	                    --iElement;
	                } else if (element instanceof Boss || element instanceof Abricot) {
	                    //Si c'est un presse agrume, il est détruit
	                    element.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                }
	            }

	            //Teste les collision entre éléments
	            for (var iElement2 = 0; iElement2 < this._elementsGraphiques.length() ; ++iElement2)
	            {
	                var element2 = this._elementsGraphiques.get(iElement2);

	                if (!(element2 instanceof Fraise) && !(element2 instanceof FramboiseUltime) && !(element2 instanceof Sangrine) && !(element2 instanceof Orange) && !(element2 instanceof Mangue) && !(element2 instanceof Mure) && !(element2 instanceof Framboise) && !(element2 instanceof Cassis) && !(element2 instanceof Cerises) && !(element2 instanceof miniCerise) && !(element2 instanceof Citron) && !(element2 instanceof Ananas) && !(element2 instanceof PampmousseMutant) && !(element2 instanceof Munition) && !(element2 instanceof Boss) && !(element2 instanceof BossMunition) && !(element2 instanceof BigMunition) && !(element2 instanceof Abricot) && !(element2 instanceof BoostLife) && !(element2 instanceof BoostWeapon) && !(element2 instanceof BoostSpeed) && !(element2 instanceof BoostShield) && !(element2 instanceof Peche))
	                    continue;

	                //Si les deux éléments testés se touchent
	                if (element.touche(element2))
	                {
	                    //Si un humain touche...
	                    if (element instanceof Humain)
	                    {
	                        //... une munition
	                        if (element2 instanceof Munition)
	                        {
	                            //La munition est retirée du jeu
	                            this._elementsGraphiques.remove(iElement2);

	                            if (iElement2 < iElement)
	                                iElement--;

	                            --iElement2;

	                            //Le joueur reçoit une munition
	                            element.donnerMunition();
	                            element.donnerMunition();
	                        }
	                            //... un pampmousse mutant
	                        else if (element2 instanceof (Mure) || element2 instanceof (Cerises) || element2 instanceof (Framboise) || element2 instanceof (Fraise) || element2 instanceof (Fraise) || element2 instanceof (miniCerise) || element2 instanceof (PampmousseMutant) || element2 instanceof Cassis || element2 instanceof Boss || element2 instanceof Peche || element2 instanceof Ananas) {
	                            if (!(element2.getDead())) {
	                                if (this._shield == 0)
	                                    this._joueur.blesser();
	                                this.removePDV();
	                                if (this._joueur.getPointsDeVie() === 0) {
	                                    this.terminer();
	                                }
	                            }
	                        }
	                        else if (element2 instanceof BossMunition) {
	                            this._elementsGraphiques.remove(iElement2);
	                            if (this._shield == 0)
	                                this._joueur.blesser();
	                            this.removePDV();

	                            if (this._joueur.getPointsDeVie() === 0) {
	                                this.terminer();
	                            }
	                        }
	                        else if (element2 instanceof (FramboiseUltime) || element2 instanceof (Sangrine) || element2 instanceof (Mangue) || element2 instanceof (Orange) || element2 instanceof Abricot) {
	                            if (this._shield == 0)
	                                this._joueur.blesser();
	                            this.removePDV();

	                            if (this._joueur.getPointsDeVie() === 0) {
	                                this.terminer();
	                            }
	                        } else if (element2 instanceof BigMunition) {
	                            this._elementsGraphiques.remove(iElement2);
	                            if (this._shield == 0)
	                                this._joueur.blesserFort();
	                            this.removePDVFort();

	                            if (this._joueur.getPointsDeVie() === 0) {
	                                this.terminer();
	                            }
	                        }
	                        else if (element2 instanceof Citron) {
	                            this._elementsGraphiques.remove(iElement2);
	                            if (this._shield == 0)
	                                this._joueur.blesserFort();
	                            this.removePDVFort();
	                            element2.setPDV(0);
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.eraseTrash(); }, 12000);
	                            --iElement2;
	                                    
	                            if (this._joueur.getPointsDeVie() === 0) {
	                                this.terminer();
	                            }
	                        }
	                        else if (element2 instanceof BoostShield) {
	                            this._elementsGraphiques.remove(iElement2);
	                            this._shield = this._shield + 2;
	                            if (this._shield > 2)
	                                this._shield = 2;
                                this._joueur.setHasShield(true);
	                        }
	                        else if (element2 instanceof BoostSpeed) {
	                            this._elementsGraphiques.remove(iElement2);
	                            this._joueur.setVitesse(20);
	                            var that = this;
	                            setTimeout(function () { that._joueur.setVitesse(12); }, 6000);
	                        }
	                        else if (element2 instanceof BoostLife) {
	                            this._elementsGraphiques.remove(iElement2);
	                            this._nbPDV++;
	                            this._joueur.setPDV(this._nbPDV);
	                        }
	                        else if (element2 instanceof BoostWeapon) {
	                            this._elementsGraphiques.remove(iElement2);
	                            this._weapon++;
	                            if (this._weapon > 4)
	                                this._weapon = 4;
	                        }
							
	                    }
	                        // Si un presse-agrumes touche un pampmousse mutant
	                    else if (element instanceof PresseAgrumes && element2 instanceof PampmousseMutant )
	                    {
	                        if (!element2.getDead()) {
	                            this._elementsGraphiques.remove(iElement);
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.eraseTrash(); }, 12000);
	                            --iElement;
	                            --iElement2;
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && (element2 instanceof Mure || element2 instanceof Framboise || element2 instanceof Peche || element2 instanceof Cassis || element2 instanceof miniCerise)) {
	                        if (!element2.getDead()) {
	                            this._elementsGraphiques.remove(iElement);
	                            element2.setPDV(element2.getPDV() - 1);
	                            console.log(element2.getPDV());
	                            if (element2.getPDV() <= 0) {
	                                element2.beginDeath();
	                                var that = this;
	                                setTimeout(function () { that.eraseTrash(); }, 12000);
	                                --iElement2;
	                            }


	                            --iElement;
	                        }

	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Citron) {
	                        if (!element2.getDead()) {
	                            this._elementsGraphiques.remove(iElement);
	                            element2.setPDV(element2.getPDV() - 1);
	                            if (element2.getPDV() <= 0) {
	                                element2.setTaille(100);
	                                element2.beginDeath();
	                                var that = this;
	                                setTimeout(function () { that.eraseTrash(); }, 12000);
	                                --iElement2;
	                            }


	                            --iElement;
	                        }

	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Cerises) {
	                        if (!element2.getDead()) {
	                            this._elementsGraphiques.remove(iElement);
	                            element2.setPDV(element2.getPDV() - 1);
	                            if (element2.getPDV() <= 0) {
	                                for (i = 0; i < 6; i++) {
	                                    var cerise = this._fabriqueElement.create('minicerise');
	                                    cerise.setCoordonnees(element2.getCoordonnees());
	                                    cerise.activerTexture(i);
	                                    this._elementsGraphiques.add(cerise);
	                                }
	                                element2.beginDeath();
	                                var that = this;
	                                setTimeout(function () { that.eraseTrash(); }, 12000);
	                                --iElement2;
	                            }


	                            --iElement;
	                        }

	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Boss) {
	                        this._elementsGraphiques.remove(iElement);
	                        this._bossPDV--;
	                        if (this._bossPDV <= (this._bossMaxPDV / 1.3)) {
	                            element2.activerTexture(2);
	                        }
	                        if (this._bossPDV <= (this._bossMaxPDV / 2)) {
	                            element2.activerTexture(4);
	                        }
	                        if (this._bossPDV <= (this._bossMaxPDV / 4)) {
	                            element2.activerTexture(6);
	                        }
	                        element2.beginClignotement();
	                        if (this._bossPDV <= 0) {
	                            this._joueur.immuniser();
	                            var musicBoss = document.querySelector("#audioPlayerExploBoss");
	                            musicBoss.volume = 0.05;
	                            musicBoss.play();
	                            setTimeout(function () { musicBoss.play(); }, 200);
	                            element2.beginDeath();
	                            setTimeout(function () { controleur.winBoss(); }, 2000);
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof FramboiseUltime) {
	                        this._elementsGraphiques.remove(iElement);
	                        element2.setPDV(element2.getPDV() - 1);
	                        if (element2.getPDV() <= (this._bossMaxPDV / 1.3)) {
	                            element2.activerTexture(2);
	                        }
	                        if (element2.getPDV() <= (this._bossMaxPDV / 2)) {
	                            element2.activerTexture(4);
	                        }
	                        if (element2.getPDV() <= (this._bossMaxPDV / 4)) {
	                            element2.activerTexture(6);
	                        }
	                        element2.beginClignotement();
	                        if (element2.getPDV() <= 0) {
	                            this._joueur.immuniser();
	                            var that = this;
	                            var musicBoss = document.querySelector("#audioPlayerExploBoss");
	                            musicBoss.play();
	                            setTimeout(function () { musicBoss.play(); }, 200);
	                            element2.beginDeath();
	                            setTimeout(function () { that.winUltime(); }, 4000);
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Abricot) {
	                        this._elementsGraphiques.remove(iElement);
	                        element2.setPDV(element2.getPDV() - 1);
	                        element2.beginClignotement();
	                        if (element2.getPDV() <= 0) {
	                            this._joueur.immuniser();
	                            var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
	                            musicBoss.volume = 0.05;
	                            musicBoss.play();
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.winAbricot(); }, 1000);
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Ananas) {
	                        this._elementsGraphiques.remove(iElement);
	                        element2.setPDV(element2.getPDV() - 1);
	                        element2.beginClignotement();
	                        if (element2.getPDV() <= 0) {
	                            this._joueur.immuniser();
	                            var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
	                            musicBoss.volume = 0.05;
	                            musicBoss.play();
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.winAnanas(); }, 1000);
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Mangue) {
	                        this._elementsGraphiques.remove(iElement);
	                        element2.setPDV(element2.getPDV() - 1);
	                        element2.beginClignotement();
	                        if (element2.getPDV() <= 0) {
	                            this._joueur.immuniser();
	                            var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
	                            musicBoss.volume = 0.05;
	                            musicBoss.play();
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.winMangue(); }, 1000);
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Orange) {
	                        this._elementsGraphiques.remove(iElement);
	                        element2.setPDV(element2.getPDV() - 1);
	                        element2.beginClignotement();
	                        if (element2.getPDV() <= 0) {
	                            this._joueur.immuniser();
	                            var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
	                            musicBoss.volume = 0.05;
	                            musicBoss.play();
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.winOrange(); }, 1000);
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Fraise) {
	                        this._elementsGraphiques.remove(iElement);
	                        element2.setPDV(element2.getPDV() - 1);
	                        element2.beginClignotement();
	                        if (element2.getPDV() <= 0) {
	                            this._joueur.immuniser();
	                            var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
	                            musicBoss.volume = 0.05;
	                            musicBoss.play();
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.winFraise(); }, 1000);
	                        }
	                    }
	                    else if (element instanceof PresseAgrumes && element2 instanceof Sangrine) {
	                        this._elementsGraphiques.remove(iElement);
	                        element2.setPDV(element2.getPDV() - 1);
	                        element2.beginClignotement();
	                        if (element2.getPDV() <= 0) {
	                            element2.setTaille(300);
	                            var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
	                            musicBoss.volume = 0.05;
	                            musicBoss.play();
	                            element2.beginDeath();
	                            var that = this;
	                            setTimeout(function () { that.winSangrine(); }, 2000);
	                        }
	                    }
	                    
	                        //Si un pampmousse mutant touche une munition
	                    else if (element instanceof PampmousseMutant && element2 instanceof Munition) {
	                        if (!element.getDead()) {
	                            this.ajouterElement(this._fabriqueElement.create('pampmousse mutant'));
	                            this.ajouterElement(this._fabriqueElement.create('pampmousse mutant'));
	                            var rad = ((Math.random() * 360) + 1);
	                            element.setDirection(rad * 0.0174533);
	                            var element4 = this._elementsGraphiques.get(this._elementsGraphiques.length() - 2);
	                            element4.setXY(element.getX(), element.getY());
	                            element4.setDirection((rad + 120) * 0.0174533);
	                            var element3 = this._elementsGraphiques.get(this._elementsGraphiques.length() - 1);
	                            element3.setXY(element.getX(), element.getY());
	                            element3.setDirection((rad + 240) * 0.0174533);
	                            this._elementsGraphiques.remove(iElement2);
	                        }


	                    } else if (element instanceof FramboiseUltime && (element2 instanceof Munition || element2 instanceof BoostSpeed || element2 instanceof BoostWeapon|| element2 instanceof BoostLife || element2 instanceof BoostShield)) {
	                        
	                            this._elementsGraphiques.remove(iElement2);
	                        
	                    }
	                    else if (element instanceof Peche && element2 instanceof Munition) {
	                        if (!element.getDead()) {
	                            this._elementsGraphiques.remove(iElement2);
	                            element.setPDV(10);
	                            var nbCoups = 5;
	                            var rad = 0;
	                            for (var i = 0; i < nbCoups; i++) {

	                                rad += Math.floor(360 / nbCoups) * i;
	                                rad = rad * 0.0174533;
	                                var bossMunition = this._fabriqueElement.create('BossMunition');
	                                bossMunition.setCoordonnees(element.getCoordonnees());
	                                bossMunition.setDirection(rad);

	                                this._elementsGraphiques.add(bossMunition);


	                            }
	                            var musicTir = document.querySelector("#audioPlayerTirBoss");
	                            musicTir.volume = 0.05;
	                            musicTir.play();
	                        }


	                    } else if ((element instanceof Sangrine || element instanceof Mangue || element instanceof Orange || element instanceof Boss || element instanceof Fraise || element instanceof Abricot || element instanceof Ananas) && element2 instanceof Munition) {
	                        this._bossPDV += Math.floor(this._bossMaxPDV / 10);
	                        this._elementsGraphiques.remove(iElement2);
	                        this.GrosTirBossBegin();
	                        if (this._bossPDV > this._bossMaxPDV) {
	                            this._bossPDV = this._bossMaxPDV;
	                        }
	                        if (!element instanceof Boss) {
	                            element.setPDV(Math.floor(element.getPDV() + this._bossMaxPDV / 10));
	                        }
	                        if (element instanceof Boss) {
	                            if (this._bossPDV > (this._bossMaxPDV / 1.3)) {
	                                element.activerTexture(0);
	                            }
	                            if (this._bossPDV <= (this._bossMaxPDV / 1.3)) {
	                                element.activerTexture(2);
	                            }
	                            if (this._bossPDV <= (this._bossMaxPDV / 2)) {
	                                element.activerTexture(4);
	                            }
	                            if (this._bossPDV <= (this._bossMaxPDV / 4)) {
	                                element.activerTexture(6);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }
	    } catch (exception) {
	    }
	}
	eraseTrash() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof PampmousseMutant || element instanceof Mure || element instanceof Framboise || element instanceof Peche || element instanceof Citron || element instanceof Cassis) {
                if(element.getMustDisappear())
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winBoss() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Boss)) {
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winAbricot() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Abricot)) {
	            if (element.getPDV() <= 0)
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winAnanas() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Ananas)) {
	            if (element.getPDV() <= 0)
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winFraise() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Fraise)) {
	            if (element.getPDV() <= 0)
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winMangue() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Mangue)) {
	            if (element.getPDV() <= 0)
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winOrange() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Orange)) {
	            if (element.getPDV() <= 0)
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winSangrine() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Sangrine)) {
	            if (element.getPDV() <= 0)
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	winUltime() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (FramboiseUltime)) {
	            if (element.getPDV() <= 0)
	                this._elementsGraphiques.remove(iElement);
	        }
	    }
	}
	/**
	 * Teste la collision d'un élément graphique du jeu avec les bords du plateau
	 * @element Elément du jeu que l'on souhaite tester
	 */
	testerCollisionsMurs(element)
	{
		var valRet = false;

		var coordonnees = element.getCoordonnees();

		//Test de collision avec les bords
		if (coordonnees.getX() > this._largeurPlateau || coordonnees.getX() < 0 || coordonnees.getY() > this._hauteurPlateau || coordonnees.getY() < 0)
		{
			if (coordonnees.getX() > this._largeurPlateau)
				coordonnees.setX(this._largeurPlateau);
			else if (coordonnees.getX() < 0)
				coordonnees.setX(0);

			if (coordonnees.getY() > this._hauteurPlateau)
				coordonnees.setY(this._hauteurPlateau);
			else if (coordonnees.getY() < 0)
				coordonnees.setY(0);

			valRet = true;
		}

		return valRet;
	}

	/**
	 * Dessine le plateau de jeu
	 */
	dessiner(context)
	{
		this.dessinerSol(context);
		this._elementsGraphiques.dessiner(context);
	}

	/**
	 * Dessine l'arrière plan du jeu
	 */
	dessinerSol(context)
	{
		var pattern = context.createPattern(textureSol, 'repeat');
		context.fillStyle = pattern;
		context.beginPath();
		context.rect(0, 0, this._largeurPlateau, this._hauteurPlateau);
		context.fill();
	}

	updatePampmousse() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (PampmousseMutant)) {
                if(!element.getDead())
	                element.textureAleatoire();
	        }
	    }
	}
	updatePampmousseDir() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (PampmousseMutant) || element instanceof (miniCerise) || element instanceof Peche || element instanceof Mure || element instanceof Framboise || element instanceof Cassis) {
	            var X = this._joueur.getX() - element.getX();
	            var Y = this._joueur.getY() - element.getY();
	            if ((X > -250 && X < 250) && (Y > -250 && Y < 250)) {
	                var temp = new Point();
	                temp.copier(element.getCoordonnees());
	                temp.setX(temp.getX() + 10);
	                element.setDirection(getAngle3Points(element.getCoordonnees(), temp, this._joueur.getCoordonnees()) / 180 * Math.PI);

	            } else {
	                var rad = element.getDirection()-(45*0.0174533);
	                var alea = Math.floor(Math.random() * 90) * 0.0174533;
	                rad = rad + alea;
	                   element.setDirection(rad);
	                    
	            }
	        }
	    }
	}
	updateBossDir() {
        
	    if (!this.cineBoss) {
	        for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	            var element = this._elementsGraphiques.get(iElement);
	                if (element instanceof (Sangrine) || element instanceof (Orange) || element instanceof (Mangue) || element instanceof (Boss) || element instanceof (Fraise) || element instanceof Abricot || element instanceof Ananas || element instanceof Citron) {
	                    var temp = new Point();
	                    temp.copier(element.getCoordonnees());
	                    temp.setX(temp.getX() + 10);
	                    element.setDirection(getAngle3Points(element.getCoordonnees(), temp, this._joueur.getCoordonnees()) / 180 * Math.PI);
	                }
	        }
	    }
	}

	updateBossUltimeDir() {
        
	    if (!this.cineBoss) {
	        for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	            var element = this._elementsGraphiques.get(iElement);
	                if (element instanceof (FramboiseUltime)) {
	                	var rad=element.getDirection();
	                	if(element.getY()<150){
	                    	rad = 90*0.0174533;
	                	}
	                    else if (element.getY()>750){
	                    	rad = 270*0.0174533;
	                    }
	                    console.log(element.getDirection());
	                    element.setDirection(rad);
	                }
	        }
	    }
	}


}