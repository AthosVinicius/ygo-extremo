/**
 * Created by Atos on 26/01/2017.
 */

var tlLogin = {



    criarTela: function(engine){

        var tela = new createjs.Container();
        tela.name = "telaLogin";

        tela.ativarTela = function(engine){
            engine.telas["login"].visible = true;
            $(".tlLogin").css("display","inline");
        };
        tela.desativarTela = function(engine){
            engine.telas["login"].visible = false;
            $(".tlLogin").css("display","none");
        };

        var bgTela = new createjs.Bitmap(engine.recursos_img[4].currentSrc);
        tela.addChild(bgTela);


        $("#canvasTl").append('<input id="cmpLogin" class="tlLogin" type="text" style="position:absolute;left:65%;top:445px;width:200px;" />');
        $("#canvasTl").append('<input id="cmpSenha" class="tlLogin" type="password" style="position:absolute;left:65%;top:479px;width:200px;" />');

        var btnEntrar = cUtil.criarBotao(engine, 680,520,280,40, 25, "Entrar", 0, "#ffffff");
        btnEntrar.addEventListener("click", function(event){

            var login = $("#cmpLogin").val();
            var Senha = $("#cmpSenha").val();


            engine.Servidor.emit("btnLogin", {login: login, senha: Senha});


        });

        tela.addChild(btnEntrar);

        tela.visible = false;
        $(".tlLogin").css("display","none");

        return tela;
    }

}