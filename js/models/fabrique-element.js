"use strict";
/**
 * Fabrique des éléments graphiques du jeu
 */
class FabriqueElement
{
	/**
	 * Constructeur
	 */
	constructor()
	{

	}

	/**
	 * Crée un élément graphique du type donné
	 */
	create(typeElement)
	{
		var element = null;

		switch(typeElement)
		{
			case 'humain':
				element = new Humain();
				break;
			case 'cutSceneBoss':
				element = new cutSceneBoss();
				break;
			case 'pampmousse mutant':
				element = new PampmousseMutant();
				break;
			case 'munition':
				element = new Munition();
				break;
		    case 'presse agrumes':
		        element = new PresseAgrumes();
		        break;
		    case 'Boss':
		        element = new Boss();
		        break;
		    case 'BossMunition':
		        element = new BossMunition();
		        break;
            case 'BoostShield':
		            element = new BoostShield();
		            break;
		    case 'BoostSpeed':
		        element = new BoostSpeed();
		        break;
		    case 'BoostLife':
		        element = new BoostLife();
		        break;
		    case 'BoostWeapon':
		        element = new BoostWeapon();
		        break;
		    case 'weaponLevel':
		        element = new weaponLevel();
		        break;
            case 'Abricot':
                element = new Abricot();
                break;
            case 'peche':
                element = new Peche();
                break;
            case 'ananas':
                element = new Ananas();
                break;
            case 'fraise':
                element = new Fraise();
                break;
            case 'framboise':
                element = new Framboise();
                break;
            case 'mangue':
                element = new Mangue();
                break;
            case 'orange':
                element = new Orange();
                break;
		    case 'sangrine':
		        element = new Sangrine();
		        break;
            case 'mure':
                element = new Mure();
                break;
            case 'cassis':
                element = new Cassis();
                break;
            case 'cerise':
                element = new Cerises();
                break;
            case 'ultime':
                element = new FramboiseUltime();
                break;
            case 'minicerise':
                element = new miniCerise();
                break;
            case 'citron':
                element = new Citron();
                break;
		    case 'BigMunition':
		        element = new BigMunition();
		        break;
            case 'oeuf':
		            element = new Oeuf();
		            break;
			default:
				throw "Type d'élément inconuu.";
		}

		return element;
	}
}