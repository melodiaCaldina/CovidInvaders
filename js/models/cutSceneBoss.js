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
		this.ajouterTexture(UltimeSpeech2);
		this.ajouterTexture(UltimeSpeech3);
		this.ajouterTexture(UltimeSpeech4);
		this.ajouterTexture(UltimeKamehameha1);
		this.ajouterTexture(UltimeKamehameha2);
		this.ajouterTexture(UltimeSpeech5);
		this.ajouterTexture(UltimeSpeech6);
		this.ajouterTexture(UltimeSpeech7);
		this.ajouterTexture(UltimeSpeech8);
		this.ajouterTexture(UltimeSpeech9);
		this.ajouterTexture(UltimeSpeech10);
		this.ajouterTexture(UltimeSpeech11);
		this.ajouterTexture(UltimeSpeech12);
		this.ajouterTexture(UltimeSpeech13);
		this.ajouterTexture(UltimeSpeech14);
		this.ajouterTexture(PangolinoBig);
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