/**
 * Created by Atos on 26/01/2017.
 */

var tlMain = {


    criarTela: function(engine){

        var tela = new createjs.Container();
        tela.name = "telaMain";

        tela.ativarTela = function(engine){
            engine.telas["main"].visible = true;
            $(".tlMain").css("display","inline");
        };
        tela.desativarTela = function(engine){
            engine.telas["main"].visible = false;
            $(".tlMain").css("display","none");
        };

        var bgTela = new createjs.Bitmap(engine.recursos_img[7].currentSrc);
        tela.addChild(bgTela);


        var menu = this.criarMenu(engine);
        var clientesConectados = this.criarListClientes(engine);
        tela.addChild(clientesConectados);
        tela.addChild(menu);



        tela.visible = false;
        $(".tlMain").css("display","none");

        return tela;
    },
    criarMenu: function(engine){

        var tela = new createjs.Container();
        tela.name = "MenuMain";

        engine.Stage.enableMouseOver(20);

        var btnCriarSala = cUtil.criarBotao(engine, 20,518,280,40, 20, "Duelar", 0, "#ffffff");
        btnCriarSala.addEventListener("click", function(){
            engine.telas["main"].desativarTela(engine);
            engine.telas["salas"].ativarTela(engine);
        });

        var btnEntrarEmSala = cUtil.criarBotao(engine, 173,518,280,40, 20, "Duelo rapido", 0, "#ffffff");
        btnEntrarEmSala.addEventListener("click", function(){
            engine.Servidor.emit("btnEntrarEmSala","teste2");
        });

        var btn1 = cUtil.criarBotao(engine, 326,518,280,40, 20, "Decks", 6, "#ffffff");
        btn1.addEventListener("click", function(){
            engine.Servidor.emit("btnTelaDeck","teste2");
        });

        var btn2 = cUtil.criarBotao(engine, 480,518,280,40, 20, "Configuracoes", 6, "#ffffff");
        btn1.addEventListener("click", function(){
        });

        var btnOnline = cUtil.criarBotao(engine, 853,518,280,40, 20, "Players", 0, "#ffffff");
        btnOnline.addEventListener("click", function(){

            if(engine.telas['main'].getChildByName("ListaClientesOnline").visible) {
                engine.telas['main']
                    .getChildByName("ListaClientesOnline")
                    .visible = false;
            }else{
                engine.telas['main']
                    .getChildByName("ListaClientesOnline")
                    .visible = true;
            }
        });

        var tbnSair = cUtil.criarBotao(engine, 700,40,280,40, 25, "Logout", 1, "#ffffff");
        tbnSair.addEventListener("click", function(){
            location.reload();
        });

        tela.addChild(btnCriarSala);
        tela.addChild(btnEntrarEmSala);
        tela.addChild(btn1);
        tela.addChild(btn2);
        tela.addChild(btnOnline);
        tela.addChild(tbnSair);




        tela.visible = true;
        $(".tlMain").css("display","inline");

        tela.x = 0;

        return tela;
    },
    criarListClientes: function(engine){

        var tela = new createjs.Container();
        tela.name = "ListaClientesOnline";


        var chatBox = new createjs.Bitmap("img/chatBox.png");
        chatBox.x = 665;
        chatBox.y = 50;
        tela.addChild(chatBox);

        var graphics = new createjs.Graphics().beginFill("#464646").drawRect(690,160, 300, 350);
        var shape = new createjs.Shape(graphics);
        //shape.alpha = 0.2;
        tela.addChild(shape);
        var graphics2 = new createjs.Graphics().beginFill("#000000").drawRect(695,165, 295, 350);
        var shape2 = new createjs.Shape(graphics2);
        //shape2.alpha = 0.2;
        tela.addChild(shape2);

        var posY = 165;
        for(var i = 0; i< 10; i++) {

            var clienteOnline = new createjs.Container();
            clienteOnline.name = "clienteOnline"+ i;

            var graphics = new createjs.Graphics().beginFill("#a3e29c").drawRect(0, 0, 280, 30);
            var shape = new createjs.Shape(graphics);
            shape.name = "clienteOnlineBG"+ i;
            clienteOnline.addChild(shape);

            var nomeCliente = new createjs.Text("----------", "20px Share Tech", "#ffffff");
            nomeCliente.name = "clienteOnline_txt"+i;
            nomeCliente.textAlign = 'center';
            nomeCliente.x = 280/2;
            nomeCliente.y = 0;
            clienteOnline.addChild(nomeCliente);


            clienteOnline.y = posY;
            clienteOnline.x = 700;

            clienteOnline.addEventListener("click", function(event){
                alert(event.target.name);
            });
            clienteOnline.addEventListener("mouseover", function(event) {
                event.target.alpha = 0.8;
            });
            clienteOnline.addEventListener("mouseout", function(event) {
                event.target.alpha = 1;
            });


            tela.addChild(clienteOnline);

            posY+=35;

        }


        tela.visible = false;

        return tela;
    },
    addClienteListClientes: function(engine, data){


        //console.log(data);
        for(var i = 0; i< 10; i++) {

            var PlayerNome = "????";
            var ConexaoPlayer = "????";
            var statusPlayer = 0;

            if(data[i] != undefined){
                PlayerNome = data[i].nome;
                ConexaoPlayer = data[i].conexao;
                statusPlayer = data[i].status;
            }


            if(statusPlayer == 1){
                engine.telas['main']
                    .getChildByName("ListaClientesOnline")
                    .getChildByName("clienteOnline"+i)
                    .getChildByName("clienteOnlineBG"+i)
                    .graphics._fillInstructions[0].params[1] = "#940d0d";
            }else{
                engine.telas['main']
                    .getChildByName("ListaClientesOnline")
                    .getChildByName("clienteOnline"+i)
                    .getChildByName("clienteOnlineBG"+i)
                    .graphics._fillInstructions[0].params[1] = "#a3e29c";
            }

            engine.telas['main']
                .getChildByName("ListaClientesOnline")
                .getChildByName("clienteOnline"+i)
                .getChildByName("clienteOnline_txt"+i)
                .text = PlayerNome;

        }
    },

}