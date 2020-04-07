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
    $("#div-combo").hide();
    $("#div-loading").show();
    $("#div-pause").hide();
    $("#div_tab").hide();
    $("#div_tab_high").hide();
    document.querySelector("#bgvid").volume = 0;
    document.querySelector("#bgvid").play();
    document.querySelector("#bgvid").pause();
    $(document).ready(function() {
        $("#div-loading").hide();
        $("#div-combo").show();
    });
}
$(window).load(main);