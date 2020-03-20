"use strict";
/**
 *peche
 */
class cutSceneBoss extends ElementMobile {

	/**
	 * Constructeur
	 */
	constructor() {
		super();
		this.nbPDV = 99999999999999999;
		this.isDead = false;
		this.mustDisappear = false;
		this.isWin = false;
		this.ajouterTexture(textureVide);
		this.ajouterTexture(sangrineSpeech);
		this.ajouterTexture(BossAppearTexture);
		this.ajouterTexture(AbricotSpeech);
		this.ajouterTexture(fraiseSpeech);
		this.ajouterTexture(mangueSpeech);
		this.ajouterTexture(orangeSpeech);
		this.ajouterTexture(UltimeSpeech);
		this.activerTexture(0);
		this.setTaille(200);
		this.setDirection(0);
	}

	setTexture(text){
		this.activerTexture(text);
	}

	getPDV() {
		return this.nbPDV;
	}
	setPDV(value) {
		this.nbPDV = value;
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
}