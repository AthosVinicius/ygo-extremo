/**
 * Created by Atos on 26/01/2017.
 */

var tlSala = {


    criarTela: function(engine){

        var tela = new createjs.Container();
        tela.name = "telaSala";

        tela.ativarTela = function(engine){
            engine.telas["sala"].visible = true;
        };
        tela.desativarTela = function(engine){
            engine.telas["sala"].visible = false;
        };

        var bgTela = new createjs.Bitmap(engine.recursos_img[3].currentSrc);
        tela.addChild(bgTela);


        var btnIniciar = cUtil.criarBotao(engine, 10,540,280,40, 25, "Iniciar", 1, "#ffffff");
        btnIniciar.addEventListener("click", function(){
            engine.Servidor.emit("btnCriarSala","teste2");
        });

        var btnVs = cUtil.criarBotao(engine, 420,390,280,40, 25, "", 8, "");
        btnVs.addEventListener("click", function(){
            engine.Servidor.emit("btnEntrarEmSala","teste2");
        });

        var graphics1 = new createjs.Graphics().beginFill("#000000").drawRect(50, 180, 280, 30);
        var shape1 = new createjs.Shape(graphics1);
        shape1.alpha = 0.5;
        shape1.name = "nomePlayer1";

        var nomePlayer1 = new createjs.Text("----------", "20px Share Tech", "#ffffff");
        nomePlayer1.name = "nomePlayer1_txt";
        nomePlayer1.x = 60;
        nomePlayer1.y = 185;

        var graphics2 = new createjs.Graphics().beginFill("#000000").drawRect(680, 180, 280, 30);
        var shape2 = new createjs.Shape(graphics2);
        shape2.alpha = 0.5;
        shape2.name = "nomePlayer2";

        var nomePlayer2 = new createjs.Text("----------", "20px Share Tech", "#ffffff");
        nomePlayer2.name = "nomePlayer2_txt";
        nomePlayer2.x = 690;
        nomePlayer2.y = 185;


        var btnCancelar = cUtil.criarBotao(engine, 750,540,280,40, 25, "Cancelar", 1, "#ffffff");
        btnCancelar.addEventListener("click", function(){
            engine.telas["sala"].desativarTela(engine);
            engine.telas["salas"].ativarTela(engine);
            engine.Servidor.emit("btnSairDaSala","teste2");
        });

        tela.addChild(btnIniciar);
        tela.addChild(btnVs);
        tela.addChild(btnCancelar);
        tela.addChild(shape1);
        tela.addChild(nomePlayer1);
        tela.addChild(shape2);
        tela.addChild(nomePlayer2);

        tela.visible = false;
        $(".tlSala").css("display","none");

        return tela;
    },

    dadosSala: function(engine, data){


        var nome_player1 = "????";
        var nome_player2 = "????";

        if(data == undefined)
        return;
        if(data.jogadores[0] != undefined)
            nome_player1 = data.jogadores[0].nome;
        if(data.jogadores[1] != undefined)
            nome_player2 = data.jogadores[1].nome;

        engine.telas['sala']
            .getChildByName("nomePlayer1_txt")
            .text = nome_player1;

        engine.telas['sala']
            .getChildByName("nomePlayer2_txt")
            .text = nome_player2;
    }

}