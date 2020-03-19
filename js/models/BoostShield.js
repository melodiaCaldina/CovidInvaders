"use strict";
/**
 * Elément mobile représentant un pampmousse mutant
 */
class BoostShield extends ElementMobile
{
    
	/**
	 * Constructeur
	 */
    constructor()
	{
	    super();
	    this.ajouterTexture(BoostShieldTexture);
	    this.setVitesse(0);
	    this.setTaille(15);
	    this.setDirection(0);
	}

}