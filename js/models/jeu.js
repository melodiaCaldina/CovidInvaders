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

		this.blow1 = false;
		this.blow2 = false;
		this.blow3 = false;
		this.blow4 = false;
		this.blow5 = false;
		this.blow6 = false;
		this.blow7 = false;
		this.blow8 = false;
		this.blow9 = false;
		this.blow10 = false;
		this.blow11= false;
		this.blow12= false;
		this.blow13= false;
		this.blow14= false;
		this.blow15 = false;
	    this.cineBoss = false;
	    this._shield = 0;
	    this._weapon = 0;
	    this._weaponType = 1;
		this.lastBossAnimation = false;
		this.lastBossAnimation2 = false;
		this.lastBossAnimation3 = false;
		this.lastBossAnimation4 = false;
		this.lastBossInvu = false;
		this.combo = 0;
		this.superScore = 0;
		//Fabrique permettant de générer les différents éléments graphiques du jeu
		this._fabriqueElement = new FabriqueElement();

		//Liste des éléments graphiques présents sur le plateau
		this._elementsGraphiques = new ElementsGraphiques(this);

		//Elément graphique symbolisant le joueur
		this._joueur = null;

		//affiche le texte des boss
		this._cutBoss = null;

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
        this.kamehameha1 = true;
        this.pangolideath = false;
        this.isFreezed = false;
		this.bossLevel = false;
		this.trashLevel = false;
		this.finalBossLevel = false;
		this.goCollision = false;
        // this.musicIntro.volume = 0;
        // this.musicIntro.currentTime = 0;
        // this.musicIntro.play();
		// this.letIntro();
		
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
				this.combo=0;
				controleur.updateCombo(this.combo);
                this._nbPDV--;
				if(this._weapon != 6){
					this._weapon--;
					if (this._weapon < 0){
						this._weapon = 0;
					}
				}
                this.animeWeaponLevel();
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
				this.combo=0;
				controleur.updateCombo(this.combo);
				this._nbPDV--;
				this._nbPDV--;
				if(this._weapon != 6){
					this._weapon--;
					if (this._weapon < 0){
						this._weapon = 0;
					}
				}
				this.animeWeaponLevel();
            }
            else if (this._shield == 1) {
				this.combo=0;
				controleur.updateCombo(this.combo);
                this._shield--;
                this._nbPDV--;
				if(this._weapon != 6){
					this._weapon--;
					if (this._weapon < 0){
						this._weapon = 0;
					}
				}
				this.animeWeaponLevel();
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

    animePlayer(isMoving) {
		if(!isMoving){
			if (this._joueur != null && this._joueur.estImmunise())
				this._joueur.anime();
		}else{
			if (this._joueur != null)
				this._joueur.anime();
		}
    }

    animeWeaponLevel() {
		if(this.weaponLevel instanceof  weaponLevel)
			this.weaponLevel.setTexture(this._weapon);


        // for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
        //     var element = this._elementsGraphiques.get(iElement);
        //     if (element instanceof (weaponLevel)) {
        //         this._elementsGraphiques.remove(iElement);
        //     }
        // }
        // if (this.weaponLevel instanceof weaponLevel) {
        //     this.weaponLevel.setTexture(this._weapon);
        //     this._elementsGraphiques.add(this.weaponLevel);
        // }
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
            if(that.finalBossLevel){
            	that.musicFinalBoss.play();
			}
            else if (that.trashLevel){
				that.musicTrash.play();
			}else{
				that.musicBoss.play();
			}
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


	swapMusicFinal(value){
		this.musicFinalBoss.pause();
		if(value == 1){
			this.musicFinalBoss = document.querySelector("#audioPlayerFinalBoss");
		}else{

			this.musicFinalBoss = document.querySelector("#audioPlayerFinalBoss2");
		}
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
		this.musicIntro = document.querySelector("#audioPlayerIntro");
		this.musicTrash = document.querySelector("#audioPlayerTrash");
		this.musicBoss = document.querySelector("#audioPlayerBoss");
		this.musicFinalBoss = document.querySelector("#audioPlayerFinalBoss");
		this.musicFinalBoss.currentTime = 0;
		this.musicBoss.currentTime = 0;
		this.musicTrash.currentTime = 0;
		this.musicIntro.currentTime = 0;
		this.timerIntro = null;
		this.timerBoss = null;
		this.timerTrash = null;
		this.alterTime = false;
		this.weaponLevel = null;
		this.cineBoss = false;
		this._shield = 0;
		this._weapon = 0;
		this.lastBossAnimation = false;
		this.lastBossAnimation2 = false;
		this.lastBossAnimation3 = false;
		this.lastBossAnimation4 = false;
		this.lastBossInvu = false;
		this._weaponType = 1;
		this.goCollision = false;
		this.combo = 0;
		this.superScore = 0;

		this.pangolideath = false;

		//affiche le texte des boss
		this._cutBoss = null;

		//Timer plaçant régulièrement des bonus sur le plateau
		this._timerBonus = null;
		this._moveTrash = false;
		this._bless = false;
		this._bossPDV = 50;
		this._bossMaxPDV = 50;
		this.kamehameha1 = true;
		this.pangolideath = false;
		this.isFreezed = false;





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


		this.bossLevel = false;
		this.trashLevel = false;
		this.finalBossLevel = false;

	    setTimeout(function(){controleur.tirEnd();},10);
		//Suppression des précédents éléments graphiques
	    this._elementsGraphiques.clear();
		this._joueur = this._fabriqueElement.create('humain');
		this._cutBoss = this._fabriqueElement.create('cutSceneBoss');
		this._cutBoss.setTexture(0);
		this._cutBoss.setXY((this._largeurPlateau / 20) * 4, (this._hauteurPlateau / 20) * 7);

		this._elementsGraphiques.add(this._cutBoss);
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
			this.swapMusicFinal(1);
			this.finalBossLevel = true;
		    var that = this;
		    this._joueur.setVitesse(0);
		    this._joueur.setIsInCT(true);
		    var inter = setInterval(function () { that._joueur.setVitesse(0); }, 20);
		    setTimeout(function () { that._joueur.setVitesse(8); }, 12000);
		    setTimeout(function () { that._joueur.setIsInCT(false); }, 12000);
		    setTimeout(function () { clearInterval(inter); }, 11500);
		    this._bossMaxPDV = 1300;
		    this._bossPDV = this._bossMaxPDV;
		    this.ajouterUltime(this._bossMaxPDV);
			this.musicFinalBoss = document.querySelector("#audioPlayerFinalBoss");
			this.musicFinalBoss.currentTime = 0;
		    setTimeout(function () { that.musicTrash.volume = 0.4; }, 1000);
		    setTimeout(function () { that.musicTrash.volume = 0.3; }, 2000);
		    setTimeout(function () { that.musicTrash.volume = 0.2; }, 3000);
		    setTimeout(function () { that.musicTrash.volume = 0.1; }, 4000);
		    setTimeout(function () { that.musicTrash.volume = 0; }, 4500);
		    setTimeout(function () { that.musicTrash.pause(); }, 5000);
		    setTimeout(function () { that.musicBoss.volume = 0.4; }, 1000);
		    setTimeout(function () { that.musicBoss.volume = 0.3; }, 2000);
		    setTimeout(function () { that.musicBoss.volume = 0.2; }, 3000);
		    setTimeout(function () { that.musicBoss.volume = 0.1; }, 4000);
		    setTimeout(function () { that.musicBoss.volume = 0; }, 4500);
		    setTimeout(function () { that.musicBoss.pause(); }, 5000);
		    clearInterval(this.timerTrash);
		    that.musicFinalBoss.volume = 0;
		    this.musicFinalBoss.play();
		    this.lastBossAnimation = false;
		    this.lastBossInvu = false;
			this.lastBossAnimation2 = false;
			this.lastBossAnimation3 = false;
			this.lastBossAnimation4 = false;
		    this.timerBoss = setInterval(function () {
		        setTimeout(function () { that.musicFinalBoss.volume = 0.4; }, 1000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.3; }, 2000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.2; }, 3000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.1; }, 4000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0; }, 4500);
		        setTimeout(function () { that.musicFinalBoss.currentTime = 0; }, 4500);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.1; }, 5000);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.2; }, 5800);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.3; }, 6500);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.4; }, 7200);
		        setTimeout(function () { that.musicFinalBoss.volume = 0.5; }, 8000);

		    }, 300000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.1; }, 1000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.2; }, 2000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.3; }, 3000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.4; }, 4000);
		    setTimeout(function () { that.musicFinalBoss.volume = 0.5; }, 5000);
		    setTimeout(function () { that.musicTrash.currentTime = 0; }, 6000);
		    setTimeout(function () { controleur.tirBegin(); }, 12000);
		    

		    this._bless = true;
		    setTimeout(function () { controleur.bless(); }, 3000);
		    this._joueur.setPDV(this._nbPDV);
		    this._elementsGraphiques.add(this._joueur);
		    
		}

		else if ((this._niveau+2) % 3 === 0) {
			this.swapMusicFinal(1);
			this.bossLevel = true;
		    var that = this;
		    this._joueur.setVitesse(0);
		    this._joueur.setIsInCT(true);
		    var inter = setInterval(function () { that._joueur.setVitesse(0); }, 20);
		    setTimeout(function () { that._joueur.setVitesse(8); }, 12000);
		    setTimeout(function () { that._joueur.setIsInCT(false); }, 12000);
		    setTimeout(function () { clearInterval(inter); }, 11500);
		    
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


			setTimeout(function () { that.musicTrash.volume = 0.4; }, 1000);
			setTimeout(function () { that.musicTrash.volume = 0; }, 8500);
			setTimeout(function () { that.musicTrash.pause(); }, 8500);
			setTimeout(function () { that.musicFinalBoss.volume = 0.4; }, 1000);
			setTimeout(function () { that.musicFinalBoss.volume = 0; }, 8500);
			setTimeout(function () { that.musicFinalBoss.pause(); }, 8500);
		    clearInterval(this.timerTrash);
		    that.musicBoss.volume = 0;
			this.musicBoss.play();
		    this.timerBoss = setInterval(function () {
		        setTimeout(function () { that.musicBoss.volume = 0.4; }, 1000);
		        setTimeout(function () { that.musicBoss.volume = 0.3; }, 2000);
		        setTimeout(function () { that.musicBoss.volume = 0.2; }, 3000);
		        setTimeout(function () { that.musicBoss.volume = 0.1; }, 4000);
		        setTimeout(function () { that.musicBoss.volume = 0; }, 4500);
		        setTimeout(function () { that.musicBoss.currentTime = 0; }, 4500);
		        setTimeout(function () { that.musicBoss.volume = 0.1; }, 5000);
		        setTimeout(function () { that.musicBoss.volume = 0.2; }, 5800);
		        setTimeout(function () { that.musicBoss.volume = 0.3; }, 6500);
		        setTimeout(function () { that.musicBoss.volume = 0.4; }, 7200);
		        setTimeout(function () { that.musicBoss.volume = 0.5; }, 8000);

		    }, 150000);
			setTimeout(function () { that.musicBoss.currentTime = 0;  }, 8400);
			setTimeout(function () { that.musicBoss.volume = 0.5; }, 8400);
			setTimeout(function () { that.musicTrash.currentTime = 0; }, 8500);
		    setTimeout(function () { controleur.tirBegin(); }, 14000);
		    

		    this._bless = true;
		    setTimeout(function () { controleur.bless(); }, 3000);
		    this._joueur.setPDV(this._nbPDV);
		    this._elementsGraphiques.add(this._joueur);
		    
		} else {
			this.swapMusicFinal(1);
			this.trashLevel = true;
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
		        nombrePampmousses = 4 * multiplicateur;
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

		    if ((this._niveau + 1) %3 ==0 || this._niveau == 0 || ((this._niveau+1)%15) ==1) {

		        var that = this;
		        setTimeout(function () { controleur.tirBossEnd(); }, 0);
				setTimeout(function () { that.musicBoss.volume = 0.4; }, 1000);
				setTimeout(function () { that.musicBoss.volume = 0.3; }, 2000);
				setTimeout(function () { that.musicBoss.volume = 0.2; }, 3000);
				setTimeout(function () { that.musicBoss.volume = 0.1; }, 4000);
				setTimeout(function () { that.musicBoss.volume = 0; }, 4500);
				setTimeout(function () { that.musicBoss.pause(); }, 5000);
				setTimeout(function () { that.musicFinalBoss.volume = 0.4; }, 1000);
				setTimeout(function () { that.musicFinalBoss.volume = 0.3; }, 2000);
				setTimeout(function () { that.musicFinalBoss.volume = 0.2; }, 3000);
				setTimeout(function () { that.musicFinalBoss.volume = 0.1; }, 4000);
				setTimeout(function () { that.musicFinalBoss.volume = 0; }, 4500);
				setTimeout(function () { that.musicFinalBoss.pause(); }, 5000);
				clearInterval(this.timerBoss);
		        that.musicTrash.volume = 0;
		        that.musicTrash.play();
		        this.timerTrash = setInterval(function () {
		            setTimeout(function () { that.musicTrash.volume = 0.4; }, 1000);
		            setTimeout(function () { that.musicTrash.volume = 0.3; }, 2000);
		            setTimeout(function () { that.musicTrash.volume = 0.2; }, 3000);
		            setTimeout(function () { that.musicTrash.volume = 0.1; }, 4000);
		            setTimeout(function () { that.musicTrash.volume = 0; }, 4500);
		            setTimeout(function () { that.musicTrash.currentTime = 0; }, 4500);
		            setTimeout(function () { that.musicTrash.volume = 0.1; }, 5000);
		            setTimeout(function () { that.musicTrash.volume = 0.2; }, 5800);
		            setTimeout(function () { that.musicTrash.volume = 0.3; }, 6500);
		            setTimeout(function () { that.musicTrash.volume = 0.4; }, 7200);
		            setTimeout(function () { that.musicTrash.volume = 0.5; }, 8000);

		        }, 240000);
		        setTimeout(function () { that.musicTrash.volume = 0.1; }, 1000);
		        setTimeout(function () { that.musicTrash.volume = 0.2; }, 2000);
		        setTimeout(function () { that.musicTrash.volume = 0.3; }, 3000);
		        setTimeout(function () { that.musicTrash.volume = 0.4; }, 4000);
		        setTimeout(function () { that.musicTrash.volume = 0.5; }, 5000);
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
	    this._shield = 9999;
	    this._joueur.setHasShield(true);
	}
	Weapon() {
	    this._weapon = 6;
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

	CheatCombo() {
		this.combo += 100;

		controleur.updateCombo(this.combo);
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
				var cutScene = this._cutBoss;
				setTimeout(function () { element.setVitesse(0); }, 8000);
				setTimeout(function () { cutScene.setTexture(3); }, 8500);
				setTimeout(function () { element.setVitesse(3); }, 12000);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
				setTimeout(function () { element.activerTexture(0); }, 12000);
	            element.setDirection(0);
	        }


	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);
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
				var cutScene = this._cutBoss;
				setTimeout(function () { element.setVitesse(0); }, 8000);
				setTimeout(function () { cutScene.setTexture(5); }, 8500);
				setTimeout(function () { element.setVitesse(3); }, 12000);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
				setTimeout(function () { element.activerTexture(0); }, 12000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);
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
				var cutScene = this._cutBoss;
				setTimeout(function () { element.setVitesse(0); }, 8000);
				setTimeout(function () { cutScene.setTexture(4); }, 8500);
				setTimeout(function () { element.setVitesse(3); }, 12000);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
				setTimeout(function () { element.activerTexture(0); }, 12000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);
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
				var cutScene = this._cutBoss;
				setTimeout(function () { element.setVitesse(0); }, 8000);
				setTimeout(function () { cutScene.setTexture(6); }, 8500);
				setTimeout(function () { element.setVitesse(3); }, 12000);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
				setTimeout(function () { element.activerTexture(0); }, 12000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);
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
				var cutScene = this._cutBoss;
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { cutScene.setTexture(1); }, 8500);
	            setTimeout(function () { element.setVitesse(3); }, 12000);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
	            setTimeout(function () { element.activerTexture(0); }, 12000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);
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
				this._cutBoss.setXY((this._largeurPlateau / 20) * 10, (this._hauteurPlateau / 20) * 4);
				var cutScene = this._cutBoss;
				setTimeout(function () { cutScene.setTexture(7); }, 8500);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
	            setTimeout(function () { element.setVitesse(0); }, 8000);
	            setTimeout(function () { element.setVitesse(2); }, 12000);
	            setTimeout(function () { element.setDirection(90*0.0174533); }, 11000);
	            setTimeout(function () { element.activerTexture(0); }, 12000);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);
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
				var cutScene = this._cutBoss;
				setTimeout(function () { element.setVitesse(0); }, 8000);
				setTimeout(function () { cutScene.setTexture(4); }, 8500);
				setTimeout(function () { element.setVitesse(3); }, 12000);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
				setTimeout(function () { element.activerTexture(0); }, 12000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);
	}

	ajouterBoss() {
	    this.ajouterElement(this._fabriqueElement.create('Boss'));
	    this.cineBoss = true;
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Boss)) {
	            element.setXY(0, Math.floor(this._hauteurPlateau / 2));
	            element.setVitesse(1);
				var cutScene = this._cutBoss;
				setTimeout(function () { element.setVitesse(0); }, 8000);
				setTimeout(function () { cutScene.setTexture(2); }, 8500);
				setTimeout(function () { element.setVitesse(3); }, 12000);
				setTimeout(function () { cutScene.setTexture(0); }, 12000);
				setTimeout(function () { element.activerTexture(0); }, 12000);
	            element.setDirection(0);
	        }

	    }
	    var that = this;
	    setTimeout(function () { that.cineBoss = false }, 12000);

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
		}, Math.floor(Math.random() * 5000) + 3000);
		
	}

	/**
	 * Ajoute une munition sur le plateau et prépare la prochaine distribution
	 */
	distribuerBonus()
	{
	    this.ajouterMunition();
	    var alea = Math.floor(Math.random() * 32);
	    if (alea == 1) {


			var that = this;
			that.musicTrash.pause();
			that.musicBoss.pause();
			that.musicFinalBoss.pause();
			document.querySelector('#audioIntroAlpacino').currentTime = 0;
			document.querySelector('#audioIntroAlpacino').volume = 1;
			document.querySelector('#audioIntroAlpacino').play();
			setTimeout(function () {
				document.querySelector('#audioIntroAlpacino').pause();
					if(that.finalBossLevel){
						that.musicFinalBoss.play();
					}
					else if (that.trashLevel){
						that.musicTrash.play();
					}else{
						that.musicBoss.play();
					}
			}
			, 1500);


			setTimeout(function () {that.ajouterElement(that._fabriqueElement.create('BoostSpeed'));
			for (var iElement = 0; iElement < that._elementsGraphiques.length() ; ++iElement) {
				var element = that._elementsGraphiques.get(iElement);
				if (element instanceof (BoostSpeed)) {
					element.setXY(that._largeurPlateau + 200, Math.floor(Math.random() * that._hauteurPlateau));
				}}}, 2000);
	    } else if (alea == 2 || alea == 6 || alea == 7 || alea == 9 || alea == 10) {
	        this.ajouterElement(this._fabriqueElement.create('BoostWeapon'));
	    } else if (alea == 3 || alea == 11 || alea == 12 || alea == 13) {
	        this.ajouterElement(this._fabriqueElement.create('BoostLife'));
	    } else if (alea == 4 || alea == 8  || alea == 16 || alea == 15 || alea == 14) {
			this.ajouterElement(this._fabriqueElement.create('BoostShield'));
		}else if (alea == 30){

// if (alea == 30)
			var that = this;
			that.musicTrash.pause();
			that.musicFinalBoss.pause();
			that.musicBoss.pause();
			document.querySelector('#audioIntroPangolino').currentTime = 0;
			document.querySelector('#audioIntroPangolino').volume = 1;
			document.querySelector('#audioIntroPangolino').play();
			setTimeout(function () {
					document.querySelector('#audioIntroPangolino').pause();
					if(that.finalBossLevel){
						that.musicFinalBoss.play();
					}
					else if (that.trashLevel){
						that.musicTrash.play();
					}else{
						that.musicBoss.play();
					}
				}
				, 3000);
			setTimeout(function () {that.ajouterElement(that._fabriqueElement.create('Pangolino'));}, 4000);
		} else if (alea == 20){
			this.ajouterElement(this._fabriqueElement.create('ChangeW1'));
		} else if (alea == 21){
			this.ajouterElement(this._fabriqueElement.create('ChangeW2'));
		} else if (alea == 22){
			this.ajouterElement(this._fabriqueElement.create('ChangeW3'));
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

	soundExplosion(){
		if (!this.blow1) {
			var musicTir = document.querySelector("#audioPlayerExplosion");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow1 = true;
			setTimeout(function () { that.blow1 = false; }, 1200);
		} else if (!this.blow2) {
			var musicTir = document.querySelector("#audioPlayerExplosion2");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow2 = true;
			setTimeout(function () { that.blow2 = false; }, 1200);
		} else if (!this.blow3) {
			var musicTir = document.querySelector("#audioPlayerExplosion3");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow3 = true;
			setTimeout(function () { that.blow3 = false; }, 1200);
		} else if (!this.blow4) {
			var musicTir = document.querySelector("#audioPlayerExplosion4");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow4 = true;
			setTimeout(function () { that.blow4 = false; }, 1200);
		} else if (!this.blow5) {
			var musicTir = document.querySelector("#audioPlayerExplosion5");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow5 = true;
			setTimeout(function () { that.blow5 = false; }, 1200);
		} else if (!this.blow6) {
			var musicTir = document.querySelector("#audioPlayerExplosion6");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow6 = true;
			setTimeout(function () { that.blow6 = false; }, 1200);
		} else if (!this.blow7) {
			var musicTir = document.querySelector("#audioPlayerExplosion7");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow7 = true;
			setTimeout(function () { that.blow7 = false; }, 1200);
		} else if (!this.blow8) {
			var musicTir = document.querySelector("#audioPlayerExplosion8");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow8 = true;
			setTimeout(function () { that.blow8 = false; }, 1200);
		} else if (!this.blow9) {
			var musicTir = document.querySelector("#audioPlayerExplosion9");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow9 = true;
			setTimeout(function () { that.blow9 = false; }, 1200);
		} else if (!this.blow10) {
			var musicTir = document.querySelector("#audioPlayerExplosion11");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow11 = true;
			setTimeout(function () { that.blow10 = false; }, 1200);
		} else if (!this.blow11) {
			var musicTir = document.querySelector("#audioPlayerExplosion11");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow11 = true;
			setTimeout(function () { that.blow11 = false; }, 1200);
		} else if (!this.blow12) {
			var musicTir = document.querySelector("#audioPlayerExplosion12");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow12 = true;
			setTimeout(function () { that.blow12 = false; }, 1200);
		} else if (!this.blow13) {
			var musicTir = document.querySelector("#audioPlayerExplosion13");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow13 = true;
			setTimeout(function () { that.blow13 = false; }, 1200);
		} else if (!this.blow14) {
			var musicTir = document.querySelector("#audioPlayerExplosion14");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow14 = true;
			setTimeout(function () { that.blow14 = false; }, 1200);
		} else if (!this.blow15) {
			var musicTir = document.querySelector("#audioPlayerExplosion15");
			musicTir.volume = 0.05;
			musicTir.play();
			var that = this;
			this.blow15 = true;
			setTimeout(function () { that.blow15 = false; }, 1200);
		}
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
					presseAgrumes.activerTexture(this._weaponType);
					presseAgrumes.setDegats(this._weaponType);
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                this._elementsGraphiques.add(presseAgrumes);
	            } else if (this._weapon == 1) {
	                var presseAgrumes = this._fabriqueElement.create('presse agrumes');
					presseAgrumes.activerTexture(this._weaponType);
					presseAgrumes.setDegats(this._weaponType);
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                var presseAgrumes2 = this._fabriqueElement.create('presse agrumes');
					presseAgrumes2.activerTexture(this._weaponType);
					presseAgrumes2.setDegats(this._weaponType);
	                presseAgrumes2.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes2.setDirection(this._joueur.getDirection() - (15 * 0.0174533));
	                presseAgrumes2.setRotation(this._joueur.getRotation() - (15 * 0.0174533));
	                var presseAgrumes3 = this._fabriqueElement.create('presse agrumes');
					presseAgrumes3.activerTexture(this._weaponType);
					presseAgrumes3.setDegats(this._weaponType);
	                presseAgrumes3.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes3.setDirection(this._joueur.getDirection() + (15 * 0.0174533));
	                presseAgrumes3.setRotation(this._joueur.getRotation() + (15 * 0.0174533));
	                this._elementsGraphiques.add(presseAgrumes);
	                this._elementsGraphiques.add(presseAgrumes2);
	                this._elementsGraphiques.add(presseAgrumes3);
	            } else if (this._weapon == 2) {
	                var presseAgrumes = this._fabriqueElement.create('presse agrumes');
					presseAgrumes.activerTexture(this._weaponType);
					presseAgrumes.setDegats(this._weaponType);
	                presseAgrumes.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes.setDirection(this._joueur.getDirection());
	                presseAgrumes.setRotation(this._joueur.getRotation());
	                var presseAgrumes2 = this._fabriqueElement.create('presse agrumes');
					presseAgrumes2.activerTexture(this._weaponType);
					presseAgrumes2.setDegats(this._weaponType);
	                presseAgrumes2.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes2.setDirection(this._joueur.getDirection() - (10 * 0.0174533));
	                presseAgrumes2.setRotation(this._joueur.getRotation() - (10 * 0.0174533));
	                var presseAgrumes3 = this._fabriqueElement.create('presse agrumes');
					presseAgrumes3.activerTexture(this._weaponType);
					presseAgrumes3.setDegats(this._weaponType);
	                presseAgrumes3.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes3.setDirection(this._joueur.getDirection() + (10 * 0.0174533));
	                presseAgrumes3.setRotation(this._joueur.getRotation() + (10 * 0.0174533));
	                var presseAgrumes4 = this._fabriqueElement.create('presse agrumes');
					presseAgrumes4.activerTexture(this._weaponType);
					presseAgrumes4.setDegats(this._weaponType);
	                presseAgrumes4.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes4.setDirection(this._joueur.getDirection() - (20 * 0.0174533));
	                presseAgrumes4.setRotation(this._joueur.getRotation() - (20 * 0.0174533));
	                var presseAgrumes5 = this._fabriqueElement.create('presse agrumes');
					presseAgrumes5.activerTexture(this._weaponType);
					presseAgrumes5.setDegats(this._weaponType);
	                presseAgrumes5.setCoordonnees(this._joueur.getCoordonnees());
	                presseAgrumes5.setDirection(this._joueur.getDirection() + (20 * 0.0174533));
	                presseAgrumes5.setRotation(this._joueur.getRotation() + (20 * 0.0174533));
	                this._elementsGraphiques.add(presseAgrumes);
	                this._elementsGraphiques.add(presseAgrumes2);
	                this._elementsGraphiques.add(presseAgrumes3);
	                this._elementsGraphiques.add(presseAgrumes4);
	                this._elementsGraphiques.add(presseAgrumes5);
	            } else if (this._weapon == 3) {
					for (var i = 0; i < 8; i++) {

						var rad = this._joueur.getDirection();
						if(i < 4){
							rad = rad + (i*(0.0174533*4));
						}else{
							rad = rad - ((i-4)*(0.0174533*4));
						}
						// var rad = this._joueur.getDirection();
						// this._joueur.getDirection() - (2 * 0.0174533)
						// rad += 18 * i;
						// rad = rad * 0.0174533;
						var bossMunition = this._fabriqueElement.create('presse agrumes');
						bossMunition.activerTexture(this._weaponType);
						bossMunition.setDegats(this._weaponType);
						bossMunition.setCoordonnees(this._joueur.getCoordonnees());
						bossMunition.setDirection(rad);
						bossMunition.setRotation(rad);

						this._elementsGraphiques.add(bossMunition);
					}
	            } else if (this._weapon == 4) {
					for (var i = 0; i < 16; i++) {

						var rad = this._joueur.getDirection();
						if(i < 8){
							rad = rad + (i*(0.0174533*2));
						}else{
							rad = rad - ((i-8)*(0.0174533*2));
						}
						// var rad = this._joueur.getDirection();
						// this._joueur.getDirection() - (2 * 0.0174533)
						// rad += 18 * i;
						// rad = rad * 0.0174533;
						var bossMunition = this._fabriqueElement.create('presse agrumes');
						bossMunition.activerTexture(this._weaponType);
						bossMunition.setDegats(this._weaponType);
						bossMunition.setCoordonnees(this._joueur.getCoordonnees());
						bossMunition.setDirection(rad);
						bossMunition.setRotation(rad);

						this._elementsGraphiques.add(bossMunition);
					}
	            } else if (this._weapon == 5) {

					for (var i = 0; i < 30; i++) {

						var rad = this._joueur.getDirection();
						if(i < 15){
							rad = rad + (i*0.0174533);
						}else{
							rad = rad - ((i-15)*0.0174533);
						}
						// var rad = this._joueur.getDirection();
						// this._joueur.getDirection() - (2 * 0.0174533)
						// rad += 18 * i;
						// rad = rad * 0.0174533;
						var bossMunition = this._fabriqueElement.create('presse agrumes');
						bossMunition.activerTexture(this._weaponType);
						bossMunition.setDegats(this._weaponType);
						bossMunition.setCoordonnees(this._joueur.getCoordonnees());
						bossMunition.setDirection(rad);
						bossMunition.setRotation(rad);

						this._elementsGraphiques.add(bossMunition);
					}
				}else if (this._weapon == 6) {

					for (var i = 0; i < 50; i++) {

						var rad = this._joueur.getDirection();
						if(i < 25){
							rad = rad + (i*(0.0174533/2));
						}else{
							rad = rad - ((i-25)*(0.0174533/2));
						}
						// var rad = this._joueur.getDirection();
						// this._joueur.getDirection() - (2 * 0.0174533)
						// rad += 18 * i;
						// rad = rad * 0.0174533;
						var bossMunition = this._fabriqueElement.create('presse agrumes');
						bossMunition.setDegats(this._weaponType);
						bossMunition.setCoordonnees(this._joueur.getCoordonnees());
						bossMunition.setDirection(rad);
						bossMunition.setRotation(rad);
						bossMunition.activerTexture(0);

						this._elementsGraphiques.add(bossMunition);
					}
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
						that._elementsGraphiques.add(peche2);
						oeuf.setDisappear(true);
	                }, 3000);

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
	                for (var i = 0; i < 2;i++){
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
	                for (var i = 0; i < 30; i++) {
	                    rad += 6 * i;
	                    rad = rad * (0.0174533*2);
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
		if(!this.isFreezed){
			this._elementsGraphiques.animer(this._largeurPlateau, this._hauteurPlateau);

				this.gererCollissions();

			if (this._elementsGraphiques.getNombrePampmoussesMutants() == 0)
			{
				this._gagne = true;
				this.terminer();
			}

			this.notifier();
		}else {
			this._elementsGraphiques.animerScene(this._largeurPlateau, this._hauteurPlateau);

			this.notifier();
		}
	}
	animerHumain(dir)
	{
		if(dir==0){
			this._elementsGraphiques.animerHumain("Up");
			} else if(dir==1){
			this._elementsGraphiques.animerHumain("Left");
			} else if (dir==2){
			this._elementsGraphiques.animerHumain("Down");
			} else if(dir==3){
			this._elementsGraphiques.animerHumain("Right");
		} else if(dir==4){
			this._elementsGraphiques.animerHumain("UpperRight");
		} else if(dir==5){
			this._elementsGraphiques.animerHumain("UpperLeft");
		} else if(dir==6){
			this._elementsGraphiques.animerHumain("LowerRight");
		} else if(dir==7){
			this._elementsGraphiques.animerHumain("LowerLeft");
		}


		this.notifier();
	}

	gererGrosTir(element){
		if(element.notYetExploded){
			element.startExplosion = true;
			// var elt = element;
			// setTimeout(function() {
			// 	elt.exploded = false;
			// 	elt.startExplosion = false;
			// 	elt.resetExplosion();
			// }, 60);
			return 9;
		}
		else if(element.exploding)
		{
			element.exploded = true;
			var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
			this._elementsGraphiques.add(elementExploded);
			var today = new Date();
			var time = today.getSeconds() + ":" + today.getMilliseconds();
			elementExploded.setXY(element.getX(), element.getY());
			elementExploded.setRotation(element.getRotation());
			elementExploded.explode();

			// var that = this;
			// setTimeout(function () { that.eraseTir(); }, 600);
			return 1;
		}
	}

	gererEtatBoss(element, element2){

		this._bossPDV -= element.degats;
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
			setTimeout(function () {
				musicBoss.play();
			}, 200);
			element2.beginDeath();
			setTimeout(function () {
				controleur.winBoss();
			}, 2000);
		}
	}

	gererEtatAbricot(element, element2){

		element2.setPDV(element2.getPDV() - element.degats);
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

	gererEtatAnanas(element, element2){

		element2.setPDV(element2.getPDV() - element.degats);
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

	gererEtatFraise(element, element2){

		element2.setPDV(element2.getPDV() - element.degats);
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

	gererEtatFramboiseUltime(element, element2){

		if(!this.lastBossInvu)
			element2.setPDV(element2.getPDV() - element.degats);




		if (element2.getPDV() <= (this._bossMaxPDV / 1.3)) {
			element2.activerTexture(2);
		}
		if (element2.getPDV() <= (this._bossMaxPDV / 2)) {

			if (!this.lastBossAnimation) {
				this.lastBossAnimation = true;
				this.lastBossInvu = true;
				var cutScene = this._cutBoss;
				var that = this;
				var elt2 = element2;
				cutScene.setTexture(8);
				clearTimeout(this._timerBonus);
				setTimeout(function () {
					cutScene.setTexture(9);
				}, 6000);
				setTimeout(function () {
					elt2.setXY(elt2.getX(), that._hauteurPlateau / 2);
				}, 9800);
				setTimeout(function () {
					elt2.setVitesse(0);
				}, 9800);
				setTimeout(function () {
					cutScene.setTexture(10);
				}, 11600);
				setTimeout(function () {
					that.musicFinalBoss.volume = 0.4;
				}, 10800);
				setTimeout(function () {
					that.musicFinalBoss.volume = 0.3;
				}, 10900);
				setTimeout(function () {
					that.musicFinalBoss.volume = 0.2;
				}, 11000);
				setTimeout(function () {
					that.musicFinalBoss.volume = 0.1;
				}, 11100);
				setTimeout(function () {
					that.musicFinalBoss.volume = 0;
				}, 11200);
				setTimeout(function () {
					that.musicFinalBoss.pause();
				}, 11300);

				setTimeout(function () {
					document.querySelector('#audioAlpacino').pause();
					document.querySelector('#audioIntroAlpacino').pause();
					document.querySelector('#audioWarudo').currentTime = 0;
					document.querySelector('#audioWarudo').volume = 1;
					document.querySelector('#audioWarudo').play();
					controleur.tirEnd();


				}, 11300);


				setTimeout(function () {
					that.isFreezed = true;
					that._joueur.setIsInCT(true);
					that.freezeAll();
				}, 15000);
				setTimeout(function () {
					that._joueur.setVitesse(0);
				}, 15000);
				setTimeout(function () {
					controleur.stopUpdateWeapon();
				}, 15000);
				setTimeout(function () {
					that._bless = true;
				}, 15000);
				setTimeout(function () {
					that.cineBoss = true;
				}, 15000);
				setTimeout(function () {
					cutScene.setTexture(13);
				}, 15000);
				setTimeout(function () {
					cutScene.setTexture(14);
					that.freezeAll();
				}, 19000);
				setTimeout(function () {
					that._joueur.setXY(that._largeurPlateau / 2, that._hauteurPlateau / 2 + 30);
				}, 19000);

				setTimeout(function () {that.freezeAll();}, 20000);
				setTimeout(function () {that.freezeAll();}, 21000);
				setTimeout(function () {that.freezeAll();}, 22000);
				setTimeout(function () {that.freezeAll();}, 23000);
				setTimeout(function () {
					cutScene.setTexture(15);
					that.freezeAll();
				}, 24000);


				setTimeout(function () {
					that.freezeAll();
					document.querySelector('#audioAlpacino').pause();
					document.querySelector('#audioIntroAlpacino').pause();
					document.querySelector('#audioWarudo').pause();
					document.querySelector('#audioKamehameha').currentTime = 0;
					document.querySelector('#audioKamehameha').volume = 0.9;
					document.querySelector('#audioKamehameha').play();

				}, 25000);
				setTimeout(function () {
					cutScene.setXY(that._largeurPlateau / 2, elt2.getY());
					that.freezeAll();
				}, 28000);
				setTimeout(function () {
					cutScene.setTexture(11);
				}, 28000);
				setTimeout(function () {

						that._nbPDV--;
						that._nbPDV--;
						that._nbPDV--;
						that._joueur.setPDV(that._nbPDV);
						that._joueur.isDead = true;
						that._joueur.anime();
					}
					, 28000);
				setTimeout(function () {
					var interv = setInterval(function () {
						if (that.kamehameha1) {
							cutScene.setTexture(11);
						} else {
							cutScene.setTexture(12);
						}
						that.kamehameha1 = !that.kamehameha1;
					}, 100);

					setTimeout(function () {
						clearInterval(interv);
					}, 4000);
				}, 28000);

				setTimeout(function () {
					cutScene.setXY((that._largeurPlateau / 20) * 10, (that._hauteurPlateau / 20) * 4);
					cutScene.setTexture(17);
				}, 32100);
				setTimeout(function () {
					that.swapMusicFinal(2);
					// that.musicFinalBoss = document.querySelector("#audioPlayerFinalBoss2");

					that.musicFinalBoss.currentTime = 0;
					that.musicFinalBoss.volume = 0.3;
					that.musicFinalBoss.play();
				}, 34000);

				setTimeout(function () {
					cutScene.setTexture(18);
				}, 36000);
				setTimeout(function () {
					document.querySelector('#audioKamehameha').pause();
				}, 37000);
				setTimeout(function () {

						that._joueur.isDead = false;
						that._joueur.isLookingBack = true;
						that._joueur.anime();
					}
					, 42000);

				setTimeout(function () {
					cutScene.setTexture(19);
				}, 42300);
				setTimeout(function () {
						that._joueur.isLookingBack = false;
						that._joueur.isLookingLeft = true;
						that._joueur.anime();
					}
					, 44000);
				setTimeout(function () {
					that._joueur.isLookingRight = true;
					that._joueur.isLookingLeft = false;
					that._joueur.anime();
				}, 46000);
				setTimeout(function () {
					that._joueur.isLookingBack = true;
					that._joueur.isLookingRight = false;
					that._joueur.anime();
				}, 48000);
				setTimeout(function () {
					that._joueur.isLookingBack = false;
					that._joueur.immortal = true;
					that.musicFinalBoss.volume = 1;
					that._joueur.anime();
				}, 51500);
				setTimeout(function () {
					cutScene.setTexture(16);
				}, 51900);

// speech 2 = 8
//speech 4 = 10
//kamehameha1 = 11
//speech 5= 13
				setTimeout(function () {
					document.querySelector('#audioKamehameha').pause();
					that._joueur.setIsInCT(false);
					that._joueur.setVitesse(30);
					that.cineBoss = false;
					that._weapon = 6;
					cutScene.setTexture(0);
					elt2.setVitesse(1);
					elt2.setPDV(that._bossMaxPDV / 2 - 15);
					that.lastBossInvu = false;
					that.unfreezeAll();
					that.isFreezed = false;
					that.demarrerDistributionBonus();
					controleur.tirBegin();
					controleur.startUpdateWeapon();
				}, 55000);


			}
			element2.activerTexture(4);

		}
//speech 12 = 20
		if (element2.getPDV() <= (this._bossMaxPDV / 4)) {

			if(!this.lastBossAnimation2){

				this.lastBossAnimation2 = true;
				var cutScene = this._cutBoss;
				cutScene.setTexture(20);
				setTimeout(function () { cutScene.setTexture(0); }, 5000);
			}
			element2.activerTexture(6);
		}
		if (element2.getPDV() <= (this._bossMaxPDV / 8)) {
			if(!this.lastBossAnimation3){
				this.lastBossAnimation3 = true;
				var cutScene = this._cutBoss;
				cutScene.setTexture(20);
				setTimeout(function () { cutScene.setTexture(0); }, 5000);
				// setTimeout(function () { cutScene.setTexture(0); }, 5000);
			}
		}
		element2.beginClignotement();
		if (element2.getPDV() <= 0) {
			if(!this.lastBossAnimation4){
				this.lastBossAnimation4 = true;
				var cutScene = this._cutBoss;
				cutScene.setTexture(20);
				setTimeout(function () { cutScene.setTexture(0); }, 5000);
			}
			var cutScene = this._cutBoss;
			cutScene.setTexture(22);
			setTimeout(function () { cutScene.setTexture(0); }, 4000);
			this._joueur.immuniser();
			this._joueur.setVitesse(12);
			var that = this;
			var musicBoss = document.querySelector("#audioPlayerExploBoss");
			musicBoss.play();
			this._joueur.immortal = false;
			that._weapon = 4;
			setTimeout(function () { musicBoss.play(); }, 200);
			element2.beginDeath();
			setTimeout(function () { that.winUltime(); }, 4000);
		}
	}

	gererEtatMangue(element, element2){

		element2.setPDV(element2.getPDV() - element.degats);
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

	gererEtatOrange(element, element2){

		element2.setPDV(element2.getPDV() - element.degats);
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

	gererEtatSangrine(element, element2){

		element2.setPDV(element2.getPDV() - element.degats);
		element2.beginClignotement();
		if (element2.getPDV() <= 0) {
			element2.setTaille(300);
			this._joueur.immuniser();
			var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
			musicBoss.volume = 0.05;
			musicBoss.play();
			element2.beginDeath();
			var that = this;
			setTimeout(function () { that.winSangrine(); }, 1000);
		}
	}


	gererSuppressionTrash( element, element2){
		if (!element2.getDead()) {
			var result = 9;
			if(this._weaponType == 3){
				result = this.gererGrosTir(element);
			}else{
				result = 1;
			}

			if(element.degats > 0){
				element2.beginDeath();
				var that = this;
				this.combo++;
				this.superScore += element2.pointValue*this.combo;
				controleur.updateCombo(this.combo);
				controleur.updateScore(this.superScore);
				setTimeout(function () { that.eraseTrash(); }, 12000);
			}

			return result;
		}else {
			return 9; // nothing to destroy
		}
	}

	gererSuppressionMob(element, element2){
		if (!element2.getDead()) {

			var result = 9;
			if(this._weaponType == 3){
				result = this.gererGrosTir(element);
			}else{
				result = 1;
			}
			element2.setPDV(element2.getPDV() - element.degats);
			if (element2.getPDV() <= 0) {
				result = 0;
				if(element2.name == "Cerises"){
					this.popMiniCerises(element2);
				}
				element2.beginDeath();
				var that = this;
				this.combo++;
				this.superScore += element2.pointValue*this.combo;
				controleur.updateCombo(this.combo);
				controleur.updateScore(this.superScore);
				setTimeout(function () { that.eraseTrash(); }, 12000);
			}

			return result;
		}else {
			return 9; // nothing to destroy
		}
	}

	gererSuppressionBoss(element, element2) {
		var result = 9;
		if (this._weaponType == 3) {
			result = this.gererGrosTir(element);
		} else {
			result = 1;
		}


		switch(element2.name){
			case "Boss":
				this.gererEtatBoss(element, element2);
				break;
			case "Abricot":
				this.gererEtatAbricot(element, element2);
				break;
			case "Ananas":
				this.gererEtatAnanas(element, element2);
				break;
			case "Fraise":
				this.gererEtatFraise(element, element2);
				break;
			case "FramboiseUltime":
				this.gererEtatFramboiseUltime(element, element2);
				break;
			case "Mangue":
				this.gererEtatMangue(element, element2);
				break;
			case "Orange":
				this.gererEtatOrange(element, element2);
				break;
			case "Sangrine":
				this.gererEtatSangrine(element, element2);
				break;
		}

		return result;
	}


	popMiniCerises(element2){
		for (var i = 0; i < 6; i++) {
			var cerise = this._fabriqueElement.create('minicerise');
			cerise.setCoordonnees(element2.getCoordonnees());
			cerise.activerTexture(i);
			this._elementsGraphiques.add(cerise);
		}
	}



	gererDegatsEnnemis(element, element2){
		if(element2.genre == "trash"){
			return this.gererSuppressionTrash(element, element2);
		}else if (element2.genre == "mob"){
			return this.gererSuppressionMob(element, element2);
		}else if (element2.genre == "boss"){
			return this.gererSuppressionBoss(element, element2);
		}else if (element2.genre == "SuperBoss"){
			return this.gererSuppressionBoss(element, element2);
		}
	}

	//type -> ennemi, boost, etc...
	//genre -> trash, mob, boss...

	removeElement(indice){
		var result = indice;
		var element = this._elementsGraphiques.get(indice);

		var today = new Date();
		var time = today.getSeconds() + ":" + today.getMilliseconds();
		this._elementsGraphiques.remove(result);
		if(result >=  this._elementsGraphiques.length()){
			result = this._elementsGraphiques.length() -1;
		}
		return result;

	}

	/**
	 * Gère les éventuelles collisions entre les éléments présents sur le plateau de jeu
	 */
	gererCollissions()
	{
		//Pour chaque éléments du plateau de jeu
	    try{
	    	for(var iElement = 0; iElement < this._elementsGraphiques.length(); ++iElement)
	        {
	        var element = this._elementsGraphiques.get(iElement);

	        if (element instanceof ElementMobile)
	        {

	            //Teste la collision des éléments avec les murs
	            if (this.testerCollisionsMurs(element))
	            {
					if (element instanceof BoostSpeed){
						if(element.getX() < 100){
							iElement = this.removeElement(iElement);
						}
					}
	                //Si un pampmousse mutant touche un mur, il change de direction
	                if (element instanceof Framboise || element instanceof Mure || element instanceof PampmousseMutant || element instanceof Peche || element instanceof Cassis || element instanceof Cerises || element instanceof miniCerise || element instanceof Pangolino)
	                {
	                    element.setDirection((((Math.random() * 360) + 1)*0.0174533));
	                }
	                else if (element instanceof PresseAgrumes || element instanceof BossMunition || element instanceof BigMunition) {
	                    //Si c'est un presse agrume, il est détruit
						iElement = this.removeElement(iElement);
	                } else if (element instanceof Boss || element instanceof Abricot) {
	                    //Si c'est un presse agrume, il est détruit
	                    element.setDirection((((Math.random() * 360) + 1) * 0.0174533));
	                }
	            }

	            //Teste les collision entre éléments
	            for (var iElement2 = 0; iElement2 < this._elementsGraphiques.length() ; ++iElement2)
	            {
	            	if(iElement == iElement2 || element instanceof cutSceneBoss){
	            		continue;
					}
	                var element2 = this._elementsGraphiques.get(iElement2);
	                if (!(element2 instanceof Fraise) && !(element2 instanceof FramboiseUltime) && !(element2 instanceof Sangrine) && !(element2 instanceof Orange) && !(element2 instanceof Mangue) && !(element2 instanceof Mure) && !(element2 instanceof Framboise) && !(element2 instanceof Cassis) && !(element2 instanceof Cerises) && !(element2 instanceof miniCerise) && !(element2 instanceof Citron) && !(element2 instanceof Ananas) && !(element2 instanceof PampmousseMutant) && !(element2 instanceof Munition) && !(element2 instanceof Boss) && !(element2 instanceof BossMunition) && !(element2 instanceof BigMunition) && !(element2 instanceof Abricot) && !(element2 instanceof BoostLife) && !(element2 instanceof BoostWeapon) && !(element2 instanceof BoostSpeed) && !(element2 instanceof BoostShield) && !(element2 instanceof changeW1) && !(element2 instanceof changeW2) && !(element2 instanceof changeW3) && !(element2 instanceof Peche) && !(element2 instanceof Pangolino))
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

								iElement2 = this.removeElement(iElement2);
	                            // //La munition est retirée du jeu
	                            // this._elementsGraphiques.remove(iElement2);
								//
	                            // if (iElement2 < iElement)
	                            //     iElement--;
								//
	                            // --iElement2;

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
	                        }
	                        else if (element2 instanceof BigMunition) {
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
								iElement2 = this.removeElement(iElement2);
								this._shield = this._shield + 2;
								if (this._shield > 2)
									this._shield = 2;
								this._joueur.setHasShield(true);
							}
							else if (element2 instanceof changeW1) {
								iElement2 = this.removeElement(iElement2);
								this._weaponType = 1;
								$('#label-weapon-1').removeClass('unused');
								$('#label-weapon-2').addClass('unused');
								$('#label-weapon-3').addClass('unused');
							}
							else if (element2 instanceof changeW2) {
								iElement2 = this.removeElement(iElement2);
								this._weaponType = 2;
								$('#label-weapon-1').addClass('unused');
								$('#label-weapon-2').removeClass('unused');
								$('#label-weapon-3').addClass('unused');
							}
							else if (element2 instanceof changeW3) {
								iElement2 = this.removeElement(iElement2);
								this._weaponType = 3;
								$('#label-weapon-1').addClass('unused');
								$('#label-weapon-2').addClass('unused');
								$('#label-weapon-3').removeClass('unused');
							}
							else if (element2 instanceof Pangolino) {
								iElement2 = this.removeElement(iElement2);
								this.combo+=10;
								controleur.updateCombo(this.combo);
								this._nbPDV++;
								this._nbPDV++;
								this._nbPDV++;
								this._nbPDV++;
								this._nbPDV++;
								this._nbPDV++;
								this._nbPDV++;
								this._nbPDV++;
								this._nbPDV++;
								this._weapon = 4;
								this._shield = this._shield + 2;
								if (this._shield > 2)
									this._shield = 2;
								this._joueur.setHasShield(true);
								this._joueur.setPDV(this._nbPDV);
							}
	                        else if (element2 instanceof BoostSpeed) {
								this.combo+=3;
								controleur.updateCombo(this.combo);
								iElement2 = this.removeElement(iElement2);
	                            this._joueur.setVitesse(20);
								this._weapon = 5;
								this._bless = true;
	                            this._joueur.immuniserBoost();
	                            var that = this;
								setTimeout(function () { that._joueur.setVitesse(12); }, 15000);
								setTimeout(function () { that._weapon = 4;}, 15000);
								setTimeout(function () { that._bless = false;}, 15000);
								setTimeout(function () { that._joueur.desimmuniser(); }, 15000);
								document.querySelector('#audioAlpacino').currentTime = 0;
								document.querySelector('#audioAlpacino').volume = 1;
								document.querySelector('#audioAlpacino').play();
								this.musicTrash.pause();
								this.musicBoss.pause();
								this.musicFinalBoss.pause();
								setTimeout(function () {
										document.querySelector('#audioAlpacino').pause();
										if(that.finalBossLevel){
											that.musicFinalBoss.play();
										}
										else if (that.trashLevel){
											that.musicTrash.play();
										}else{
											that.musicBoss.play();
										}
									}
									, 15000);

	                        }
	                        else if (element2 instanceof BoostLife) {
								iElement2 = this.removeElement(iElement2);
	                            this._nbPDV++;
	                            this._joueur.setPDV(this._nbPDV);
	                        }
	                        else if (element2 instanceof BoostWeapon) {
								iElement2 = this.removeElement(iElement2);
	                            this._weapon++;
	                            this.animeWeaponLevel();
	                            if (this._weapon > 4 && this._weapon != 6)
	                                this._weapon = 4;
	                        }
							
	                    }
	                        // Si un presse-agrumes touche un pampmousse mutant
						else if(element instanceof PresseAgrumes && element2.type == "ennemi"){
							var result = this.gererDegatsEnnemis(element, element2);
							if(result == 0){ //both element destroyed
								iElement = this.removeElement(iElement);
								// iElement2 = this.removeElement(iElement2);
							}else if (result ==1){ // element1 destroyed
								iElement = this.removeElement(iElement);
							}
						}



// 	                    else if (element instanceof PresseAgrumes && element2 instanceof FramboiseUltime) {
// 							if(this._weaponType != 3){
//
// 								//////////////
// 								this._elementsGraphiques.remove(iElement);
// 								if(!this.lastBossInvu)
// 									element2.setPDV(element2.getPDV() - element.degats);
// 								////////////////
// 							}
// 							else
// 							{
// 								if(element.notYetExploded){
// 									element.startExplosion = true;
// 									setTimeout(function() {
// 										elt.exploded = false;
// 										elt.startExplosion = false;
// 										elt.resetExplosion();
// 									}, 60);
//
// 								}
// 								else if(element.exploding){
// 									element.exploded = true;
// 									var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
// 									this._elementsGraphiques.add(elementExploded);
// 									elementExploded.setXY(element.getX(), element.getY());
// 									elementExploded.setRotation(element.getRotation());
// 									elementExploded.explode();
//
// 									////////////
// 									this._elementsGraphiques.remove(iElement);
// 									if(!this.lastBossInvu)
// 										element2.setPDV(element2.getPDV() - element.degats);
// 									////////////
//
// 									setTimeout(function () { that.eraseTir(); }, 600);
// 									--iElement;
// 									--iElement2;
// 								}
// 							}
// 							////////
//
//
//
// 	                        if (element2.getPDV() <= (this._bossMaxPDV / 1.3)) {
// 	                            element2.activerTexture(2);
// 	                        }
// 	                        if (element2.getPDV() <= (this._bossMaxPDV / 2)) {
//
// 								if (!this.lastBossAnimation) {
// 									this.lastBossAnimation = true;
// 									this.lastBossInvu = true;
// 									var cutScene = this._cutBoss;
// 									var that = this;
// 									var elt2 = element2;
// 									cutScene.setTexture(8);
// 									clearTimeout(this._timerBonus);
// 									setTimeout(function () {
// 										cutScene.setTexture(9);
// 									}, 6000);
// 									setTimeout(function () {
// 										elt2.setXY(elt2.getX(), that._hauteurPlateau / 2);
// 									}, 9800);
// 									setTimeout(function () {
// 										elt2.setVitesse(0);
// 									}, 9800);
// 									setTimeout(function () {
// 										cutScene.setTexture(10);
// 									}, 11600);
// 									setTimeout(function () {
// 										that.musicFinalBoss.volume = 0.4;
// 									}, 10800);
// 									setTimeout(function () {
// 										that.musicFinalBoss.volume = 0.3;
// 									}, 10900);
// 									setTimeout(function () {
// 										that.musicFinalBoss.volume = 0.2;
// 									}, 11000);
// 									setTimeout(function () {
// 										that.musicFinalBoss.volume = 0.1;
// 									}, 11100);
// 									setTimeout(function () {
// 										that.musicFinalBoss.volume = 0;
// 									}, 11200);
// 									setTimeout(function () {
// 										that.musicFinalBoss.pause();
// 									}, 11300);
//
// 									setTimeout(function () {
// 										document.querySelector('#audioAlpacino').pause();
// 										document.querySelector('#audioIntroAlpacino').pause();
// 										document.querySelector('#audioWarudo').currentTime = 0;
// 										document.querySelector('#audioWarudo').volume = 1;
// 										document.querySelector('#audioWarudo').play();
// 										controleur.tirEnd();
//
//
// 									}, 11300);
//
//
// 									setTimeout(function () {
// 										that.isFreezed = true;
// 										that._joueur.setIsInCT(true);
// 										that.freezeAll();
// 									}, 15000);
// 									setTimeout(function () {
// 										that._joueur.setVitesse(0);
// 									}, 15000);
// 									setTimeout(function () {
// 										controleur.stopUpdateWeapon();
// 									}, 15000);
// 									setTimeout(function () {
// 										that._bless = true;
// 									}, 15000);
// 									setTimeout(function () {
// 										that.cineBoss = true;
// 									}, 15000);
// 									setTimeout(function () {
// 										cutScene.setTexture(13);
// 									}, 15000);
// 									setTimeout(function () {
// 										cutScene.setTexture(14);
// 										that.freezeAll();
// 									}, 19000);
// 									setTimeout(function () {
// 										that._joueur.setXY(that._largeurPlateau / 2, that._hauteurPlateau / 2 + 30);
// 									}, 19000);
//
// 									setTimeout(function () {that.freezeAll();}, 20000);
// 									setTimeout(function () {that.freezeAll();}, 21000);
// 									setTimeout(function () {that.freezeAll();}, 22000);
// 									setTimeout(function () {that.freezeAll();}, 23000);
// 									setTimeout(function () {
// 										cutScene.setTexture(15);
// 										that.freezeAll();
// 									}, 24000);
//
//
// 									setTimeout(function () {
// 										that.freezeAll();
// 										document.querySelector('#audioAlpacino').pause();
// 										document.querySelector('#audioIntroAlpacino').pause();
// 										document.querySelector('#audioWarudo').pause();
// 										document.querySelector('#audioKamehameha').currentTime = 0;
// 										document.querySelector('#audioKamehameha').volume = 0.9;
// 										document.querySelector('#audioKamehameha').play();
//
// 									}, 25000);
// 									setTimeout(function () {
// 										cutScene.setXY(that._largeurPlateau / 2, elt2.getY());
// 										that.freezeAll();
// 									}, 28000);
// 									setTimeout(function () {
// 										cutScene.setTexture(11);
// 									}, 28000);
// 									setTimeout(function () {
//
// 											that._nbPDV--;
// 											that._nbPDV--;
// 											that._nbPDV--;
// 											that._joueur.setPDV(that._nbPDV);
// 											that._joueur.isDead = true;
// 											that._joueur.anime();
// 										}
// 										, 28000);
// 									setTimeout(function () {
// 										var interv = setInterval(function () {
// 											if (that.kamehameha1) {
// 												cutScene.setTexture(11);
// 											} else {
// 												cutScene.setTexture(12);
// 											}
// 											that.kamehameha1 = !that.kamehameha1;
// 										}, 100);
//
// 										setTimeout(function () {
// 											clearInterval(interv);
// 										}, 4000);
// 									}, 28000);
//
// 									setTimeout(function () {
// 										cutScene.setXY((that._largeurPlateau / 20) * 10, (that._hauteurPlateau / 20) * 4);
// 										cutScene.setTexture(17);
// 									}, 32100);
// 									setTimeout(function () {
// 										that.musicFinalBoss = document.querySelector("#audioPlayerFinalBoss2");
// 										;
// 										that.musicFinalBoss.currentTime = 0;
// 										that.musicFinalBoss.volume = 0.4;
// 										that.musicFinalBoss.play();
// 									}, 34000);
//
// 									setTimeout(function () {
// 										cutScene.setTexture(18);
// 									}, 36000);
// 									setTimeout(function () {
// 										document.querySelector('#audioKamehameha').pause();
// 									}, 37000);
// 									setTimeout(function () {
//
// 											that._joueur.isDead = false;
// 											that._joueur.isLookingBack = true;
// 											that._joueur.anime();
// 										}
// 										, 42000);
//
// 									setTimeout(function () {
// 										cutScene.setTexture(19);
// 									}, 42300);
// 									setTimeout(function () {
// 											that._joueur.isLookingBack = false;
// 											that._joueur.isLookingLeft = true;
// 											that._joueur.anime();
// 										}
// 										, 44000);
// 									setTimeout(function () {
// 										that._joueur.isLookingRight = true;
// 										that._joueur.isLookingLeft = false;
// 										that._joueur.anime();
// 									}, 46000);
// 									setTimeout(function () {
// 										that._joueur.isLookingBack = true;
// 										that._joueur.isLookingRight = false;
// 										that._joueur.anime();
// 									}, 48000);
// 									setTimeout(function () {
// 										that._joueur.isLookingBack = false;
// 										that._joueur.immortal = true;
// 										that.musicFinalBoss.volume = 1;
// 										that._joueur.anime();
// 									}, 51500);
// 									setTimeout(function () {
// 										cutScene.setTexture(16);
// 									}, 51900);
//
// // speech 2 = 8
// //speech 4 = 10
// //kamehameha1 = 11
// //speech 5= 13
// 									setTimeout(function () {
// 										document.querySelector('#audioKamehameha').pause();
// 										that._joueur.setIsInCT(false);
// 										that._joueur.setVitesse(30);
// 										that.cineBoss = false;
// 										that._weapon = 6;
// 										cutScene.setTexture(0);
// 										elt2.setVitesse(1);
// 										elt2.setPDV(that._bossMaxPDV / 2 - 15);
// 										that.lastBossInvu = false;
// 										that.unfreezeAll();
// 										that.isFreezed = false;
// 										that.demarrerDistributionBonus();
// 										controleur.tirBegin();
// 										controleur.startUpdateWeapon();
// 									}, 55000);
//
//
// 								}
// 								element2.activerTexture(4);
//
// 							}
// //speech 12 = 20
// 							if (element2.getPDV() <= (this._bossMaxPDV / 4)) {
//
// 								if(!this.lastBossAnimation2){
//
// 									this.lastBossAnimation2 = true;
// 									var cutScene = this._cutBoss;
// 									cutScene.setTexture(20);
// 									setTimeout(function () { cutScene.setTexture(0); }, 5000);
// 								}
// 								element2.activerTexture(6);
// 							}
// 							if (element2.getPDV() <= (this._bossMaxPDV / 8)) {
// 								if(!this.lastBossAnimation3){
// 									this.lastBossAnimation3 = true;
// 									var cutScene = this._cutBoss;
// 									cutScene.setTexture(20);
// 									setTimeout(function () { cutScene.setTexture(0); }, 5000);
// 								}
// 								setTimeout(function () { cutScene.setTexture(0); }, 5000);
// 							}
// 	                        element2.beginClignotement();
// 	                        if (element2.getPDV() <= 0) {
// 								console.log("phase death");
// 								if(!this.lastBossAnimation4){
// 									this.lastBossAnimation4 = true;
// 									var cutScene = this._cutBoss;
// 									cutScene.setTexture(20);
// 									setTimeout(function () { cutScene.setTexture(0); }, 5000);
// 								}
// 								var cutScene = this._cutBoss;
// 								cutScene.setTexture(22);
// 								setTimeout(function () { cutScene.setTexture(0); }, 4000);
// 	                            this._joueur.immuniser();
// 	                            this._joueur.setVitesse(12);
// 	                            var that = this;
// 	                            var musicBoss = document.querySelector("#audioPlayerExploBoss");
// 	                            musicBoss.play();
// 	                            this._joueur.immortal = false;
// 								that._weapon = 4;
// 	                            setTimeout(function () { musicBoss.play(); }, 200);
// 	                            element2.beginDeath();
// 	                            setTimeout(function () { that.winUltime(); }, 4000);
// 	                        }
// 	                    }
	                    // else if (element instanceof PresseAgrumes && element2 instanceof Abricot) {
						// 	if(this._weaponType != 3){
						//
						// 		//////////////
						// 		this._elementsGraphiques.remove(iElement);
						// 		element2.setPDV(element2.getPDV() - element.degats);
						// 		element2.beginClignotement();
						// 		if (element2.getPDV() <= 0) {
						// 			this._joueur.immuniser();
						// 			var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 			musicBoss.volume = 0.05;
						// 			musicBoss.play();
						// 			element2.beginDeath();
						// 			var that = this;
						// 			setTimeout(function () { that.winAbricot(); }, 1000);
						// 		}
						// 		////////////////
						// 	}
						// 	else
						// 	{
						// 		if(element.notYetExploded){
						// 			element.startExplosion = true;
						// 			setTimeout(function() {
						// 				elt.exploded = false;
						// 				elt.startExplosion = false;
						// 				elt.resetExplosion();
						// 			}, 60);
						//
						// 		}
						// 		else if(element.exploding){
						// 			element.exploded = true;
						// 			var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
						// 			this._elementsGraphiques.add(elementExploded);
						// 			elementExploded.setXY(element.getX(), element.getY());
						// 			elementExploded.setRotation(element.getRotation());
						// 			elementExploded.explode();
						//
						// 			////////////
						// 			this._elementsGraphiques.remove(iElement);
						// 			element2.setPDV(element2.getPDV() - element.degats);
						// 			element2.beginClignotement();
						// 			if (element2.getPDV() <= 0) {
						// 				this._joueur.immuniser();
						// 				var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 				musicBoss.volume = 0.05;
						// 				musicBoss.play();
						// 				element2.beginDeath();
						// 				var that = this;
						// 				setTimeout(function () { that.winAbricot(); }, 1000);
						// 			}
						// 			////////////
						//
						// 			setTimeout(function () { that.eraseTir(); }, 600);
						// 			--iElement;
						// 			--iElement2;
						// 		}
						// 	}
						// 	////////
						//
						//
	                    // }
	                    // else if (element instanceof PresseAgrumes && element2 instanceof Ananas) {
						// 	if(this._weaponType != 3){
						//
						// 		//////////////
						// 		this._elementsGraphiques.remove(iElement);
						// 		element2.setPDV(element2.getPDV() - element.degats);
						// 		element2.beginClignotement();
						// 		if (element2.getPDV() <= 0) {
						// 			this._joueur.immuniser();
						// 			var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 			musicBoss.volume = 0.05;
						// 			musicBoss.play();
						// 			element2.beginDeath();
						// 			var that = this;
						// 			setTimeout(function () { that.winAnanas(); }, 1000);
						// 		}
						// 		////////////////
						// 	}
						// 	else
						// 	{
						// 		if(element.notYetExploded){
						// 			element.startExplosion = true;
						// 			setTimeout(function() {
						// 				elt.exploded = false;
						// 				elt.startExplosion = false;
						// 				elt.resetExplosion();
						// 			}, 60);
						//
						// 		}
						// 		else if(element.exploding){
						// 			element.exploded = true;
						// 			var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
						// 			this._elementsGraphiques.add(elementExploded);
						// 			elementExploded.setXY(element.getX(), element.getY());
						// 			elementExploded.setRotation(element.getRotation());
						// 			elementExploded.explode();
						//
						// 			////////////
						// 			this._elementsGraphiques.remove(iElement);
						// 			element2.setPDV(element2.getPDV() - element.degats);
						// 			element2.beginClignotement();
						// 			if (element2.getPDV() <= 0) {
						// 				this._joueur.immuniser();
						// 				var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 				musicBoss.volume = 0.05;
						// 				musicBoss.play();
						// 				element2.beginDeath();
						// 				var that = this;
						// 				setTimeout(function () { that.winAnanas(); }, 1000);
						// 			}
						// 			////////////
						//
						// 			setTimeout(function () { that.eraseTir(); }, 600);
						// 			--iElement;
						// 			--iElement2;
						// 		}
						// 	}
						// 	////////
						//
						//
	                    // }
	                    // else if (element instanceof PresseAgrumes && element2 instanceof Mangue) {
						// 	if(this._weaponType != 3){
						//
						// 		//////////////
						// 		this._elementsGraphiques.remove(iElement);
						// 		element2.setPDV(element2.getPDV() - element.degats);
						// 		element2.beginClignotement();
						// 		if (element2.getPDV() <= 0) {
						// 			this._joueur.immuniser();
						// 			var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 			musicBoss.volume = 0.05;
						// 			musicBoss.play();
						// 			element2.beginDeath();
						// 			var that = this;
						// 			setTimeout(function () { that.winMangue(); }, 1000);
						// 		}
						// 		////////////////
						// 	}
						// 	else
						// 	{
						// 		if(element.notYetExploded){
						// 			element.startExplosion = true;
						// 			setTimeout(function() {
						// 				elt.exploded = false;
						// 				elt.startExplosion = false;
						// 				elt.resetExplosion();
						// 			}, 60);
						//
						// 		}
						// 		else if(element.exploding){
						// 			element.exploded = true;
						// 			var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
						// 			this._elementsGraphiques.add(elementExploded);
						// 			elementExploded.setXY(element.getX(), element.getY());
						// 			elementExploded.setRotation(element.getRotation());
						// 			elementExploded.explode();
						//
						// 			////////////
						// 			this._elementsGraphiques.remove(iElement);
						// 			element2.setPDV(element2.getPDV() - element.degats);
						// 			element2.beginClignotement();
						// 			if (element2.getPDV() <= 0) {
						// 				this._joueur.immuniser();
						// 				var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 				musicBoss.volume = 0.05;
						// 				musicBoss.play();
						// 				element2.beginDeath();
						// 				var that = this;
						// 				setTimeout(function () { that.winMangue(); }, 1000);
						// 			}
						// 			////////////
						//
						// 			setTimeout(function () { that.eraseTir(); }, 600);
						// 			--iElement;
						// 			--iElement2;
						// 		}
						// 	}
						// 	////////
						//
						//
	                    // }
	                    // else if (element instanceof PresseAgrumes && element2 instanceof Orange) {
						// 	if(this._weaponType != 3){
						//
						// 		//////////////
						// 		this._elementsGraphiques.remove(iElement);
						// 		element2.setPDV(element2.getPDV() - element.degats);
						// 		element2.beginClignotement();
						// 		if (element2.getPDV() <= 0) {
						// 			this._joueur.immuniser();
						// 			var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 			musicBoss.volume = 0.05;
						// 			musicBoss.play();
						// 			element2.beginDeath();
						// 			var that = this;
						// 			setTimeout(function () { that.winOrange(); }, 1000);
						// 		}
						// 		////////////////
						// 	}
						// 	else
						// 	{
						// 		if(element.notYetExploded){
						// 			element.startExplosion = true;
						// 			setTimeout(function() {
						// 				elt.exploded = false;
						// 				elt.startExplosion = false;
						// 				elt.resetExplosion();
						// 			}, 60);
						//
						// 		}
						// 		else if(element.exploding){
						// 			element.exploded = true;
						// 			var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
						// 			this._elementsGraphiques.add(elementExploded);
						// 			elementExploded.setXY(element.getX(), element.getY());
						// 			elementExploded.setRotation(element.getRotation());
						// 			elementExploded.explode();
						//
						// 			////////////
						// 			this._elementsGraphiques.remove(iElement);
						// 			element2.setPDV(element2.getPDV() - element.degats);
						// 			element2.beginClignotement();
						// 			if (element2.getPDV() <= 0) {
						// 				this._joueur.immuniser();
						// 				var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 				musicBoss.volume = 0.05;
						// 				musicBoss.play();
						// 				element2.beginDeath();
						// 				var that = this;
						// 				setTimeout(function () { that.winOrange(); }, 1000);
						// 			}
						// 			////////////
						//
						// 			setTimeout(function () { that.eraseTir(); }, 600);
						// 			--iElement;
						// 			--iElement2;
						// 		}
						// 	}
						// 	////////
						//
						//
	                    // }
	                    // else if (element instanceof PresseAgrumes && element2 instanceof Fraise) {
						// 	if(this._weaponType != 3){
						//
						// 		//////////////
						// 		this._elementsGraphiques.remove(iElement);
						// 		element2.setPDV(element2.getPDV() - element.degats);
						// 		element2.beginClignotement();
						// 		if (element2.getPDV() <= 0) {
						// 			this._joueur.immuniser();
						// 			var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 			musicBoss.volume = 0.05;
						// 			musicBoss.play();
						// 			element2.beginDeath();
						// 			var that = this;
						// 			setTimeout(function () { that.winFraise(); }, 1000);
						// 		}
						// 		////////////////
						// 	}
						// 	else
						// 	{
						// 		if(element.notYetExploded){
						// 			element.startExplosion = true;
						// 			setTimeout(function() {
						// 				elt.exploded = false;
						// 				elt.startExplosion = false;
						// 				elt.resetExplosion();
						// 			}, 60);
						//
						// 		}
						// 		else if(element.exploding){
						// 			element.exploded = true;
						// 			var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
						// 			this._elementsGraphiques.add(elementExploded);
						// 			elementExploded.setXY(element.getX(), element.getY());
						// 			elementExploded.setRotation(element.getRotation());
						// 			elementExploded.explode();
						//
						// 			////////////
						// 			this._elementsGraphiques.remove(iElement);
						// 			element2.setPDV(element2.getPDV() - element.degats);
						// 			element2.beginClignotement();
						// 			if (element2.getPDV() <= 0) {
						// 				this._joueur.immuniser();
						// 				var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 				musicBoss.volume = 0.05;
						// 				musicBoss.play();
						// 				element2.beginDeath();
						// 				var that = this;
						// 				setTimeout(function () { that.winFraise(); }, 1000);
						// 			}
						// 			////////////
						//
						// 			setTimeout(function () { that.eraseTir(); }, 600);
						// 			--iElement;
						// 			--iElement2;
						// 		}
						// 	}
						// 	////////
						//
						//
	                    // }
						// else if (element instanceof PresseAgrumes && element2 instanceof Sangrine) {
						// 	if(this._weaponType != 3){
						//
						// 		//////////////
						// 		this._elementsGraphiques.remove(iElement);
						// 		element2.setPDV(element2.getPDV() - element.degats);
						// 		element2.beginClignotement();
						// 		if (element2.getPDV() <= 0) {
						// 			element2.setTaille(300);
						// 			var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 			musicBoss.volume = 0.05;
						// 			musicBoss.play();
						// 			element2.beginDeath();
						// 			var that = this;
						// 			setTimeout(function () { that.winSangrine(); }, 2000);
						// 		}
						// 		////////////////
						// 	}
						// 	else
						// 	{
						// 		if(element.notYetExploded){
						// 			element.startExplosion = true;
						// 			setTimeout(function() {
						// 				elt.exploded = false;
						// 				elt.startExplosion = false;
						// 				elt.resetExplosion();
						// 			}, 60);
						//
						// 		}
						// 		else if(element.exploding){
						// 			element.exploded = true;
						// 			var elementExploded = this._fabriqueElement.create("presse agrumes explosion");
						// 			this._elementsGraphiques.add(elementExploded);
						// 			elementExploded.setXY(element.getX(), element.getY());
						// 			elementExploded.setRotation(element.getRotation());
						// 			elementExploded.explode();
						//
						// 			////////////
						// 			this._elementsGraphiques.remove(iElement);
						// 			element2.setPDV(element2.getPDV() - element.degats);
						// 			element2.beginClignotement();
						// 			if (element2.getPDV() <= 0) {
						// 				element2.setTaille(300);
						// 				var musicBoss = document.querySelector("#audioPlayerCollapseBoss");
						// 				musicBoss.volume = 0.05;
						// 				musicBoss.play();
						// 				element2.beginDeath();
						// 				var that = this;
						// 				setTimeout(function () { that.winSangrine(); }, 2000);
						// 			}
						// 			////////////
						//
						// 			setTimeout(function () { that.eraseTir(); }, 600);
						// 			--iElement;
						// 			--iElement2;
						// 		}
						// 	}
						// 	////////
						//
						//
						//
						//
						//
						// }

						else if (element instanceof PresseAgrumes && element2 instanceof Pangolino) {
							if(!this.pangolideath){
								this.pangolideath = true;
								this._joueur.setIsInCT(true);
								this.freezeAll();
								this._joueur.setVitesse(0);
								controleur.stopUpdateWeapon();
								controleur.tirEnd();
								clearTimeout(this._timerBonus);
								iElement = this.removeElement(iElement);
								iElement2 = this.removeElement(iElement2);

								this.musicTrash.pause();
								this.musicBoss.pause();
								this.musicFinalBoss.pause();

								document.querySelector("#audioPreDeathPangolino").currentTime = 0;
								document.querySelector("#audioPreDeathPangolino").volume = 1;
								document.querySelector("#audioPreDeathPangolino").play();
								this._cutBoss.setXY(this._largeurPlateau/2, this._hauteurPlateau/2);
								this._cutBoss.setTexture(23);


								setTimeout(function () {
									$('#screamerIMG').show();
									$('#Pangolino').show();
									$('#head').hide();
									$('#infos').hide();

									document.querySelector("#audioPreDeathPangolino").pause();

									document.querySelector("#audioDeathPangolino").currentTime = 0;
									document.querySelector("#audioDeathPangolino").volume = 1;
									document.querySelector("#audioDeathPangolino").play();
								}, 4150);



								var that = this;
								setTimeout(function () {
									$('#screamerIMG').hide();
									$('#Pangolino').hide();
									$('#head').show();
									$('#infos').show();
									that._cutBoss.setTexture(0);
								}, 14000);
								var that = this;
								setTimeout(function () {

									that._joueur.setIsInCT(false);
									that.unfreezeAll();
									that._joueur.setVitesse(12);
									controleur.startUpdateWeapon();
									clearTimeout(this._timerBonus);
									that._nbPDV = 0;
									that._joueur.setPDV(0);
									that.terminer();
								}, 14000);

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
								iElement2 = this.removeElement(iElement2);
	                        }


	                    }
	                    else if (element instanceof FramboiseUltime && (element2 instanceof Munition || element2 instanceof BoostSpeed || element2 instanceof BoostWeapon|| element2 instanceof BoostLife || element2 instanceof BoostShield)) {

							iElement2 = this.removeElement(iElement2);
	                        
	                    }
						else if (element instanceof Peche && element2 instanceof Munition) {
							if (!element.getDead()) {
								iElement2 = this.removeElement(iElement2);
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


						}

	                    else if ((element instanceof Sangrine || element instanceof Mangue || element instanceof Orange || element instanceof Boss || element instanceof Fraise || element instanceof Abricot || element instanceof Ananas) && element2 instanceof Munition) {
	                        this._bossPDV += Math.floor(this._bossMaxPDV / 10);
							iElement2 = this.removeElement(iElement2);
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

	            if(element instanceof PresseAgrumes){
	            	if(element.startExplosion){
	            		element.explode();
						this.soundExplosion();

					}
	            	if(element.exploded){
						// iElement = this.removeElement(iElement);
	            		var that = this;
	            		setTimeout(function() {that.eraseTir();}, 550);
						// this._elementsGraphiques.remove(iElement);
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
					iElement = this.removeElement(iElement);
			}
		}
	}

	eraseTir() {
		for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
			var element = this._elementsGraphiques.get(iElement);
			if (element instanceof PresseAgrumesExplosion) {
				if(element.mustDisappear){
					iElement = this.removeElement(iElement);
				}

			}

			// if(element instanceof PresseAgrumes){
			// 	if(element.hasExploded){
			// 		this._elementsGraphiques.remove(iElement);
			// 	}
			// }


		}
	}
	winBoss() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Boss)) {
				this.combo+=5;
				controleur.updateCombo(this.combo);
				this.superScore += element.pointValue*this.combo;
				controleur.updateScore(this.superScore);
				iElement = this.removeElement(iElement);
	        }
	    }
	}
	winAbricot() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Abricot)) {
				if (element.getPDV() <= 0){
					this.combo+=5;
					controleur.updateCombo(this.combo);
					this.superScore += element.pointValue*this.combo;
					controleur.updateScore(this.superScore);
					iElement = this.removeElement(iElement);
				}
	        }
	    }
	}
	winAnanas() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Ananas)) {
	            if (element.getPDV() <= 0){
					this.combo+=5;
					controleur.updateCombo(this.combo);
					this.superScore += element.pointValue*this.combo;
					controleur.updateScore(this.superScore);
					iElement = this.removeElement(iElement);
				}
	        }
	    }
	}
	winFraise() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Fraise)) {
				if (element.getPDV() <= 0){
					this.combo+=5;
					controleur.updateCombo(this.combo);
					this.superScore += element.pointValue*this.combo;
					controleur.updateScore(this.superScore);
					iElement = this.removeElement(iElement);
				}
	        }
	    }
	}
	winMangue() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Mangue)) {
				if (element.getPDV() <= 0){
					this.combo+=5;
					controleur.updateCombo(this.combo);
					this.superScore += element.pointValue*this.combo;
					controleur.updateScore(this.superScore);
					iElement = this.removeElement(iElement);
				}
	        }
	    }
	}
	winOrange() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Orange)) {
				if (element.getPDV() <= 0){
					this.combo+=5;
					controleur.updateCombo(this.combo);
					this.superScore += element.pointValue*this.combo;
					controleur.updateScore(this.superScore);
					iElement = this.removeElement(iElement);
				}
	        }
	    }
	}
	winSangrine() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (Sangrine)) {
				if (element.getPDV() <= 0){
					this.combo+=5;
					controleur.updateCombo(this.combo);
					this.superScore += element.pointValue*this.combo;
					controleur.updateScore(this.superScore);
					iElement = this.removeElement(iElement);
				}
	        }
	    }
	}
	winUltime() {
	    for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
	        var element = this._elementsGraphiques.get(iElement);
	        if (element instanceof (FramboiseUltime)) {
				if (element.getPDV() <= 0){
					this.combo+=5;
					controleur.updateCombo(this.combo);
					this.superScore += element.pointValue*this.combo;
					controleur.updateScore(this.superScore);
					iElement = this.removeElement(iElement);
				}
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
		textureSol.width = this._largeurPlateau;
		textureSol.height = this._hauteurPlateau;
		var pattern = context.createPattern(textureSol, 'repeat');
		context.fillStyle = pattern;
		context.beginPath();
		context.rect(0, 0, this._largeurPlateau, this._hauteurPlateau);
		context.fill();
	}

	updatePampmousse() {
		if(!this.isFreezed){
			for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
				var element = this._elementsGraphiques.get(iElement);
				if (element instanceof (PampmousseMutant)) {
					if(!element.getDead())
						element.textureAleatoire();
				}
			}
		}

	}


	updatePangolino(){
		if(!this.isFreezed){
			for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
				var element = this._elementsGraphiques.get(iElement);

				if (element instanceof (Pangolino)) {
					element.ChangeText();
				}
			}
		}
	}

	updatePangolinoDir(){
		for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
			var element = this._elementsGraphiques.get(iElement);
			if (element instanceof (Pangolino)) {
				var rad = element.getDirection()-(45*0.0174533);
				var alea = Math.floor(Math.random() * 90) * 0.0174533;
				rad = rad + alea;
				element.setDirection(rad);


			}
		}
	}

	freezeAll(){
		for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
			var element = this._elementsGraphiques.get(iElement);
			if (element instanceof (PampmousseMutant) || element instanceof (miniCerise) || element instanceof Peche || element instanceof Mure || element instanceof Framboise || element instanceof Cassis) {
				element.setVitesse(0);
			}
			if (element instanceof (Sangrine) || element instanceof (Orange) || element instanceof (Mangue) || element instanceof (Boss) || element instanceof (Fraise) || element instanceof Abricot || element instanceof Ananas || element instanceof Citron) {
				element.setVitesse(0);
			}
			if (element instanceof (PresseAgrumes) || element instanceof (BossMunition) || element instanceof (BigMunition)) {
				element.setVitesse(0);
			}
		}
	}

	unfreezeAll(){
		for (var iElement = 0; iElement < this._elementsGraphiques.length() ; ++iElement) {
			var element = this._elementsGraphiques.get(iElement);
			if (element instanceof (PampmousseMutant) || element instanceof (miniCerise) || element instanceof Peche || element instanceof Mure || element instanceof Framboise || element instanceof Cassis) {
				element.setVitesse(element.baseVitesse);
			}
			if (element instanceof (Sangrine) || element instanceof (Orange) || element instanceof (Mangue) || element instanceof (Boss) || element instanceof (Fraise) || element instanceof Abricot || element instanceof Ananas || element instanceof Citron) {
				element.setVitesse(element.baseVitesse);
			}
			if (element instanceof (PresseAgrumes) || element instanceof (BossMunition) || element instanceof (BigMunition)) {
				element.setVitesse(element.baseVitesse);
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
	                    element.setDirection(rad);
	                }
	        }
	    }
	}


}