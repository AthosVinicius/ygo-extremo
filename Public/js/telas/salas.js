/**
 * Created by Atos on 26/01/2017.
 */

var tlSalas = {


    criarTela: function(engine){

        var tela = new createjs.Container();
        tela.name = "telaSalas";

        tela.ativarTela = function(engine){
            engine.telas["salas"].visible = true;
            $(".tlSalas").css("display","inline");
        };
        tela.desativarTela = function(engine){
            engine.telas["salas"].visible = false;
            $(".tlSalas").css("display","none");
        };

        var bgTela = new createjs.Bitmap(engine.recursos_img[5].currentSrc);
        tela.addChild(bgTela);


        var btnCriarSala = cUtil.criarBotao(engine, 400,500,280,40, 25, "Criar", 0, "#ffffff");
        btnCriarSala.addEventListener("click", function(){
            engine.Servidor.emit("btnCriarSala","teste2");
        });

        var btnEntrarEmSala = cUtil.criarBotao(engine, 550,500,280,40, 25, "Entrar", 0, "#ffffff");
        btnEntrarEmSala.addEventListener("click", function(){
            engine.Servidor.emit("btnEntrarEmSala","teste2");
        });

        var btnVoltar = cUtil.criarBotao(engine, 700,50,280,40, 25, "Voltar", 1, "#ffffff");
        btnVoltar.addEventListener("click", function(){
            engine.telas["salas"].desativarTela(engine);
            engine.telas["main"].ativarTela(engine);
        });

        tela.addChild(btnCriarSala);
        tela.addChild(btnEntrarEmSala);
        tela.addChild(btnVoltar);


        var listaDeSalas = this.criarListSalas(engine);
        tela.addChild(listaDeSalas);

        tela.visible = false;
        $(".tlSalas").css("display","none");

        return tela;
    },
    criarListSalas: function(engine){

        var tela = new createjs.Container();
        tela.name = "ListaDeSalas";

        var posY = 215;
        for(var i = 0; i< 8; i++) {

            var salaCriada = new createjs.Container();
            salaCriada.name = "salasCriada"+ i;

            var graphics = new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 280, 30);
            var shape = new createjs.Shape(graphics);
            shape.alpha = 0.5;
            shape.name = "salaCriadaBG"+ i;
            salaCriada.addChild(shape);

            var nomeSala = new createjs.Text("----------", "20px Share Tech", "#ffffff");
            nomeSala.name = "salaCriada_txt";
            nomeSala.textAlign = 'center';
            nomeSala.x = 280/2;
            nomeSala.y = 0;
            salaCriada.addChild(nomeSala);


            salaCriada.y = posY;
            salaCriada.x = 400;

            salaCriada.addEventListener("click", function(event){

                engine.telas['salas']
                    .getChildByName("ListaDeSalas")
                    .getChildByName("salasCriadaDados")
                    .getChildByName("nomeDaSala_txt")
                    .text = event.target.getChildByName("salaCriada_txt").text;

                engine.telas['salas']
                    .getChildByName("ListaDeSalas")
                    .getChildByName("salasCriadaDados")
                    .getChildByName("nomeJogador1SalaDados_txt")
                    .text = event.target.Jogador1Nome;

                engine.telas['salas']
                    .getChildByName("ListaDeSalas")
                    .getChildByName("salasCriadaDados")
                    .getChildByName("nomeJogador2SalaDados_txt")
                    .text = event.target.Jogador2Nome;


            });
            salaCriada.addEventListener("mouseover", function(event) {
                event.target.alpha = 0.8;
            });
            salaCriada.addEventListener("mouseout", function(event) {
                event.target.alpha = 1;
            });


            tela.addChild(salaCriada);

            posY+=35;

        }

        var DadosDaSala = new createjs.Container();
        DadosDaSala.name = "salasCriadaDados";

        var graphicsDados = new createjs.Graphics().beginFill("#000000").drawRect(0, 0, 180, 30);
        var shapeDados = new createjs.Shape(graphicsDados);
        shapeDados.alpha = 0.5;
        shapeDados.name = "salasCriadaDadosBG"+ i;
        DadosDaSala.addChild(shapeDados);

        var nomeSalaDados = new createjs.Text("----------", "20px Share Tech", "#ffffff");
        nomeSalaDados.name = "nomeDaSala_txt";
        nomeSalaDados.textAlign = 'center';
        nomeSalaDados.x = 180/2;
        nomeSalaDados.y = 0;
        DadosDaSala.addChild(nomeSalaDados);

        var nomeJogador1SalaDados = new createjs.Text("----------", "20px Share Tech", "#ffffff");
        nomeJogador1SalaDados.name = "nomeJogador1SalaDados_txt";
        nomeJogador1SalaDados.textAlign = 'center';
        nomeJogador1SalaDados.x = 180/2;
        nomeJogador1SalaDados.y = 100;
        DadosDaSala.addChild(nomeJogador1SalaDados);

        var vsSalaDados = new createjs.Text("VS", "20px Share Tech", "#ffffff");
        vsSalaDados.name = "vsSalaDados_txt";
        vsSalaDados.textAlign = 'center';
        vsSalaDados.x = 180/2;
        vsSalaDados.y =150;
        DadosDaSala.addChild(vsSalaDados);

        var nomeJogador2SalaDados = new createjs.Text("----------", "20px Share Tech", "#ffffff");
        nomeJogador2SalaDados.name = "nomeJogador2SalaDados_txt";
        nomeJogador2SalaDados.textAlign = 'center';
        nomeJogador2SalaDados.x = 180/2;
        nomeJogador2SalaDados.y =200;
        DadosDaSala.addChild(nomeJogador2SalaDados);




        DadosDaSala.y = 235;
        DadosDaSala.x = 780;

        tela.addChild(DadosDaSala);


        tela.visible = true;

        return tela;
    },
    addListSalasCriadas: function(engine, data){


        //console.log(data);
        for(var i = 0; i< 8; i++) {

            var SalaNome = "????";
            var Jogador1Nome = "????";
            var Jogador2Nome = "????";
            var statusSala = 0;

            if(data[i] != undefined){
                SalaNome = data[i].nome;

                if(data[i].jogadores[0] != undefined)
                    Jogador1Nome = data[i].jogadores[0].nome;
                if(data[i].jogadores[1] != undefined)
                    Jogador2Nome = data[i].jogadores[1].nome;

            }


            if(statusSala == 1){
                engine.telas['salas']
                    .getChildByName("ListaDeSalas")
                    .getChildByName("salasCriada"+i)
                    .getChildByName("salaCriadaBG"+i)
                    .graphics._fillInstructions[0].params[1] = "#940d0d";
            }

            engine.telas['salas']
                .getChildByName("ListaDeSalas")
                .getChildByName("salasCriada"+i)
                .getChildByName("salaCriada_txt")
                .text = SalaNome;

            engine.telas['salas']
                .getChildByName("ListaDeSalas")
                .getChildByName("salasCriada"+i)
                .Jogador1Nome = Jogador1Nome;

            engine.telas['salas']
                .getChildByName("ListaDeSalas")
                .getChildByName("salasCriada"+i)
                .Jogador2Nome = Jogador2Nome;

        }
    }

}