"use strict";
/**
 * Collection des éléments graphiques présents sur le jeu
 */
class ElementsGraphiques extends Collection
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super(ElementGraphique);
	}

	/**
	 * Retourne le nombre de pampmousses mutants présents dans la liste
	 */
	getNombrePampmoussesMutants()
	{
		var nbPampmousses = 0;

		for (var iElement = 0; iElement < this.length() ; ++iElement)
		{
		    if (this.get(iElement) instanceof FramboiseUltime || this.get(iElement) instanceof Sangrine || this.get(iElement) instanceof Orange || this.get(iElement) instanceof Mangue || this.get(iElement) instanceof Mure || this.get(iElement) instanceof Framboise || this.get(iElement) instanceof Fraise || this.get(iElement) instanceof Cassis || this.get(iElement) instanceof Cerises || this.get(iElement) instanceof miniCerise || this.get(iElement) instanceof PampmousseMutant || this.get(iElement) instanceof Boss || this.get(iElement) instanceof Abricot || this.get(iElement) instanceof Peche || this.get(iElement) instanceof Ananas || this.get(iElement) instanceof Citron)
		        if (this.get(iElement) instanceof Mure || this.get(iElement) instanceof Framboise || this.get(iElement) instanceof Cerises || this.get(iElement) instanceof miniCerise || this.get(iElement) instanceof Cassis || this.get(iElement) instanceof PampmousseMutant || this.get(iElement) instanceof Peche || this.get(iElement) instanceof Citron) {
		            if (!this.get(iElement).getWin())
		                ++nbPampmousses;
		        }
		    if (this.get(iElement) instanceof FramboiseUltime || this.get(iElement) instanceof Sangrine || this.get(iElement) instanceof Orange || this.get(iElement) instanceof Mangue || this.get(iElement) instanceof Boss || this.get(iElement) instanceof Ananas || this.get(iElement) instanceof Abricot || this.get(iElement) instanceof Fraise)
		        ++nbPampmousses;
		}

		return nbPampmousses;
	}

	/**
	 * Anime l'ensemble des élements de la collection
	 */
	animer()
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof ElementMobile && !(element instanceof Humain))
			{
				element.animer();
			}

		}
	}

	animerScene()
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof ElementMobile && (element instanceof Humain || element instanceof cutSceneBoss || element instanceof FramboiseUltime))
			{
				element.animer();
			}

		}
	}


	animerHumain(Direction)
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof Humain)
			{
				var rotation = 0;
				switch (Direction) {
					case "Left":
						rotation = 3.14159;
					break;
					case "Right":
						rotation = 0;
					break;
					case "Up":
						rotation = 4.71239;
					break;
					case "Down":
						rotation = 1.5708;
					break;
					case "LowerLeft":
						rotation = 2.3561;
					break;
					case "LowerRight":
						rotation = 0.7853;
					break;
					case "UpperLeft":
						rotation = 3.9269;
					break;
					case "UpperRight":
						rotation = 5.4977;
					break;
				}

				element.animerHumain(rotation);
			}
			
		}
	}


	/**
	 * Dessine l'ensemble des élements de la collection
	 * @param context {Canvas2DContext} Context 2D du canvas sur lequel on souhaite dessiner les éléments graphiques
	 */
	dessiner(context)
	{
		var joueur = null;
		for (var iElement = 0; iElement < this.length() ; ++iElement)
		{
			var element = this.get(iElement);
			if(element instanceof Humain){
				joueur = element;
			}else{
				element.dessiner(context);
			}
		}
		joueur.dessiner(context);
	}
}