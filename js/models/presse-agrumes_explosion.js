"use strict";
/**
 * Presse agrume lancé par la joueur pour détruire les Pampmousses mutants
 */
class PresseAgrumesExplosion extends ElementMobile
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		this.baseVitesse = 0;

		this.mustDisappear = false;

		/*
		* dans gérer collision :
		* au début du check, si c'est un presse agrume ->
		* passer de startToExplode a exploding
		* et de exploding a hasExploded
		*
		* dégats uniquement durant exploding
		*
		* (créer une fonction dans le presse agrume qui change le statut et qui set les dégats)
		*
		* quand il recontre un mob -> start to explode a true
		*
		* logiquement ca marche bien
		*
		* plus animation du boom a prévoir
		*
		*
		 */
		this.ajouterTexture(WeaponTexture2);
		this.ajouterTexture(WeaponTexture);
		this.ajouterTexture(textureWeapon_type_2);
		this.ajouterTexture(textureWeapon_type_3);
		this.ajouterTexture(anime_weapon3_1);
		this.ajouterTexture(anime_weapon3_2);
		this.ajouterTexture(anime_weapon3_3);
		this.ajouterTexture(anime_weapon3_4);
		this.ajouterTexture(anime_weapon3_5);
		this.ajouterTexture(anime_weapon3_6);
		this.ajouterTexture(anime_weapon3_7);

		this.setVitesse(0);
		this.setTaille(20);
		this.activerTexture(3);
	}

	/**
	 * Animation du presse agrume
	 */
	animer()
	{
		//A chaque appel le presse agrume tourne de 6 degres

		super.animer();
	}


	explode(){
		var that = this;
			setTimeout(function() {that.activerTexture(4); that.animer();}, 50);
			setTimeout(function() {that.activerTexture(5); that.animer();}, 100);
			setTimeout(function() {that.activerTexture(6); that.animer();}, 150);
			setTimeout(function() {that.activerTexture(7); that.animer();}, 200);
			setTimeout(function() {that.activerTexture(8); that.animer();}, 250);
			setTimeout(function() {that.activerTexture(9); that.animer();}, 300);
		setTimeout(function() {that.activerTexture(10); that.animer();}, 350);
		setTimeout(function() {that.mustDisappear = true;}, 500);

	}

}