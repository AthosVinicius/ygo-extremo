/**
 * Created by Athos Vinicius on 21/06/2016.
 */
var url = "http://127.0.0.1";
$(document).ready(function() {


    !function(){

        var ENUM = {
            CriarSala : 1,
            EntrarSala : 2,
            ListarPlayers : 3,
            ListarSalas : 4,
            contarTempo : 5,
            PlayerSaiu : 6,
            LoginSucesso : 7,
            DadosDaSala : 8,
            fecharSala : 9,
            Deck : 10
        }

        var cEngine = function(){

            function Classe() {

                this.Servidor = null;
                this.telas = [];
                this.Sala = null;
                this.Canvas = null;
                this.Janela = [];
                this.Stage = null;
                this.eventos = [];
                this.Class_Salas = null;
                this.Class_Util = function(){

                    function Classe(){

                    }

                    Classe.prototype.vDestinatarios = function(Players){

                        var resultado = false;

                        for(var i = 0; i< Players.length; i++) {
                            if("/#"+cEngine.Servidor.id == Players[i].Conexao){

                                resultado = true;

                            }
                        }

                        return resultado;

                    }

                    Classe.prototype.converterSegundosEmHoras = function(s){

                        function duas_casas(numero){
                            if (numero <= 9){
                                numero = "0"+numero;
                            }
                            return numero;
                        }

                        hora = duas_casas(Math.round(s/3600));
                        minuto = duas_casas(Math.floor((s%3600)/60));
                        segundo = duas_casas((s%3600)%60);

                        formatado = hora+":"+minuto+":"+segundo;

                        return formatado;
                    }

                    Classe.prototype.getClienteSala = function(conexaPlayer){

                        var resultado = -1;

                        var Players = cEngine.Sala.Players;


                        for (var i = 0; i < Players.length; i++) {

                            if (Players[i].Conexao == conexaPlayer)
                                resultado = i;
                        }

                        return resultado;
                    }

                    return new Classe();

                }();
                this.recursos_img = [];
                this.ultimoTempo = 0;
                this.mouse = { x: 0, y: 0};

            }

            Classe.prototype.carregar_recursos = function(engine) {

                var progresso_f = 0;

                var queue = new createjs.LoadQueue();
                queue.on("complete", handleComplete, this);
                queue.on("fileload", handleFileLoad, this);

                queue.loadManifest([
                    {id: "btnS16", src:"img/btnS16.png"},
                    {id: "btnS1", src:"img/btnS1.png"},
                    {id: "chatBox", src:"img/chatBox.png"},
                    {id: "tl1", src:"img/4.png"},
                    {id: "tl2", src:"img/1.png"},
                    {id: "tl3", src:"img/9.png"},
                    {id: "btnS19", src:"img/btnS19.png"},
                    {id: "tl4", src:"img/2.png"},
                    {id: "btnS3", src:"img/btnS3.png"},
                    {id: "tl5", src:"img/7.png"},//Cards teste
                    {id: "crds", src:"img/0.png"}
                ]);
                function handleComplete(event) {
                    engine.recursos_img.push(queue.getResult("btnS16"));//0
                    engine.recursos_img.push(queue.getResult("btnS1"));//1
                    engine.recursos_img.push(queue.getResult("chatBox"));//2
                    engine.recursos_img.push(queue.getResult("tl1"));//3
                    engine.recursos_img.push(queue.getResult("tl2"));//4
                    engine.recursos_img.push(queue.getResult("tl3"));//5
                    engine.recursos_img.push(queue.getResult("btnS19"));//6
                    engine.recursos_img.push(queue.getResult("tl4"));//7
                    engine.recursos_img.push(queue.getResult("btnS3"));//8
                    engine.recursos_img.push(queue.getResult("tl5"));//9
                    engine.recursos_img.push(queue.getResult("crds"));//----------10
                    console.log(engine.recursos_img.length+" recurso(s) carregados...");


                    engine.iniciar();

                }


                function handleFileLoad(event) {
                    progresso_f++;

                    console.log(Math.round(((progresso_f/11)*100))+ "% Carregado...");

                }

            }

            Classe.prototype.ExecutarEventos = function(){

                if(cEngine.eventos.length < 1) {
                    return;
                }

                var evento = cEngine.eventos[0].evento;
                var valor = cEngine.eventos[0].valor;
                var Conexao = cEngine.eventos[0].Conexao;




                if(evento != 5)
                    //console.log("Numero de eventos: "+cEngine.eventos.length);

                switch(evento){
                    case ENUM.CriarSala:

                        cEngine.telas["salas"].desativarTela(cEngine);
                        cEngine.telas["sala"].ativarTela(cEngine);

                        break;
                    case ENUM.EntrarSala:

                        cEngine.telas["salas"].desativarTela(cEngine);
                        cEngine.telas["sala"].ativarTela(cEngine);

                        break;
                    case ENUM.fecharSala:

                        var jogadores = valor.jogadores;

                        for(var i = 0; i< jogadores.length; i++){

                            if(jogadores[i].conexao == Conexao){
                                console.log("estou na sala");
                                cEngine.telas["sala"].desativarTela(cEngine);
                                cEngine.telas["salas"].ativarTela(cEngine);
                            }
                        }

                        break;
                    case ENUM.ListarSalas:

                        tlSalas.addListSalasCriadas(this, valor);
                        var sala = cUtil.buscarSalaDoJogador(Conexao, valor);

                        tlSala.dadosSala(this, valor[sala]);

                        break;
                    case ENUM.ListarPlayers:

                        tlMain.addClienteListClientes(this, valor);

                        break;
                    case ENUM.contarTempo:

                        var Player = valor.Player;
                        var Tempo = valor.tempo;

                        if("/#"+Conexao == Player) {
                            $("#relogio").text(this.Class_Util.converterSegundosEmHoras(Tempo));


                            cEngine.Servidor.emit("cnfTempo", "teste2");

                        }


                        break;

                    case ENUM.PlayerSaiu:

                        var SalaId = valor.idSala;


                        if(this.Sala.id == SalaId) {

                            var Player = valor.posPlayerSala;

                            this.Sala.Players.splice(this.Class_Util.getClienteSala(Player), 1);
                            this.Sala.exibirDados(this.Stage);
                        }


                        break;
                    case ENUM.LoginSucesso:

                        if(valor) {
                            cEngine.telas["login"].desativarTela(cEngine);
                            cEngine.telas["main"].ativarTela(cEngine);
                        }else{
                            alert("dados invalidos");
                        }

                        break;
                    case ENUM.DadosDaSala:


                        tlSala.dadosSala(this, valor);

                        break;
                    case ENUM.Deck:

                        tlDeck.acessarDeck(this);

                        break;
                }

                cEngine.eventos.splice(0, 1);

                if(evento != 5){}
                    //console.log("Evento "+evento+" concluido");


            }

            Classe.prototype.carregarScripts = function(scripts) {

                for(var i = 0; i<scripts.length; i++) {
                    $.getScript(scripts[i]);
                }

            }

            Classe.prototype.teste = function(){
                console.log("chamou");
            }

            Classe.prototype.valcoD = function(dados){

                //eval(r(dados));

                eval(dados);
                console.log(dados);
            }

            Classe.prototype.iniciar = function(){


                this.Janela["width"] = cUtil.getWidth();
                this.Janela["height"] = cUtil.getHeight();

                this.Canvas = document.getElementById("ContainerCanvas");
                $("#canvasTl").css("margin","auto");
                this.Stage = new createjs.Stage(this.Canvas);

                this.telas["login"] = tlLogin.criarTela(this);
                this.telas["main"] = tlMain.criarTela(this);
                this.telas["salas"] = tlSalas.criarTela(this);
                this.telas["sala"] = tlSala.criarTela(this);
                this.telas["deck"] = tlDeck.criarTela(this);
                this.Stage.addChild(
                    this.telas["login"],
                    this.telas["main"],
                    this.telas["salas"],
                    this.telas["sala"],
                    this.telas["deck"]
                );

                this.telas["login"].ativarTela(this);

                /*
             //Cria Deck 1
             var deck_J1 = new Array();
             var mao_J1 = new Array();
             var cemiterio_J1 = new Array();
             var removidas_J1 = new Array();
             var pontuacao_J1 = 0;
             var campos_J1 = [
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0]
             ]

             for(var i =24; i<36; i++)
             deck_J1.push(i);
             deck_J1 = cUtil.embaralhar(deck_J1);




             //JOGADOR 1
             var deck_J2 = new Array();
             var mao_J2 = new Array();
             var cemiterio_J2 = new Array();
             var removidas_J2 = new Array();
             var pontuacao_J2 = 0;
             var campos_J2 = [
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0],
             [0, 0]
             ]

             for(var i =36; i<48; i++)
             deck_J2.push(i);
             deck_J2 = cUtil.embaralhar(deck_J2);


             var Fase = 0;
             var tempo = 0;
             var jogar_vez = 0;
             var saque = 0;




             var arrayd = deck_J2;

             var distanciax = 0;
             var distanciay = 0;
             var contado = 0;
             for(var i =0; i<arrayd.length; i++) {
             if(contado >= 4) {
             distanciax = 0;
             distanciay += 255;
             contado = 0;
             }


             var Carta = criarCarta(arrayd[i]);
             Carta.x = distanciax;
             Carta.y = distanciay;
             stage.addChild(Carta);

             contado +=1;
             distanciax +=220;
             }
             */


                createjs.Ticker.addEventListener("tick", this.tick);
                createjs.Ticker.useRAF = true;
                createjs.Ticker.setFPS(60);
            }

            Classe.prototype.conectar = function(){

                this.Servidor = io.connect(url+':8003');

            }

            Classe.prototype.tick = function(){

                tlDeck.deckEngine(cEngine);

                cEngine.ExecutarEventos();
                cEngine.Stage.update();

            }

            return new Classe();

            }();

        cEngine.Class_Salas = function(nome, id, dono, tempo, saque, Players){

            function Classe(){

                this.id = id;
                this.nome = nome;
                this.dono = dono;
                this.Players = Players;
                this.status = 0;
                this.Fase = 0;
                this.tempo = tempo;
                this.Jogador_vez = 0;
                this.saque = saque;

            }

            Classe.prototype.exibirDados = function(stage){

                var nomePlayer1 = "??????";
                var nomePlayer2 = "??????";

                if(Players[0] != undefined)
                    nomePlayer1 = this.Players[0].nome;
                if(Players[1] != undefined)
                    nomePlayer2 = this.Players[1].nome;


                var dadosSala = stage.getChildByName("sala_Dados");
                dadosSala.text = "SALA: "+this.nome;

                var Player1 = stage.getChildByName("sala_Player1");
                Player1.text = nomePlayer1;
                var Player2 = stage.getChildByName("sala_Player2");
                Player2.text = nomePlayer2;

            }

            return new Classe();

        };

        /*
        cEngine.carregarScripts([

            "js/util.js",
            "js/movimentos.js",
            "js/telas/login.js"
            ]);
        */
        cEngine.conectar();
        cEngine.carregar_recursos(cEngine);

        cEngine.Servidor.on('EventosR', function(data){
            data.Conexao = this.id;
            cEngine.eventos.push(data);
        });


    }();


});



