"use strict";

var controleur = null;

/**
 * Démarrage de l'application
 */
function main()
{
    controleur = new Controleur();
    $('#screamer').hide();
    $('#screamerIMG').hide();
    $(window).resize(function () { controleur.redimensionner(); });
    window.onkeydown = function (event) { controleur.onKeyDown(event); };
    window.onkeyup = function (event) { controleur.onKeyUp(event); };
}
$(window).load(main);