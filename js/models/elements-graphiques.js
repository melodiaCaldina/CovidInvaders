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

	animerHumainLeft()
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof Humain)
			{
				element.animerHumainLeft();
			}
			
		}
	}
	animerHumainUp()
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof Humain)
			{
				element.animerHumainUp();
			}
			
		}
	}
	animerHumainRight()
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof Humain)
			{
				element.animerHumainRight();
			}
			
		}
	}
	animerHumainDown()
	{
		for(var iElement = 0; iElement < this.length(); ++iElement)
		{
			var element = this.get(iElement);

			if (element instanceof Humain)
			{
				element.animerHumainDown();
			}
			
		}
	}

	/**
	 * Dessine l'ensemble des élements de la collection
	 * @param context {Canvas2DContext} Context 2D du canvas sur lequel on souhaite dessiner les éléments graphiques
	 */
	dessiner(context)
	{
		for (var iElement = 0; iElement < this.length() ; ++iElement)
		{
			var element = this.get(iElement);
			element.dessiner(context);
		}
	}
}