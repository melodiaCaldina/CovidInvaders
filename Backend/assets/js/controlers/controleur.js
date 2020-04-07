"use strict";

/**
 * Controleur de l'application
 */
class Controleur extends Observateur {
    /**
     * Constructeur
     */
    constructor() {
        super();

        //Vue principale de l'application
        this._vue = new Vue();

        //Gestion du jeu
        this._jeu = new Jeu(this);

        //Timer utilisé pour le refraichissement de l'écran
        this._timerRafraichissement = null;

        //Redimensionne la zone de dessin
        this._tirAbricot = null;
        this._tirFraise = null;
        this._tirMangue = null;
        this._tirAbricot2 = null;
        this._tirSangrine = null;
        this._tirSangrine2 = null;
        this._tirOrange = null;
        this._tirAnanas = null;
        this._tirAnanas2 = null;
        this._tirTrash = null;
        this._tirUltime = null;
        this._tirBoss = null;
        this._AnimeUp = null;
        this._AnimeDown = null;
        this._AnimeLeft = null;
        this._AnimeRight = null;
        this._AnimeUpperRight = null;
        this._AnimeUpperLeft = null;
        this._AnimeLowerRight = null;
        this._AnimeLowerLeft = null;
        this._animePlayer = null;
        this._isMoving = false;
        this._keyDown = false;
        this._keyUp = false;
        this._keyRight = false;
        this._keyLeft = false;
        this._animeWeapon = null;
        this._animepampmousseDir = null;
        this._animeBossDir = null;
        this._animeBossUltimeDir = null;
        this._animePangolinoDir = null;
        this.pseudo = "Machin";
        this.hasStart = false;
        this._IP = "";
        this.isInPause = false;
        this.jeuTermine = false;
        $("#label-combo").hide();
        $("#label-superScore").hide();
        $("#label-Pseudo").hide();
        $("#infos").hide();
        $("#head-weapon").hide();
        $('#div-global').show();
        $.get('https://www.cloudflare.com/cdn-cgi/trace', function (data) {
            controleur.setIP(data.split("ip=")[1].split("ts=")[0])
        });
        this.redimensionner();

        setInterval(function() {
            controleur.setHighTab();

        }, 500);
        this._Move = 0;
        //Affiche l'écran de démarrage


    }

    bless() {
        this._jeu.bless();
    }

    setIP(data) {
        this._IP = data;
    }

    startVideo() {
        this._vue.afficherDebutPartie();

        this.pseudo = $("#textPseudo").val();
        $("#label-Pseudo").text(this.pseudo);
        $("#div-Pseudo").hide();
        document.querySelector("#bgvid").volume = 1;
        document.querySelector("#bgvid").play();
    }

    startUpdateWeapon() {
        this._animeWeapon = setInterval(function () {
            controleur.updateWeaponLevel();
        }, 100);
        this._animepampmousseDir = setInterval(function () {
            controleur.updatePampmousseDir();
        }, 500);
        this._animeBossDir = setInterval(function () {
            controleur.updateBossDir();
        }, 500);
        this._animeBossUltimeDir = setInterval(function () {
            controleur.updateBossUltimeDir();
        }, 500);
    }

    stopUpdateWeapon() {
        clearInterval(this._animeWeapon);
        clearInterval(this._animepampmousseDir);
        clearInterval(this._animeBossDir);
        clearInterval(this._animeBossUltimeDir);
    }

    updateWeaponLevel() {
        this._jeu.animeWeaponLevel();
    }

    updatePlayer(isMoving) {
        this._jeu.animePlayer(isMoving);
    }

    updatePampmousse() {
        this._jeu.updatePampmousse();
    }

    updatePangolino() {
        this._jeu.updatePangolino();
    }

    updatePangolinoDir() {
        this._jeu.updatePangolinoDir();
    }

    updatePampmousseDir() {
        this._jeu.updatePampmousseDir();
    }

    updateBossDir() {
        this._jeu.updateBossDir();
    }

    updateBossUltimeDir() {
        this._jeu.updateBossUltimeDir();
    }

    winBoss() {
        this._jeu.winBoss();
    }

    tirBossBegin() {
        this._jeu.tirBossBegin();
    }

    tirTrashBegin() {
        this._jeu.tirTrashBegin();
    }

    tirBossEnd() {
        clearInterval(this._tirBoss);
    }

    tirBoss() {
        this._tirBoss = setInterval(function () {
            controleur.tirBossBegin();
        }, 3000);
    }

    tirAbricotBegin() {
        this._jeu.tirAbricotBegin();
    }

    popAbricotBegin() {
        this._jeu.popAbricotBegin();
    }

    popOrangeBegin() {
        this._jeu.popOrangeBegin();
    }

    tirAnanasBegin() {
        this._jeu.tirAnanasBegin();
    }

    tirFraiseBegin() {
        this._jeu.tirFraiseBegin();
    }

    tirMangueBegin() {
        this._jeu.tirMangueBegin();
    }

    tirUltimeBegin() {
        var that = this;
        setTimeout(function () {
            that._jeu.tirUltime1();
        }, 1000);
        setTimeout(function () {
            that._jeu.tirUltime2();
        }, 6000);
        setTimeout(function () {
            that._jeu.tirUltime3();
        }, 12000);
        setTimeout(function () {
            that._jeu.tirUltime4();
        }, 18000);
    }

    popAnanasBegin() {
        this._jeu.popAnanasBegin();
    }

    tirSangrineBegin() {
        this._jeu.tirSangrineBegin();
    }

    popSangrineBegin() {
        this._jeu.popSangrineBegin();
    }

    tirAbricotEnd() {
        clearInterval(this._tirAbricot);
        clearInterval(this._popAbricot);
    }

    tirBegin() {
        this._tirAbricot = setInterval(function () {
            controleur.tirAbricotBegin();
        }, 6000);
        this._tirFraise = setInterval(function () {
            controleur.tirFraiseBegin();
        }, 5000);
        this._tirMangue = setInterval(function () {
            controleur.tirMangueBegin();
        }, 4000);
        this._tirAbricot2 = setInterval(function () {
            controleur.popAbricotBegin();
        }, 10000);
        this._tirSangrine = setInterval(function () {
            controleur.tirSangrineBegin();
        }, 3500);
        this._tirSangrine2 = setInterval(function () {
            controleur.popSangrineBegin();
        }, 10000);
        this._tirOrange = setInterval(function () {
            controleur.popOrangeBegin();
        }, 10000);
        this._tirAnanas = setInterval(function () {
            controleur.tirAnanasBegin();
        }, 6000);
        this._tirAnanas2 = setInterval(function () {
            controleur.popAnanasBegin();
        }, 10000);
        this._tirTrash = setInterval(function () {
            controleur.tirTrashBegin();
        }, 5000);
        this.tirUltimeBegin();
        this._tirUltime = setInterval(function () {
            controleur.tirUltimeBegin();
        }, 19000);
        this._tirBoss = setInterval(function () {
            controleur.tirBossBegin();
        }, 3000);
    }

    tirEnd() {
        clearInterval(this._tirAbricot);
        clearInterval(this._tirFraise);
        clearInterval(this._tirMangue);
        clearInterval(this._tirAbricot2);
        clearInterval(this._tirSangrine);
        clearInterval(this._tirSangrine2);
        clearInterval(this._tirOrange);
        clearInterval(this._tirAnanas);
        clearInterval(this._tirAnanas2);
        clearInterval(this._tirTrash);
        clearInterval(this._tirUltime);
        clearInterval(this._tirBoss);

    }

    tirAbricot() {
        this._tirAbricot = setInterval(function () {
            controleur.tirAbricotBegin();
        }, 6000);
        this._popAbricot = setInterval(function () {
            controleur.popAbricotBegin();
        }, 10000);
    }

    tirTrashEnd() {
        clearInterval(this._tirTrash);
    }

    tirTrash() {
        this._tirTrash = setInterval(function () {
            controleur.tirTrashBegin();
        }, 5000);
    }

    /**
     * Fonction de notification appelée par les sujets du controleur
     */
    notifier() {
        //Actualisation de la vue
        this._vue.actualiser(this._jeu);

        //Test permettant de savoir si le jeu est terminé ou s'il continue
        if (this._jeu.estTermine())
            this.terminerJeu();
    }

    /**
     * Redimensionnement les éléments en fonction de la taille de l'écran
     */
    redimensionner() {
        this._vue.redimensionner();
        this._jeu.setDimensionsPlateau(this._vue.getLargeurDessin(), this._vue.getHauteurDessin());
    }

    /**
     * Démarre une nouvelle partie
     */
    commencerNouveauJeu() {
        this.jeuTermine = false;
        $("#div_tab").hide();
        this.hasStart = true;
        setInterval(function () {
            controleur.updatePampmousse();
        }, 1000);
        setInterval(function () {
            controleur.updatePangolino();
        }, 100);
        this._animepampmousseDir = setInterval(function () {
            controleur.updatePampmousseDir();
        }, 500);
        this._animePangolinoDir = setInterval(function () {
            controleur.updatePangolinoDir();
        }, 800);
        this._animeBossDir = setInterval(function () {
            controleur.updateBossDir();
        }, 500);
        this._animeBossUltimeDir = setInterval(function () {
            controleur.updateBossUltimeDir();
        }, 500);
        this._isMoving = true;
        this._animePlayer = setInterval(function () {
            controleur.updatePlayer(true);
        }, 60);
        this._animeWeapon = setInterval(function () {
            controleur.updateWeaponLevel();
        }, 100);
        $("#label-combo").show();
        $("#label-Pseudo").show();
        $("#label-superScore").show();
        $("#infos").show();
        $("#head-weapon").show();
        $("#div_tab_high").show();
        document.querySelector("#bgvid").volume = 0;
        document.querySelector("#bgvid").pause();
        this._vue.masquerBandeaux();
        this._jeu.nouveau();
        this.animer();
    }

    /**
     * Poursuit la partie sur un nouveau niveau
     */
    commencerNiveauSuivant() {
        $("#div_tab").hide();
        this._vue.masquerBandeaux();
        this._jeu.niveauSuivant();
        this.animer();
    }

    updateCombo(value) {
        if (value == 0) {
            $("#label-combo").hide();
        } else {
            $("#label-combo").show();
            $("#label-combo").text("COMBO - " + value);
        }
    }

    updateScore(value) {
        $("#label-superScore").text("SCORE - " + value);

    }

    /**
     * Termine le niveau en cours
     */
    terminerJeu() {
        clearTimeout(this._timerRafraichissement);
        $("#div_tab").show();

        //Gestion de l'affichage en fonction de la manière dont s'est terminé le niveau (gain ou perte)
        if (this._jeu.estGagne()) {
            this._vue.afficherPartieGagnee();
        } else {
            this._vue.afficherPartiePerdue();
            if(!this.jeuTermine){
                $.ajax({
                    url: '/index.php/saveScore',
                    type: 'POST',
                    data: {
                        'ip': this._IP,
                        'name': this.pseudo,
                        'score': this._jeu.superScore,
                        'level': this._jeu.getNiveau(),
                        'screamer': 0
                    },
                    success: function (feature) {
                        console.log('Score enregistrer');
                        controleur.setGlobalTab();
                        controleur.setHighTab();
                    }
                });
                this.jeuTermine = true;
            }

        }
    }

    setGlobalTab(){
        $.ajax({
            url: '/index.php/getScore',
            type: 'GET',
            success: function (feature) {
                var dataAll = feature.split("},{");

                for(var i = 0; i < dataAll.length; i++){
                    switch(i){
                        case 0:
                            $("#td_glo__name_1").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_1").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_1").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 1:
                            $("#td_glo__name_2").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_2").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_2").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 2:
                            $("#td_glo__name_3").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_3").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_3").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 3:
                            $("#td_glo__name_4").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_4").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_4").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 4:
                            $("#td_glo__name_5").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_5").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_5").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 5:
                            $("#td_glo__name_6").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_6").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_6").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 6:
                            $("#td_glo__name_7").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_7").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_7").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 7:
                            $("#td_glo__name_8").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_8").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_8").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 8:
                            $("#td_glo__name_9").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_9").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_9").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 9:
                            $("#td_glo__name_10").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_glo__score_10").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_glo__level_10").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;

                    }
                }

            }
        });
    }

    setHighTab(){
        $.ajax({
            url: '/index.php/getScore',
            type: 'GET',
            success: function (feature) {
                var dataAll = feature.split("},{");

                for(var i = 0; i < dataAll.length; i++){
                    switch(i){
                        case 0:
                            console.log(dataAll[i]);
                            $("#td_high_name_1").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_high_score_1").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_high_level_1").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 1:
                            $("#td_high_name_2").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_high_score_2").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_high_level_2").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;
                        case 2:
                            $("#td_high_name_3").text(dataAll[i].split('nom":"')[1].split('","')[0]);
                            $("#td_high_score_3").text(dataAll[i].split('score":"')[1].split('","')[0]);
                            $("#td_high_level_3").text(dataAll[i].split('"niveau:')[1].replace('}]', ''));
                            break;

                    }
                }

            }
        });
    }




    /**
     * Rafraichissement du jeu toutes les 40 milisecondes
     */
    animer() {
        if (!this.isInPause) {
            this._jeu.animer();
            if (!this._jeu.estTermine())
                this._timerRafraichissement = setTimeout(function () {
                    controleur.animer();
                }, 40);
        }
    }

    animerHumainUp() {

        this._jeu.animerHumain(0);
    }

    animerHumainLeft() {

        this._jeu.animerHumain(1);
    }

    animerHumainDown() {

        this._jeu.animerHumain(2);
    }

    animerHumainRight() {

        this._jeu.animerHumain(3);
    }

    animerHumainUpperRight() {

        this._jeu.animerHumain(4);
    }

    animerHumainUpperLeft() {

        this._jeu.animerHumain(5);
    }

    animerHumainLowerRight() {

        this._jeu.animerHumain(6);
    }

    animerHumainLowerLeft() {

        this._jeu.animerHumain(7);
    }


    /**
     * Gestionnaire d'événement appelé lorsque l'utilisateur clique sur le canvas
     */
    onMouseDown() {
        if (this.hasStart) {
            if (!this._jeu.estTermine())
                this._jeu.tirer();
        }
    }


    /**
     * Gestionnaire d'événement appelé lorsque l'utilisateur bouge la souris au dessus du canvas
     */
    onMouseMove(coordonnees) {
        if (this.hasStart) {
            if (!this._jeu.estTermine())
                this._jeu.orienterJoueurVers(coordonnees);
        }
    }

    updateDirection() {


        if (!this._jeu.estTermine()) {
            var countDir = 0;

            clearInterval(this._animeDown);
            clearInterval(this._animeLeft);
            clearInterval(this._animeRight);
            clearInterval(this._animeUp);
            clearInterval(this._AnimeUpperRight);
            clearInterval(this._AnimeUpperLeft);
            clearInterval(this._AnimeLowerRight);
            clearInterval(this._AnimeLowerLeft);

            if (this._keyDown === true) {
                countDir++;
            }
            if (this._keyLeft === true) {
                countDir++;
            }
            if (this._keyRight === true) {
                countDir++;
            }
            if (this._keyUp === true) {
                countDir++;
            }

            if (countDir == 0 && !this._jeu._joueur.immortal) {
                clearInterval(this._animePlayer);
                this._isMoving = false;
                if (!this._jeu._joueur.immortal)
                    this._animePlayer = setInterval(function () {
                        controleur.updatePlayer(false);
                    }, 60);
                else
                    this._animePlayer = setInterval(function () {
                        controleur.updatePlayer(true);
                    }, 60);
            } else if (countDir == 1) {
                if (this._isMoving == false) {
                    this._isMoving = true;
                    this._animePlayer = setInterval(function () {
                        controleur.updatePlayer(true);
                    }, 60);
                }


                if (this._keyDown === true) {
                    this._animeDown = setInterval(function () {
                        controleur.animerHumainDown();
                    }, 30);
                } else if (this._keyLeft === true) {
                    this._animeLeft = setInterval(function () {
                        controleur.animerHumainLeft();
                    }, 30);
                } else if (this._keyRight === true) {
                    this._animeRight = setInterval(function () {
                        controleur.animerHumainRight();
                    }, 30);
                } else if (this._keyUp === true) {
                    this._animeUp = setInterval(function () {
                        controleur.animerHumainUp();
                    }, 30);
                }
            } else if (countDir == 2) {
                if (this._keyDown === true && this._keyRight) {
                    this._AnimeLowerRight = setInterval(function () {
                        controleur.animerHumainLowerRight();
                    }, 30);
                } else if (this._keyDown === true && this._keyLeft) {
                    this._AnimeLowerLeft = setInterval(function () {
                        controleur.animerHumainLowerLeft();
                    }, 30);
                } else if (this._keyUp === true && this._keyRight) {
                    this._AnimeUpperRight = setInterval(function () {
                        controleur.animerHumainUpperRight();
                    }, 30);
                } else if (this._keyUp === true && this._keyLeft) {
                    this._AnimeUpperLeft = setInterval(function () {
                        controleur.animerHumainUpperLeft();
                    }, 30);
                } else if (this._keyUp === true && this._keyDown) {
                    this._keyUp = false;
                    this._keyDown = false;
                    this.updateDirection();
                } else if (this._keyRight === true && this._keyRight) {
                    this._keyRight = false;
                    this._keyRight = false;
                    this.updateDirection();
                }
            } else if (countDir == 3) {
                if (this._keyUp === true && this._keyDown) {
                    this._keyUp = false;
                    this._keyDown = false;
                    this.updateDirection();
                } else if (this._keyRight === true && this._keyRight) {
                    this._keyRight = false;
                    this._keyRight = false;
                    this.updateDirection();
                }
            } else {
                if (this._keyUp === true && this._keyDown) {
                    this._keyUp = false;
                    this._keyDown = false;
                    this.updateDirection();
                } else if (this._keyRight === true && this._keyRight) {
                    this._keyRight = false;
                    this._keyRight = false;
                    this.updateDirection();
                }
            }

        }

    }


    pause() {
        this.isInPause = true;
        $("#div-pause").show();
    }

    unPause() {
        this.isInPause = false;
        $("#div-pause").hide();
        this.animer();
    }

    onKeyDown(event) {
        if (!this.hasStart) {
            return;
        }
        if (this._jeu instanceof Jeu && event.keyCode == 80) // touche p
            this.pause();
        if (this._jeu instanceof Jeu && event.keyCode == 66)
            this._jeu.Shield();
        if (this._jeu instanceof Jeu && event.keyCode == 87)
            this._jeu.Weapon();
        if (this._jeu instanceof Jeu && event.keyCode == 67)
            this._jeu.Cheat();
        if (this._jeu instanceof Jeu && event.keyCode == 86)
            this._jeu.CheatCombo();

        // if (this._jeu instanceof Jeu && event.keyCode == 80) // touche p
        // 	this._jeu.scream();


        if (this._jeu instanceof Jeu && event.keyCode == 83) { //down
            if (this._keyDown == false) {
                this._keyDown = true;
                this.updateDirection();
            }
        }
        if (this._jeu instanceof Jeu && event.keyCode == 81) { //left
            if (this._keyLeft == false) {
                this._keyLeft = true;
                this.updateDirection();
            }
        }
        if (this._jeu instanceof Jeu && event.keyCode == 90) { //up
            if (this._keyUp == false) {
                this._keyUp = true;
                this.updateDirection();
            }
        }
        if (this._jeu instanceof Jeu && event.keyCode == 68) { //right
            if (this._keyRight == false) {
                this._keyRight = true;
                this.updateDirection();
            }
        }

    }

    onKeyUp(event) {
        if (!this.hasStart) {
            return;
        }
        if (this._jeu instanceof Jeu && event.keyCode == 83) { //down
            this._keyDown = false;
            this.updateDirection();
        }
        if (this._jeu instanceof Jeu && event.keyCode == 81) { //left
            this._keyLeft = false;
            this.updateDirection();
        }
        if (this._jeu instanceof Jeu && event.keyCode == 90) { //up
            this._keyUp = false;
            this.updateDirection();
        }
        if (this._jeu instanceof Jeu && event.keyCode == 68) { //right
            this._keyRight = false;
            this.updateDirection();
        }
    }

    testNewDir(val) {
        if (val == 1) {
            this._animeUpVar = 0;
        }
        if (val == 2) {
            this._animeLeftVar = 0;
        }
        if (this._animeLeftVar == 2) {
            this._animeLeft = setInterval(function () {
                controleur.animerHumainLeft();
            }, 30);
            this._animeLeftb = true;
            if (this._animeUpb) {
                this._animeUpb = false;
                clearInterval(this._animeUp);
            }
            if (this._animeDownb) {
                this._animeDownb = false;
                clearInterval(this._animeDown);
            }
            if (this._animeRightb) {
                this._animeRightb = false;
                clearInterval(this._animeRight);
            }
        }

    }

    ModifOrderMove() {
        if (this._Move == 1) {
            this._animeUpVar = 1;
            if (this._animeLeftVar < 4 && this._animeLeftVar > 0) {
                this._animeLeftVar++;
            }
        }
        if (this._Move == 2) {
            this._animeLeftVar = 1;
            if (this._animeUpVar < 4 && this._animeUpVar != 0) {
                this._animeUpVar++;
            }
        }


    }

}