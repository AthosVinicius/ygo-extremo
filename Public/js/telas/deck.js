/**
 * Created by Atos on 26/01/2017.
 */

var tlDeck = {

    deckInventario: [],
    deckMain: [],
    deckExtra: [],
    deckSide: [],

    criarTela: function(engine){

        var tela = new createjs.Container();
        tela.name = "telaDeck";

        tela.ativarTela = function(engine){
            engine.telas["deck"].visible = true;
        };
        tela.desativarTela = function(engine){
            engine.telas["deck"].visible = false;
        };



        var teste = new createjs.Text("0", "12px Share Tech", "#ffffff");
        teste.name = "teste_txt";
        teste.x = 100;
        teste.y = 97;



        //Legendas
        var Legenda_main = new createjs.Text("MAIN", "16px Share Tech", "#ffffff");
        Legenda_main.name = "Legenda_main_txt";
        Legenda_main.x = 515;
        Legenda_main.y = 90;

        var Legenda_extra = new createjs.Text("EXTRA", "16px Share Tech", "#ffffff");
        Legenda_extra.name = "Legenda_extra_txt";
        Legenda_extra.x = 515;
        Legenda_extra.y = 387;

        var Legenda_side = new createjs.Text("SIDE", "16px Share Tech", "#ffffff");
        Legenda_side.name = "Legenda_side_txt";
        Legenda_side.x = 515;
        Legenda_side.y = 469;



        //Contadores Main
        var crt_total = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_total.name = "crt_total_txt";
        crt_total.x = 808;
        crt_total.y = 97;

        var containerInventario = new createjs.Container();
        containerInventario.name = "containerInventario";

        var containerMain = new createjs.Container();
        containerMain.name = "containerMain";

        var containerExtra = new createjs.Container();
        containerExtra.name = "containerExtra";

        var containerSide = new createjs.Container();
        containerSide.name = "containerSide";


        var superCamada = new createjs.Container();
        superCamada.name = "superCamada";



        //Contadores Inventario
        var crt_total_inventario = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_total_inventario.name = "crt_total_inventario_txt";
        crt_total_inventario.x = 50;
        crt_total_inventario.y = 389;

        //Contadores Main
        var crt_monstro = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_monstro.name = "crt_monstro_txt";
        crt_monstro.x = 855;
        crt_monstro.y = 97;

        var crt_armadilha = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_armadilha.name = "crt_armadilha_txt";
        crt_armadilha.x = 902;
        crt_armadilha.y = 97;

        var crt_magica = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_magica.name = "crt_magica_txt";
        crt_magica.x = 950;
        crt_magica.y = 97;

        //Contadores Extra
        var crt_total_extra = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_total_extra.name = "crt_total_extra_txt";
        crt_total_extra.x = 778;
        crt_total_extra.y = 389;

        var crt_monstro_extra = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_monstro_extra.name = "crt_monstro_extra_txt";
        crt_monstro_extra.x = 825;
        crt_monstro_extra.y = 389;

        var crt_armadilha_extra = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_armadilha_extra.name = "crt_armadilha_extra_txt";
        crt_armadilha_extra.x = 873;
        crt_armadilha_extra.y = 389;

        var crt_magica_extra = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_magica_extra.name = "crt_magica_extra_txt";
        crt_magica_extra.x = 920;
        crt_magica_extra.y = 389;


        //Contadores Side
        var crt_total_side = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_total_side.name = "crt_total_side_txt";
        crt_total_side.x = 778;
        crt_total_side.y = 471;

        var crt_monstro_side = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_monstro_side.name = "crt_monstro_side_txt";
        crt_monstro_side.x = 825;
        crt_monstro_side.y = 471;

        var crt_armadilha_side = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_armadilha_side.name = "crt_armadilha_side_txt";
        crt_armadilha_side.x = 873;
        crt_armadilha_side.y = 471;

        var crt_magica_side = new createjs.Text("0", "12px Share Tech", "#ffffff");
        crt_magica_side.name = "crt_magica_side_txt";
        crt_magica_side.x = 920;
        crt_magica_side.y = 471;






        var bgTela = new createjs.Bitmap(engine.recursos_img[9].currentSrc);
        tela.addChild(bgTela);
        tela.addChild(crt_total_inventario);
        tela.addChild(crt_total);
        tela.addChild(crt_monstro);
        tela.addChild(crt_armadilha);
        tela.addChild(crt_magica);
        tela.addChild(crt_total_extra);
        tela.addChild(crt_monstro_extra);
        tela.addChild(crt_armadilha_extra);
        tela.addChild(crt_magica_extra);
        tela.addChild(crt_total_side);
        tela.addChild(crt_monstro_side);
        tela.addChild(crt_armadilha_side);
        tela.addChild(crt_magica_side);
        tela.addChild(Legenda_main);
        tela.addChild(Legenda_extra);
        tela.addChild(Legenda_side);
        tela.addChild(containerInventario);
        tela.addChild(containerMain);
        tela.addChild(containerExtra);
        tela.addChild(containerSide);
        tela.addChild(teste);
        tela.addChild(superCamada);

        tela.visible = false;

        return tela;
    },

    criarCartaDeck: function(engine, id, local){

        var Carta = new createjs.SpriteSheet({
            images: [engine.recursos_img[10].currentSrc],

            frames: {width: 150, height: 217, regX: 0, regY: 0},

            animations: {
                costas: [0, 0, "costas", 1],
                virar: [0, 5, "virar", 1],
                frente: [id, id, "frente", 1]
            }
        });
        var Carta = new createjs.BitmapAnimation(Carta);
        var tlDeck = this;

        Carta.name = "carta"+id;
        Carta.idCarta = id;
        Carta.status = 0;
        Carta.local = local; //0 - main 1 - extra - 2 side
        Carta.gotoAndPlay("frente");
        Carta.addEventListener("click", function(){
            tlDeck.virarCarta(engine, id);
        });
        Carta.addEventListener("mousedown", function(evt){

            evt.target.status = 1;

            evt.addEventListener("mousemove", function(evt) {

                evt.target.x = (evt.stageX-20);
                evt.target.y = (evt.stageY-20);

                engine.telas['deck']
                    .getChildByName("teste_txt")
                    .text = "Carta X:"+evt.target.x+" Y:"+evt.target.y+" -- "+" Mouse X:"+evt.stageX+" Y:"+evt.stageY;
            });
            evt.addEventListener("mouseup", function(){


                //Add ao Inventário
                if(evt.target.y > 110 && evt.target.y < 546 && evt.target.x > 10 && evt.target.x < 504) {

                    tlDeck.transferirCarta(engine, evt.target, 0);

                }

                //Add ao deck Main
                if(evt.target.y > 110 && evt.target.y < 374 && evt.target.x > 504 && evt.target.x < 970) {

                    tlDeck.transferirCarta(engine, evt.target, 1);

                }

                //Add ao deck Extra
                if(evt.target.y > 380 && evt.target.y < 460 && evt.target.x > 504 && evt.target.x < 970) {

                    tlDeck.transferirCarta(engine, evt.target, 2);

                }

                //Add ao deck Side
                if(evt.target.y > 478 && evt.target.y < 546 && evt.target.x > 504 && evt.target.x < 970) {

                    tlDeck.transferirCarta(engine, evt.target, 3);

                }

                evt.target.status = 0;
            });
        });
        Carta.scaleX = 0.3;
        Carta.scaleY = 0.3;

        return Carta;
    },

    acessarDeck: function(engine){

        engine.telas["main"].desativarTela(engine);
        engine.telas["deck"].ativarTela(engine);

        this.carregarInventario(engine);
        this.carregarMain(engine);
        this.carregarExtra(engine);
        this.carregarSide(engine);

    },

    carregarInventario: function(engine){

        this.deckInventario.push(this.criarCartaDeck(engine, 24, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 25, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 26, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 27, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 28, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 29, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 30, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 31, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 32, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 33, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 34, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 35, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 36, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 37, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 38, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 39, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 40, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 41, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 42, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 43, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 44, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 45, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 46, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 24, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 25, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 26, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 27, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 28, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 29, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 30, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 31, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 32, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 33, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 34, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 35, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 36, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 37, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 38, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 39, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 40, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 41, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 42, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 43, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 44, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 45, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 46, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 24, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 25, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 26, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 27, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 28, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 29, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 30, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 31, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 32, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 33, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 34, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 35, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 36, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 37, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 38, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 39, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 40, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 41, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 42, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 43, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 44, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 45, 0));
        this.deckInventario.push(this.criarCartaDeck(engine, 46, 0));

    },

    carregarMain: function(engine){
    },

    carregarExtra: function(engine){

    },

    carregarSide: function(engine){

    },

    desenharCartasInventario: function(engine){


        var iniHorizontal = 20;
        var iniVertical = 117;
        var espacadorCartaX = 40;
        var totaldeCartas = this.deckInventario.length;

        var posCartaX = iniHorizontal;
        var posCartaY = iniVertical;



        engine.telas['deck']
            .getChildByName("crt_total_inventario_txt")
            .text = this.deckInventario.length;

        engine.telas['deck']
            .getChildByName("containerInventario")
            .removeAllChildren();


        for(var i =0; i<this.deckInventario.length; i++){

            var carta = this.deckInventario[i];

            //Carta que esta sendo movida não é listada
            if(carta.status == 1){

                engine.telas['deck']
                    .getChildByName("containerInventario")
                    .addChild(carta);
                continue;
            }

            carta.x = posCartaX;
            carta.y = posCartaY;



            posCartaX += espacadorCartaX;


            engine.telas['deck']
                .getChildByName("containerInventario")
                .addChild(carta);
        }


    },

    desenharCartasMain: function(engine){


        var iniHorizontal = 505;
        var iniVertical = 117;
        var espacadorCartaX = 40;
        var espacadorCartaY = 65;
        var totaldeCartas = this.deckMain.length;

        if(totaldeCartas < 48){
            totaldeCartas = 60;
        }else {
            if (totaldeCartas > 48) {
                espacadorCartaX = 30;

                if (totaldeCartas > 60) {
                    espacadorCartaX = 30;

                    if (totaldeCartas > 64) {
                        espacadorCartaX = 29;

                        if (totaldeCartas > 68) {
                            espacadorCartaX = 27;

                            if (totaldeCartas > 72) {
                                espacadorCartaX = 24;
                            }
                        }
                    }
                }
            }
        }
        var limitadorColuna = Math.round((totaldeCartas /((totaldeCartas*espacadorCartaX)/480)));

        var posCartaX = iniHorizontal;
        var posCartaY = iniVertical;
        var QuebrarColuna = limitadorColuna;



        engine.telas['deck']
            .getChildByName("crt_total_txt")
            .text = this.deckMain.length;


        engine.telas['deck']
            .getChildByName("containerMain")
            .removeAllChildren();

        for(var i =0; i<this.deckMain.length; i++){

            var carta = this.deckMain[i];

            //Carta que esta sendo movida não é listada
            if(carta.status == 1){

                engine.telas['deck']
                    .addChild(carta);
                continue;
            }

            if(i == QuebrarColuna){
                posCartaY+=espacadorCartaY;
                posCartaX = iniHorizontal;
                QuebrarColuna+=limitadorColuna;
            }

            carta.x = posCartaX;
            carta.y = posCartaY;



            posCartaX += espacadorCartaX;


            engine.telas['deck']
                .getChildByName("containerMain")
                .addChild(carta);
        }


    },

    desenharCartasExtra: function(engine){


        var iniHorizontal = 505;
        var iniVertical = 405;
        var espacadorCartaX = 40;
        var espacadorCartaY = 65;
        var totaldeCartas = this.deckExtra.length;

        if(totaldeCartas < 12){
            totaldeCartas = 12;
        }else {
            if (totaldeCartas > 12) {
                espacadorCartaX = 35;

                if (totaldeCartas > 13) {

                    espacadorCartaX = 30;

                }
            }
        }
        var limitadorColuna = Math.round((totaldeCartas /((totaldeCartas*espacadorCartaX)/480)));

        var posCartaX = iniHorizontal;
        var posCartaY = iniVertical;
        var QuebrarColuna = limitadorColuna;



        engine.telas['deck']
            .getChildByName("crt_total_extra_txt")
            .text = this.deckExtra.length;


        engine.telas['deck']
            .getChildByName("containerExtra")
            .removeAllChildren();

        for(var i =0; i<this.deckExtra.length; i++){

            var carta = this.deckExtra[i];

            //Carta que esta sendo movida não é listada
            if(carta.status == 1){

                engine.telas['deck']
                    .addChild(carta);
                continue;
            }

            if(i == QuebrarColuna){
                posCartaY+=espacadorCartaY;
                posCartaX = iniHorizontal;
                QuebrarColuna+=limitadorColuna;
            }

            carta.x = posCartaX;
            carta.y = posCartaY;



            posCartaX += espacadorCartaX;


            engine.telas['deck']
                .getChildByName("containerExtra")
                .addChild(carta);
        }


    },

    desenharCartasSide: function(engine){


        var iniHorizontal = 505;
        var iniVertical = 488;
        var espacadorCartaX = 40;
        var espacadorCartaY = 65;
        var totaldeCartas = this.deckSide.length;

        if(totaldeCartas < 12){
            totaldeCartas = 12;
        }else {
            if (totaldeCartas > 12) {
                espacadorCartaX = 35;

                if (totaldeCartas > 13) {

                    espacadorCartaX = 30;

                }
            }
        }
        var limitadorColuna = Math.round((totaldeCartas /((totaldeCartas*espacadorCartaX)/480)));

        var posCartaX = iniHorizontal;
        var posCartaY = iniVertical;
        var QuebrarColuna = limitadorColuna;



        engine.telas['deck']
            .getChildByName("crt_total_side_txt")
            .text = this.deckSide.length;


        engine.telas['deck']
            .getChildByName("containerSide")
            .removeAllChildren();

        for(var i =0; i<this.deckSide.length; i++){

            var carta = this.deckSide[i];

            //Carta que esta sendo movida não é listada
            if(carta.status == 1){

                engine.telas['deck']
                    .addChild(carta);
                continue;
            }

            if(i == QuebrarColuna){
                posCartaY+=espacadorCartaY;
                posCartaX = iniHorizontal;
                QuebrarColuna+=limitadorColuna;
            }

            carta.x = posCartaX;
            carta.y = posCartaY;



            posCartaX += espacadorCartaX;


            engine.telas['deck']
                .getChildByName("containerSide")
                .addChild(carta);
        }


    },

    virarCarta: function(engine, id){

        return;
        var carta = engine.telas['deck'].getChildByName("containerMain").getChildByName("carta"+id);

        createjs.Tween.get(carta)
            .call(
            carta.gotoAndPlay,
            ["virar"]
        )
            .wait(90)
            .call(
            carta.gotoAndPlay,
            ["frente"]
        )
    },

    buscarCartaInDeck: function(id, local){

        var deckSelecionado = null;


        if(local == 0) {
            deckSelecionado = this.deckInventario;
        }
        if(local == 1) {
            deckSelecionado = this.deckMain;
        }
        if(local == 2) {
            deckSelecionado = this.deckExtra;
        }
        if(local == 3) {
            deckSelecionado = this.deckSide;
        }


        var resultado = -1;

        for(var i = 0; i< deckSelecionado.length; i++){

            if(deckSelecionado[i].name == "carta"+id){
                resultado =  i;
            }
        }

        return resultado;
    },

    transferirCarta: function (engine, carta, destino) {

        if(destino == 0) {

            if (carta.local == 0) {
            }

            if (carta.local == 1) {
                if (tlDeck.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    tlDeck.deckMain.splice(tlDeck.buscarCartaInDeck(carta.idCarta, carta.local), 2);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckInventario.push(novaCarta);
                }
            }

            if (carta.local == 2) {
                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckExtra.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckInventario.push(novaCarta);
                }
            }

            if (carta.local == 3) {
                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckSide.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckInventario.push(novaCarta);
                }
            }
        }

        if(destino == 1) {

            if(this.deckMain.length >= 60) {
                return;
            }
            if (carta.local == 0) {

                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckInventario.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckMain.push(novaCarta);
                }
            }

            if (carta.local == 1) {
            }

            if (carta.local == 2) {

                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckExtra.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckMain.push(novaCarta);
                }
            }

            if (carta.local == 3) {
                if (tlDeck.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    tlDeck.deckSide.splice(tlDeck.buscarCartaInDeck(carta.idCarta, carta.local), 2);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckMain.push(novaCarta);
                }
            }
        }

        if(destino == 2) {


            if(this.deckExtra.length >= 15) {
                return;
            }
            console.log(carta.local);
            if (carta.local == 0) {
                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckInventario.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckExtra.push(novaCarta);
                }
            }

            if (carta.local == 1) {
                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckMain.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckExtra.push(novaCarta);
                }
            }

            if (carta.local == 2) {
            }

            if (carta.local == 3) {
                if (tlDeck.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    tlDeck.deckSide.splice(tlDeck.buscarCartaInDeck(carta.idCarta, carta.local), 2);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckExtra.push(novaCarta);
                }
            }
        }

        if(destino == 3) {

            if(this.deckSide.length >= 15) {
                return;
            }
            if (carta.local == 0) {
                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckInventario.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckSide.push(novaCarta);
                }
            }

            if (carta.local == 1) {
                if (this.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    this.deckMain.splice(this.buscarCartaInDeck(carta.idCarta, carta.local), 1);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckSide.push(novaCarta);
                }
            }

            if (carta.local == 2) {
                if (tlDeck.buscarCartaInDeck(carta.idCarta, carta.local) >= 0) {
                    tlDeck.deckExtra.splice(tlDeck.buscarCartaInDeck(carta.idCarta, carta.local), 2);

                    var novaCarta = this.criarCartaDeck(engine, carta.idCarta, carta.local);
                    novaCarta.local = destino;
                    this.deckSide.push(novaCarta);
                }
            }

            if (carta.local == 3) {
            }
        }
    },







    deckEngine: function (engine) {

        if(!engine.telas["deck"].visible){
            return;
        }

        this.desenharCartasInventario(engine);
        this.desenharCartasMain(engine);
        this.desenharCartasExtra(engine);
        this.desenharCartasSide(engine);

    }


}