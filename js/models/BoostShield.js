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
		this.type = "Boost";
	    this.ajouterTexture(BoostShieldTexture);
	    this.setVitesse(0);
	    this.setTaille(20);
	    this.setDirection(0);
	}

}