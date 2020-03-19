"use strict";
/**
 * Extension d'un élément graphique lui permettant de se déplacer
 */
class ElementMobile extends ElementGraphique
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		//Direction de l'élément (en radians)
		this._direction = 0;

		//Vitesse de déplacement
		this._vitesse = 0;
	}

	/**
	 * Setters
	 */
	setDirection(value) { this._direction = value; if(!this instanceof Boss)this.setRotation(value);}
	setVitesse(value) { this._vitesse = value; }

	/**
	 * Getters
	 */
	getDirection() { return this._direction; }
	getVitesse() { return this._vitesse; }

	/**
	 * Indique si l'élément appelant touche l'élément fourni en paramètre
	 * @param element Element avec lequel on souhaite tester une collision
	 * @return Retourne true si une collision est détectée, false sinon
	 */
	touche(element)
	{
		return (this.getX() - this.getTaille() / 2 < element.getX() + element.getTaille() / 2 &&
		   this.getX() + this.getTaille() / 2 > element.getX() - element.getTaille() / 2 &&
		   this.getY() - this.getTaille() / 2 < element.getY() + element.getTaille() / 2 &&
		   this.getY() + this.getTaille() / 2 > element.getY() - element.getTaille() / 2);
	}

	/**
	 * Déplace l'élement à chaque appel
	 */
	animer()
	{
		//Déplacement selon la direction et la vitesse de l'élément
		var newCoordonnees = new Point();
		newCoordonnees.copier(this.getCoordonnees());
		newCoordonnees.setX(newCoordonnees.getX() + this.getVitesse());
		newCoordonnees.tourner(this.getCoordonnees(), this.getDirection());

		this.setXY(newCoordonnees.getX(), newCoordonnees.getY());
	}
	animerHumainUp()
	{
		//Déplacement selon la direction et la vitesse de l'élément
		var newCoordonnees = new Point();
		newCoordonnees.copier(this.getCoordonnees());
		newCoordonnees.setX(newCoordonnees.getX() + this.getVitesse());
		newCoordonnees.tourner(this.getCoordonnees(), 4.71239);
		this.setXY(newCoordonnees.getX(), newCoordonnees.getY());
	}
	animerHumainLeft()
	{
		//Déplacement selon la direction et la vitesse de l'élément
		var newCoordonnees = new Point();
		newCoordonnees.copier(this.getCoordonnees());
		newCoordonnees.setX(newCoordonnees.getX() + this.getVitesse());
		newCoordonnees.tourner(this.getCoordonnees(), 3.14159);
		this.setXY(newCoordonnees.getX(), newCoordonnees.getY());
	}
	animerHumainRight()
	{
		//Déplacement selon la direction et la vitesse de l'élément
		var newCoordonnees = new Point();
		newCoordonnees.copier(this.getCoordonnees());
		newCoordonnees.setX(newCoordonnees.getX() + this.getVitesse());
		newCoordonnees.tourner(this.getCoordonnees(), 0);
		this.setXY(newCoordonnees.getX(), newCoordonnees.getY());
	}
	animerHumainDown()
	{
		//Déplacement selon la direction et la vitesse de l'élément
		var newCoordonnees = new Point();
		newCoordonnees.copier(this.getCoordonnees());
		newCoordonnees.setX(newCoordonnees.getX() + this.getVitesse());
		newCoordonnees.tourner(this.getCoordonnees(), 1.5708);
		this.setXY(newCoordonnees.getX(), newCoordonnees.getY());
	}
	
}