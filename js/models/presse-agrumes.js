"use strict";
/**
 * Presse agrume lancé par la joueur pour détruire les Pampmousses mutants
 */
class PresseAgrumes extends ElementMobile
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super();

		this.baseVitesse = 30;
		this.degats = 1;
		this.notYetExploded = true;
		this.startExplosion = false;
		this.hasExploded = false;
		this.exploded = false;
		this.exploding = false;
		this.name = "tir";

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

		this.setVitesse(30);
		this.setTaille(40);
		this.activerTexture(1);
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
		if(this.notYetExploded){
			this.notYetExploded = false;
			this.startExplosion = false;
			this.exploding = true;
			this.degats = 3;
			this.setTaille(120);
			// this.setVitesse(0);
		}else if(this.exploding){
			this.degats = 0;
			this.exploding = false;
			this.hasExploded = true;
		}


	}

	resetExplosion(){
		this.notYetExploded = true;
		this.startExplosion = false;
		this.exploding = false;
		this.degats = 0;
		this.setTaille(40);
		this.setVitesse(30);
	}

	setDegats(degats){
		if(degats != 3){
			this.degats = degats;
		}else{
			this.degats = 0;
		}
	}
}