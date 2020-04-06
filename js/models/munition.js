"use strict";
/**
 * Elément graphique représentant une munition
 */
class Munition extends ElementGraphique
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();
		this.name = "Munition";
		this.setTaille(10);
		this.ajouterTexture(texturePresseAgrumes);
	}
}