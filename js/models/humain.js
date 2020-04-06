"use strict";
/**
 * Elément mobile représentant le joueur
 */
class Humain extends ElementMobile
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		//Points de vie du joueur
		this._pointsDeVie = 3;

		//Indique si le joueur est immunisé aux contacts des pampmousses mutants
		this._immunise = false;
		this.isImmune = false;
		this.move1 = false;
		this.move2 = true;
		this.move3 = false;
		this.isLeft = false;
		this.isFront = true;
		this.isRight = false;
		this.isBack = false;
		this.isInCT = false;
		this.isDead = false;
		this.isLookingLeft = false;
		this.isLookingRight = false;
		this.isLookingBack = false;
		this.immortal = false;
		this.immortal_state = false;
		this.name = "Humain";

		this.hasShield = false;

		//Nombre de munitions du joueur
		this._munitions = 0;

		//Timer utilisé pour animer le clignotement du joueur
		this._timerClignotement = null;

		//Timer utilisé pour gérer la durée d'immunisation du joueur
		this._timerImmunisation = null;

	    //Définit les textures à utiliser pour représenter le joueur
		this.ajouterTexture(textureHumainFront);
		this.ajouterTexture(textureHumainFront2);
		this.ajouterTexture(textureHumainFront3);
		this.ajouterTexture(textureHumainFrontShield);
		this.ajouterTexture(textureHumainFrontShield2);
		this.ajouterTexture(textureHumainFrontShield3);
		this.ajouterTexture(textureHumainFrontImmune);
		this.ajouterTexture(textureHumainRight);
		this.ajouterTexture(textureHumainRight2);
		this.ajouterTexture(textureHumainRight3);
		this.ajouterTexture(textureHumainRightShield);//10
		this.ajouterTexture(textureHumainRightShield2);
		this.ajouterTexture(textureHumainRightShield3);
		this.ajouterTexture(textureHumainRightImmune);
		this.ajouterTexture(textureHumainBack);
		this.ajouterTexture(textureHumainBack2);
		this.ajouterTexture(textureHumainBack3);
		this.ajouterTexture(textureHumainBackShield);
		this.ajouterTexture(textureHumainBackShield2);
		this.ajouterTexture(textureHumainBackShield3);
		this.ajouterTexture(textureHumainBackImmune);//20
		this.ajouterTexture(textureHumainLeft);
		this.ajouterTexture(textureHumainLeft2);
		this.ajouterTexture(textureHumainLeft3);
		this.ajouterTexture(textureHumainLeftShield);
		this.ajouterTexture(textureHumainLeftShield2);
		this.ajouterTexture(textureHumainLeftShield3);
		this.ajouterTexture(textureHumainLeftImmune);
		this.ajouterTexture(textureHumainLeftImmune2);
		this.ajouterTexture(textureHumainLeftImmune3);
		this.ajouterTexture(textureHumainFrontImmune2); //30
		this.ajouterTexture(textureHumainFrontImmune3);
		this.ajouterTexture(textureHumainRightImmune2);
		this.ajouterTexture(textureHumainRightImmune3);
		this.ajouterTexture(textureHumainBackImmune2);
		this.ajouterTexture(textureHumainBackImmune3);
		this.ajouterTexture(textureHumainBackImmune3);
		this.ajouterTexture(textureHumainDead);
		this.ajouterTexture(textureHumainImmo1);
		this.ajouterTexture(textureHumainImmo2);
		this.activerTexture(1);

		//Définit la taille du joueur (pour détecter les collisions)
		this.setTaille(25);

		//Définit la vitesse de déplacement du joueur
		this.setVitesse(8);
	}

	/**
	 * Retourne le nombre de points de vie restant au joueur
	 */
	getPointsDeVie()
	{
		return this._pointsDeVie;
	}
	setPDV(pdv) {
	    this._pointsDeVie = pdv;
	}
	/**
	 * Retourne le nombre de munitions du joueur
	 */
	getMunitions()
	{
		return this._munitions;
	}

	/**
	 * Oriente le joueur en direction du point donné
	 * @param coordonnees Coordonnées vers lesquelles on souhaite voir le joueur se déplacer
	 */
	orienterVers(coordonnees)
	{
		if(!this.isInCT) {


			var temp = new Point();
			temp.copier(this.getCoordonnees());
			temp.setX(temp.getX() + 10);
			var that = this;
			this.setDirection(getAngle3Points(this.getCoordonnees(), temp, coordonnees) / 180 * Math.PI);
			this.setRotation(this.getDirection());
			if (!this._immunise  && !this.immortal) {
				if (!this.isRight) {
					if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
						if (!this.hasShield)
							this.activerTexture(8);
						else
							this.activerTexture(11);
						this.isRight = true;
						this.isBack = false;
						this.isFront = false;
						this.isLeft = false;
					}
				}
				if (!this.isBack) {
					if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
						if (!this.hasShield)
							this.activerTexture(1);
						else
							this.activerTexture(4);
						this.isRight = false;
						this.isBack = true;
						this.isFront = false;
						this.isLeft = false;
					}
				}
				if (!this.isLeft) {
					if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
						if (!this.hasShield)
							this.activerTexture(22);
						else
							this.activerTexture(25);
						this.isRight = false;
						this.isBack = false;
						this.isFront = false;
						this.isLeft = true;
					}
				}
				if (!this.isFront) {
					if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
						if (!this.hasShield)
							this.activerTexture(15);
						else
							this.activerTexture(18);
						this.isRight = false;
						this.isBack = false;
						this.isFront = true;
						this.isLeft = false;
					}
				}
			}
		}
	}

	/**
	 * Démarre la phase d'immunité du joueur
	 */
	immuniser()
	{
		clearInterval(this._timerClignotement);
		clearTimeout(this._timerImmunisation);

		this._immunise = true;

		var that = this;
		this._timerClignotement = setInterval(function () { that.clignoter(); }, 100);
		this._timerImmunisation = setTimeout(function () { that.desimmuniser(); }, 3000);
	}

	immuniserBoost()
	{
		clearInterval(this._timerClignotement);
		clearTimeout(this._timerImmunisation);

		this._immunise = true;

		var that = this;
		this._timerClignotement = setInterval(function () { that.clignoter(); }, 100);
		this._timerImmunisation = setTimeout(function () { that.desimmuniser(); }, 15000);
	}

	/**
	 * Termine la phase d'immunité du joueur
	 */
	desimmuniser()
	{
		clearInterval(this._timerClignotement);
		clearTimeout(this._timerImmunisation);

		this._immunise = false;
        if(this.getIndiceTexture != 2)
		    this.activerTexture(0);
	}

	/**
	 * Fait clignoter le joueur (alterne les deux textures du joueur)
	 */
	clignoter()
	{
	    if (!this.isInCT) {
	        if (!this.hasShield) {
	            // if (this.isImmune == true) {
	            //     if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
	            //         this.activerTexture(13);
	            //     }
	            //     if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
	            //         this.activerTexture(6);
	            //     }
	            //     if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
	            //         this.activerTexture(27);
	            //     }
	            //     if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
	            //         this.activerTexture(20);
	            //     }
	            //     this.isImmune = false;
	            // } else {
	            //     if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
	            //         this.activerTexture(7);
	            //     }
	            //     if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
	            //         this.activerTexture(0);
	            //     }
	            //     if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
	            //         this.activerTexture(21);
	            //     }
	            //     if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
	            //         this.activerTexture(14);
	            //     }
	            //     this.isImmune = true;
	            // }

	        }
	    }
	}

	/**
	 * Blesse le joueur -> -1 point de vie, +déclenchement de l'immunité temporaire
	 */
	blesser() {
	    if (!this.estImmunise() && this.estVivant()) {
	        this._pointsDeVie--;
	        if (this._pointsDeVie < 0)
	            this._pointsDeVie = 0;

	        if (this.estVivant())
	            this.immuniser();
	    }

	}
	blesserFort() {
	    if (!this.estImmunise() && this.estVivant()) {
	        this._pointsDeVie--;
	        this._pointsDeVie--;
	        if (this._pointsDeVie < 0)
	            this._pointsDeVie = 0;

	        if (this.estVivant())
	            this.immuniser();
	    }

	}
	

	/**
	 * Retire une munition au joueur
	 */
	tirer()
	{
		if (this.possedeMunitions())
			this._munitions--;
	}

	/**
	 * Ajoute une munition au joueur
	 */
	donnerMunition()
	{
	    this._munitions++;
	    this._munitions++;
	    this._munitions++;
	    this._munitions++;
		this._munitions++;
		this._munitions++;
		this._munitions++;
	}

	/**
	 * Indique si le joueur possède des munitions
	 */
	possedeMunitions()
	{
		return this._munitions > 0;
	}

	/**
	 * Indique si le joueur est vivant (lui reste-t-il des points de vie ?)
	 */
	estVivant()
	{
		return this._pointsDeVie > 0;
	}
	setHasShield(value) {
	    this.hasShield = value;
	}
	/**
	 * Indique si le joueur est invulnérable
	 */
	estImmunise()
	{
		return this._immunise;
	}
	setIsInCT(value) {
	    this.isInCT = value;
	}
	anime() {
        if(!this.isInCT){
	    var that = this;
	    //immunisé
			if(this.immortal){
				this.immortal_state = !this.immortal_state;
				if(this.immortal_state){
					this.activerTexture(38);
				}else{
					this.activerTexture(39);
				}
				// var that = this;
				// setTimeout(function() {that.anime();}, 100);
			}else {
				if (this._immunise) {
					if (this.move1) {
						this.move3 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(13); //right
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(6); //front
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(27); //left
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(20); //back
						}
						setTimeout(function () {
							that.move2 = true;
						}, 60);
					}
					if (this.move2) {
						this.move1 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(32);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(30);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(28);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(34);
						}
						setTimeout(function () {
							that.move3 = true;
						}, 60);
					}
					if (this.move3) {
						this.move2 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(33);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(31);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(29);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(35);
						}
						setTimeout(function () {
							that.move1 = true;
						}, 60);
					}
				}

				//vulnérable
				else {

					if (this.move1) {
						this.move3 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(7);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(0);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(21);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(14);
						}
						setTimeout(function () {
							that.move2 = true;
						}, 60);
					}
					if (this.move2) {
						this.move1 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(8);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(1);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(22);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(15);
						}
						setTimeout(function () {
							that.move3 = true;
						}, 60);
					}
					if (this.move3) {
						this.move2 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(9);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(2);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(23);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(16);
						}
						setTimeout(function () {
							that.move1 = true;
						}, 60);
					}
				}
	    //masque
				if (this.hasShield && !this._immunise) {
					if (this.move1) {
						this.move3 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(10);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(3);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(24);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(17);
						}
						setTimeout(function () { that.move2 = true; }, 60);
					}
					if (this.move2) {
						this.move1 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(11);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(4);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(25);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(18);
						}
						setTimeout(function () { that.move3 = true; }, 60);
					}
					if (this.move3) {
						this.move2 = false;
						if (this.getRotation() > 5.495 || this.getRotation() <= 0.785) {
							this.activerTexture(12);
						}
						if (this.getRotation() > 0.785 && this.getRotation() <= 2.355) {
							this.activerTexture(5);
						}
						if (this.getRotation() > 2.355 && this.getRotation() <= 3.925) {
							this.activerTexture(26);
						}
						if (this.getRotation() > 3.925 && this.getRotation() <= 5.495) {
							this.activerTexture(19);
						}
						setTimeout(function () { that.move1 = true; }, 60);
					}
				}

			}
	    }else if(this.isDead){
			this.activerTexture(37);
		}else if(this.isLookingLeft){
			this.activerTexture(22);
		}else if(this.isLookingRight){
			this.activerTexture(8);
		}else if(this.isLookingBack){
			this.activerTexture(1);
		}else if(this.immortal) {
			this.immortal_state = !this.immortal_state;
			if (this.immortal_state) {
				this.activerTexture(38);
			} else {
				this.activerTexture(39);
			}
		}
	}
}












