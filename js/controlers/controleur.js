"use strict";

/**
 * Controleur de l'application
 */
class Controleur extends Observateur
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		//Vue principale de l'application
		this._vue = new Vue();

		//Gestion du jeu
		this._jeu = new Jeu(this);

		//Timer utilisé pour le refraichissement de l'écran
		this._timerRafraichissement = null;

		//Redimensionne la zone de dessin
		this.redimensionner();
		this._tirAbricot = null;
		this._tirFraise = null;
		this._tirMangue = null;
		this._tirAbricot2 = null;
		this._tirSangrine = null;
		this._tirSangrine2 = null;
		this._tirOrange = null;
		this._tirAnanas = null;
		this._tirAnanas2 = null;
		this._tirTrash = null;
		this._tirUltime = null;
		this._tirBoss = null;
		this._AnimeUp = null;
		this._animeUpb = false;
		this._animeUpVar = 0;
		this._AnimeDown = null;
		this._animeDownb = false;
		this._animeDownVar = 0;
		this._AnimeLeft = null;
		this._animeLeftb = false;
		this._animeLeftVar = 0;
		this._AnimeRight = null;
		this._animeRightb = false;
		this._animeRightVar = 0;
		this._Move = 0;
		//Affiche l'écran de démarrage
		this._vue.afficherDebutPartie();
		setInterval(function () { controleur.updatePampmousse(); }, 1000);
		setInterval(function () { controleur.updatePampmousseDir(); }, 500);
		setInterval(function () { controleur.updateBossDir(); }, 500);
		setInterval(function () { controleur.updateBossUltimeDir(); }, 500);
		setInterval(function () { controleur.updatePlayer(); }, 60);
		setInterval(function () { controleur.updateWeaponLevel(); }, 100);
		document.querySelector("#bgvid").volume = 0;
		document.querySelector("#bgvid").play();
		
	}
    bless() {
        this._jeu.bless();
    }

    updateWeaponLevel() {
        this._jeu.animeWeaponLevel();
    }
    updatePlayer() {
        this._jeu.animePlayer();
    }
    updatePampmousse() {
        this._jeu.updatePampmousse();
    }
    updatePampmousseDir() {
        this._jeu.updatePampmousseDir();
    }
    updateBossDir() {
        this._jeu.updateBossDir();
    }
    updateBossUltimeDir() {
        this._jeu.updateBossUltimeDir();
    }
    winBoss() {
        this._jeu.winBoss();
    }
    tirBossBegin() {
        this._jeu.tirBossBegin();
    }
    
    tirTrashBegin() {
        this._jeu.tirTrashBegin();
    }
    tirBossEnd() {
        clearInterval(this._tirBoss);
    }
    tirBoss() {
        this._tirBoss = setInterval(function () { controleur.tirBossBegin(); }, 3000);
    }

    tirAbricotBegin() {
        this._jeu.tirAbricotBegin();
    }
    popAbricotBegin() {
        this._jeu.popAbricotBegin();
    }

    popOrangeBegin() {
        this._jeu.popOrangeBegin();
    }
    tirAnanasBegin() {
        this._jeu.tirAnanasBegin();
    }
    tirFraiseBegin() {
        this._jeu.tirFraiseBegin();
    }
    tirMangueBegin() {
        this._jeu.tirMangueBegin();
    }

    tirUltimeBegin() {
        var that = this;
        setTimeout(function () { that._jeu.tirUltime1(); }, 1000);
        setTimeout(function () { that._jeu.tirUltime2(); }, 6000);
        setTimeout(function () { that._jeu.tirUltime3(); }, 12000);
        setTimeout(function () { that._jeu.tirUltime4(); }, 18000);
    }

    popAnanasBegin() {
        this._jeu.popAnanasBegin();
    }

    tirSangrineBegin() {
        this._jeu.tirSangrineBegin();
    }
    popSangrineBegin() {
        this._jeu.popSangrineBegin();
    }

    tirAbricotEnd() {
        clearInterval(this._tirAbricot);
        clearInterval(this._popAbricot);
    }

    tirBegin() {
        this._tirAbricot = setInterval(function () { controleur.tirAbricotBegin(); }, 6000);
        this._tirFraise = setInterval(function () { controleur.tirFraiseBegin(); }, 5000);
        this._tirMangue = setInterval(function () { controleur.tirMangueBegin(); }, 4000);
        this._tirAbricot2 = setInterval(function () { controleur.popAbricotBegin(); }, 10000);
        this._tirSangrine = setInterval(function () { controleur.tirSangrineBegin(); }, 3500);
        this._tirSangrine2 = setInterval(function () { controleur.popSangrineBegin(); }, 10000);
        this._tirOrange = setInterval(function () { controleur.popOrangeBegin(); }, 10000);
        this._tirAnanas = setInterval(function () { controleur.tirAnanasBegin(); }, 6000);
        this._tirAnanas2 = setInterval(function () { controleur.popAnanasBegin(); }, 10000);
        this._tirTrash = setInterval(function () { controleur.tirTrashBegin(); }, 5000);
        this._tirUltime = setInterval(function () { controleur.tirUltimeBegin(); }, 19000);
        this._tirBoss = setInterval(function () { controleur.tirBossBegin(); }, 3000);
    }
    tirEnd() {
        clearInterval(this._tirAbricot);
        clearInterval(this._tirFraise);
        clearInterval(this._tirMangue);
        clearInterval(this._tirAbricot2);
        clearInterval(this._tirSangrine);
        clearInterval(this._tirSangrine2);
        clearInterval(this._tirOrange);
        clearInterval(this._tirAnanas);
        clearInterval(this._tirAnanas2);
        clearInterval(this._tirTrash);
        clearInterval(this._tirUltime);
        clearInterval(this._tirBoss);

    }

    tirAbricot() {
        this._tirAbricot = setInterval(function () { controleur.tirAbricotBegin(); }, 6000);
        this._popAbricot = setInterval(function () { controleur.popAbricotBegin();},10000);
    }
    
    tirTrashEnd() {
        clearInterval(this._tirTrash);
    }
    tirTrash() {
        this._tirTrash = setInterval(function () { controleur.tirTrashBegin(); }, 5000);
    }
	/**
	 * Fonction de notification appelée par les sujets du controleur
	 */
	notifier()
	{
		//Actualisation de la vue
		this._vue.actualiser(this._jeu);

		//Test permettant de savoir si le jeu est terminé ou s'il continue
		if(this._jeu.estTermine())
			this.terminerJeu();
	}

	/**
	 * Redimensionnement les éléments en fonction de la taille de l'écran
	 */
	redimensionner()
	{
		this._vue.redimensionner();
		this._jeu.setDimensionsPlateau(this._vue.getLargeurDessin(), this._vue.getHauteurDessin());
	}

	/**
	 * Démarre une nouvelle partie
	 */
	commencerNouveauJeu()
	{
		this._vue.masquerBandeaux();
		this._jeu.nouveau();
		this.animer();
	}

	/**
	 * Poursuit la partie sur un nouveau niveau
	 */
	commencerNiveauSuivant()
	{
		this._vue.masquerBandeaux();
		this._jeu.niveauSuivant();
		this.animer();
	}

	/**
	 * Termine le niveau en cours
	 */
	terminerJeu()
	{
		clearTimeout(this._timerRafraichissement);

		//Gestion de l'affichage en fonction de la manière dont s'est terminé le niveau (gain ou perte)
		if (this._jeu.estGagne())
			this._vue.afficherPartieGagnee();
		else
			this._vue.afficherPartiePerdue();
	}

	/**
	 * Rafraichissement du jeu toutes les 40 milisecondes
	 */
	animer()
	{
		
		this._jeu.animer();
		if(!this._jeu.estTermine())
			this._timerRafraichissement = setTimeout(function () { controleur.animer(); }, 40);
	}
	animerHumainUp()
	{
		
		this._jeu.animerHumain(0);
	}
	animerHumainLeft()
	{
		
		this._jeu.animerHumain(1);
	}
	animerHumainDown()
	{
		
		this._jeu.animerHumain(2);
	}
	animerHumainRight()
	{
		
		this._jeu.animerHumain(3);
	}

	/**
	 * Gestionnaire d'événement appelé lorsque l'utilisateur clique sur le canvas
	 */
	onMouseDown()
	{
		if(!this._jeu.estTermine())
			this._jeu.tirer();
	}


	/**
	 * Gestionnaire d'événement appelé lorsque l'utilisateur bouge la souris au dessus du canvas
	 */
	onMouseMove(coordonnees)
	{
		if (!this._jeu.estTermine())
			this._jeu.orienterJoueurVers(coordonnees);
	}

	onKeyDown(event) 
	{
	    if (this._jeu instanceof Jeu && event.keyCode == 80)
	        this._jeu.scream();
	    if (this._jeu instanceof Jeu && event.keyCode == 66)
	        this._jeu.Shield();
	    if (this._jeu instanceof Jeu && event.keyCode == 87)
	        this._jeu.Weapon();
	    if (this._jeu instanceof Jeu && event.keyCode == 67)
	        this._jeu.Cheat();
	    if (this._jeu instanceof Jeu && event.keyCode == 83){
	    	if(this._animeDownb == false)
	    		{
	    			this._animeDown = setInterval(function () { controleur.animerHumainDown(); }, 30);
	    			this._animeDownb = true;
	    			if(this._animeUpb)
	    				{
	    					this._animeUpb = false;
	    					clearInterval(this._animeUp);
	    				}
	    			if(this._animeLeftb)
	    				{
	    					this._animeLeftb = false;
	    					clearInterval(this._animeLeft);
	    				}
	    			if(this._animeRightb)
	    				{
	    					this._animeRightb = false;
	    					clearInterval(this._animeRight);
	    				}
	    		}
	    }
	    if (this._jeu instanceof Jeu && event.keyCode == 81){
	    	if(this._animeLeftb == false)
	    		{
	    			this._animeLeft = setInterval(function () { controleur.animerHumainLeft(); }, 30);
	    			this._Move = 2;
	    			this.ModifOrderMove();
	    			this._animeLeftb = true;
	    			if(this._animeUpb)
	    				{
	    					this._animeUpb = false;
	    					clearInterval(this._animeUp);
	    				}
	    			if(this._animeDownb)
	    				{
	    					this._animeDownb = false;
	    					clearInterval(this._animeDown);
	    				}
	    			if(this._animeRightb)
	    				{
	    					this._animeRightb = false;
	    					clearInterval(this._animeRight);
	    				}
	    		}
	    }
	    if (this._jeu instanceof Jeu && event.keyCode == 90){
	    	if(this._animeUpb == false)
	    		{
	    			this._animeUp = setInterval(function () { controleur.animerHumainUp(); }, 30);
	    			this._Move = 1;
	    			this.ModifOrderMove();
	    			this._animeUpb = true;
	    			if(this._animeLeftb)
	    				{
	    					this._animeLeftb = false;
	    					clearInterval(this._animeLeft);
	    				}
	    			if(this._animeDownb)
	    				{
	    					this._animeDownb = false;
	    					clearInterval(this._animeDown);
	    				}
	    			if(this._animeRightb)
	    				{
	    					this._animeRightb = false;
	    					clearInterval(this._animeRight);
	    				}
	    		}
	    }
	    if (this._jeu instanceof Jeu && event.keyCode == 68){
	    	if(this._animeRightb == false)
	    		{
	    			this._animeRight = setInterval(function () { controleur.animerHumainRight(); }, 30);
	    			this._animeRightb = true;
	    			if(this._animeUpb)
	    				{
	    					this._animeUpb = false;
	    					clearInterval(this._animeUp);
	    				}
	    			if(this._animeDownb)
	    				{
	    					this._animeDownb = false;
	    					clearInterval(this._animeDown);
	    				}
	    			if(this._animeLeftb)
	    				{
	    					this._animeLeftb = false;
	    					clearInterval(this._animeLeftb);
	    				}
	    		}
	    }
	    
	}

	onKeyUp(evt) {
	    if (this._jeu instanceof Jeu && evt.keyCode == 83)
	        {
	    	this._animeDownb = false;
	    	clearInterval(this._animeDown);
	    	this.testNewDir(3);
	    	}
	    if (this._jeu instanceof Jeu && evt.keyCode == 81)
	        {
	    	this._animeLeftb = false;
	    	clearInterval(this._animeLeft);
	    	this.testNewDir(2);
	    	}
	    if (this._jeu instanceof Jeu && evt.keyCode == 90)
	    	{
	    	this._animeUpb = false;
	    	clearInterval(this._animeUp);
	    	this.testNewDir(1);
	    	}
	    if (this._jeu instanceof Jeu && evt.keyCode == 68)
	        {
	    	this._animeRightb = false;
	    	clearInterval(this._animeRight);
	    	this.testNewDir(4);
	    	}
	}
	
	testNewDir(val) {
		if(val == 1){
			this._animeUpVar = 0;
		}
		if(val == 2){
			this._animeLeftVar = 0;
		}
		if(this._animeLeftVar == 2) {
			this._animeLeft = setInterval(function () { controleur.animerHumainLeft(); }, 30);
	    			this._animeLeftb = true;
	    			if(this._animeUpb)
	    				{
	    					this._animeUpb = false;
	    					clearInterval(this._animeUp);
	    				}
	    			if(this._animeDownb)
	    				{
	    					this._animeDownb = false;
	    					clearInterval(this._animeDown);
	    				}
	    			if(this._animeRightb)
	    				{
	    					this._animeRightb = false;
	    					clearInterval(this._animeRight);
	    				}
		}
		
	}

	ModifOrderMove() {
		if(this._Move==1) {
			this._animeUpVar = 1;
			if(this._animeLeftVar<4 && this._animeLeftVar>0) {
				this._animeLeftVar++;
			}
		}
		if(this._Move==2) {
			this._animeLeftVar = 1;
			if(this._animeUpVar<4 && this._animeUpVar!=0) {
				this._animeUpVar++;
			}
		}


	}
	
}