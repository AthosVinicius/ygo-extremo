function cUtil() {

  var statusDesenvolvedor = false;

  function Util(){}

    Util.prototype.ativarElemento = function (id) {

    $("#" + id).removeAttr("disabled");

  }

    Util.prototype.criarBotao = function(engine, x, y, w, h, size, txt, img, CTxt){

        var botao = new createjs.Container();
        var imgBtn = new createjs.Bitmap(engine.recursos_img[img].currentSrc);

        botao.addChild(imgBtn);

      var criarSala = new createjs.Text(txt, size+"px Share Tech", CTxt);
      criarSala.name = "btn"+txt;

      criarSala.x = (engine.recursos_img[img].width / 2);
      criarSala.textAlign = 'center';
      criarSala.y = (engine.recursos_img[img].height / 2) - (size / 2);

      botao.addChild(criarSala);

      botao.addEventListener("mouseover", function() {
        botao.alpha = 0.8;
        //botao.children[0].graphics._fillInstructions[0].params[1] = Chover;
      });
      botao.addEventListener("mouseout", function() {
        botao.alpha = 1;
        //botao.children[0].graphics._fillInstructions[0].params[1] = Cnormal;
      });
      botao.x = x;
      botao.y = y;

      return botao;
    }

    Util.prototype.desativarElemento = function (id) {
      $("#" + id).attr("disabled", "disabled");
    }

    Util.prototype.buscarChaveEmArrayBi = function (nome, dados) {

      for(var i = 0; i< dados.length; i++)
        if(dados[i][0] == nome)
          return i;

    }

    Util.prototype.getWidth = function () {
      if (typeof( window.innerWidth ) == 'number') {
        return window.innerWidth;
      } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
        return document.documentElement.clientWidth;
      } else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {
        return document.body.clientWidth;
      }
    }

    Util.prototype.getHeight = function () {
      if (typeof( window.innerWidth ) == 'number') {
        return window.innerHeight;
      } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
        return document.documentElement.clientHeight;
      } else if (document.body && ( document.body.clientHeight || document.body.clientHeight )) {
        return document.body.clientHeight;
      }
    }

    Util.prototype.gNAle = function(n1,n2){
      return Math.floor(Math.random() * (n2- n1+ 1) + n1);
    }

    Util.prototype.areaDoElemento = function(obj, x1, x2, y1, y2,comentario){
      var distanciaXInicial = calcularDistanciaN(x1,obj.x);
      var distanciaXFinal = calcularDistanciaN(x2, obj.x);
      var distanciaYInicial = calcularDistanciaN(obj.y, y1);
      var distanciaYFinal = calcularDistanciaN(y2, obj.y);


      //console.log("Falta Y("+distanciaYInicial+"/"+distanciaYFinal+") X("+distanciaXInicial+"/"+distanciaXFinal+")");

      if(distanciaXInicial <0 && distanciaXFinal >0 && distanciaYInicial >0 && distanciaYFinal <0){

        //console.log("Dentro da area "+comentario);
        return true;

      }else{
        //console.log("Fora da area "+comentario);
        return false;
      }

    }

    Util.prototype.areaCenarioColidir = function(obj, x1, x2, y1, y2,comentario){

      var distanciaXInicial = (calcularDistanciaN(x1,obj.x)-obj.spriteSheet._frameWidth);
      var distanciaXFinal = (calcularDistanciaN(x2, obj.x)-obj.spriteSheet._frameWidth);
      var distanciaYInicial = calcularDistanciaN(y1, (obj.y+obj.spriteSheet._frameHeight));
      var distanciaYFinal = (calcularDistanciaN(y2, obj.y)-obj.spriteSheet._frameHeight);


      if(distanciaXInicial <0 && distanciaXFinal >0 && distanciaYInicial <0 && distanciaYFinal >0){

        //console.log("Dentro da area "+comentario);
        return true;

      }else{
        //console.log("Fora da area "+comentario);
        return false;
      }

    }

    Util.prototype.areaCenarioEntrar = function(obj, x1, x2, y1, y2,comentario){

      var distanciaXInicial = calcularDistanciaN(x1,obj.x);
      var distanciaXFinal = (calcularDistanciaN(x2, obj.x)-obj.spriteSheet._frameWidth);
      var distanciaYInicial = calcularDistanciaN(y1, (obj.y+obj.spriteSheet._frameHeight));
      var distanciaYFinal = (calcularDistanciaN(y2, obj.y)-obj.spriteSheet._frameHeight);

      if(distanciaXInicial <0 && distanciaXFinal >0 && distanciaYInicial <0 && distanciaYFinal >0){

        //console.log("Dentro da area "+comentario);
        return true;

      }else{
        //console.log("Fora da area "+comentario);
        return false;
      }

    }

    Util.prototype.embaralhar = function(array) {
      var tmp, current, top = array.length;

      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }

      return array;
    }

    Util.prototype.criarRetangulo = function(nome, cor, coordenadas, opacidade){

      var retangulo = new createjs.Shape();
      retangulo.name = nome;
      retangulo.graphics.beginFill(cor).drawRect(coordenadas[0],coordenadas[1],coordenadas[2],coordenadas[3]);
      retangulo.alpha = opacidade;

      return retangulo;
    }

    Util.prototype.getBounds = function(obj) {
      var bounds={x:Infinity,y:Infinity,width:0,height:0};

      if ( obj instanceof createjs.Container ) {
        var children = object.children, l=children.length, cbounds, c;
        for ( c = 0; c < l; c++ ) {
          cbounds = getBounds(children[c]);
          if ( cbounds.x < bounds.x ) bounds.x = cbounds.x;
          if ( cbounds.y < bounds.y ) bounds.y = cbounds.y;
          if ( cbounds.width > bounds.width ) bounds.width = cbounds.width;
          if ( cbounds.height > bounds.height ) bounds.height = cbounds.height;
        }
      } else {
        var gp,imgr;
        if ( obj instanceof createjs.Bitmap ) {
          gp = obj.localToGlobal(0,0);
          imgr = {width:obj.image.width,height:obj.image.height};
        } else if ( obj instanceof createjs.BitmapAnimation ) {
          gp = obj.localToGlobal(0,0);
          imgr = obj.spriteSheet._frames[obj.currentFrame].rect;
        } else {
          return bounds;
        }

        bounds.width = (imgr.width-10) * Math.abs(obj.scaleX);
        if ( obj.scaleX >= 0 ) {
          bounds.x = gp.x;
        } else {
          bounds.x = gp.x - bounds.width;
        }

        bounds.height = (imgr.height) * Math.abs(obj.scaleY);
        if ( obj.scaleX >= 0 ) {
          bounds.y = gp.y;
        } else {
          bounds.y = gp.y - bounds.height;
        }
      }

      return bounds;
    }

    Util.prototype.calcularDistancia = function(obj1, obj2){

      var Elemento1 = obj1.GetSet(6);
      var Elemento2 = obj2.GetSet(6);
      var colisao = {
          x1_1: 0,
          y11: 0,
          x1_2: 0,
          y1_2: 0
      };

      colisao.x1_1 = Elemento2.x - Elemento1.x;
      colisao.y11 = Elemento1.y - Elemento2.y;
      colisao.x1_2 = (Elemento2.x+Elemento2.spriteSheet._frameWidth) - Elemento1.x;
      colisao.y1_2 = Elemento2.y - (Elemento1.y+Elemento1.spriteSheet._frameHeight);

      if(colisao.y1_2 ==0 && colisao.x1_1 < 0 && colisao.x1_2 >= 0){
        console.log("Colidiu os pes em "+Elemento2.nome+".");
        console.log("1x-"+colisao.x1_1+"; 1y-"+colisao.y11+"; 2x-"+colisao.x1_2+"; 2y-"+colisao.y1_2);

        return true;
      }


    }

    Util.prototype.calcularColisao = function(obj){

      var colidiveis = this.getArrayColidivel(obj);
      var elemento;

      for(var i = 0; i< colidiveis.length; i++){
        elemento = colidiveis[i];

        if(this.calcularDistancia(obj, elemento))
          return [true, 2];
      }

    }

    Util.prototype.getArrayColidivel = function(obj){

      var elemento1 = obj.GetSet(6);
      var colidiveis = elemento1.colisao.elementos;
      var elementosCenario = cFase.getVariavel("elementosCenario");
      var arrayRetorno = [];

      for(var n = 0; n<colidiveis.length; n++) {
        for (var i = 0; i < elementosCenario.length; i++) {
          if (colidiveis[n] == elementosCenario[i].GetSet(6).tipo)
            arrayRetorno.push(elementosCenario[i]);
        }
      }

      return arrayRetorno;

    }

    Util.prototype.calculateCollision = function(obj, direcao, colidiveis, moveBy) {

      moveBy = moveBy || {x:0,y:0};


      if ( direcao != 'x' && direcao != 'y' ) {
        direcao = 'x';
      }

      var measure = direcao == 'x' ? 'width' : 'height',
          oppositeDirection = direcao == 'x' ? 'y' : 'x',
          oppositeMeasure = direcao == 'x' ? 'height' : 'width',

          bounds = this.getBounds(obj),
          cbounds,
          collision = null,
          tipo = null,
          tipo2 = null,
          cc = 0;

      while ( !collision && cc < colidiveis.length ) {

        var temp_collideables = colidiveis[cc].GetSet(6);

        cbounds = this.getBounds(temp_collideables);
        if ( temp_collideables.isVisible ) {
          collision = this.calculateIntersection(bounds, cbounds, moveBy.x, moveBy.y);
        }

        if ( !collision && temp_collideables.isVisible ) {

          var wentThroughForwards  = ( bounds[direcao] < cbounds[direcao] && bounds[direcao] + moveBy[direcao] > cbounds[direcao] ),
              wentThroughBackwards = ( bounds[direcao] > cbounds[direcao] && bounds[direcao] + moveBy[direcao] < cbounds[direcao] ),
              withinOppositeBounds = !(bounds[oppositeDirection]+bounds[oppositeMeasure] < cbounds[oppositeDirection])
                  && !(bounds[oppositeDirection] > cbounds[oppositeDirection]+cbounds[oppositeMeasure]);

          if ( (wentThroughForwards || wentThroughBackwards) && withinOppositeBounds ) {
            moveBy[direcao] = cbounds[direcao] - bounds[direcao];
          } else {
            cc++;
          }
        }else{
          tipo = colidiveis[cc];
          tipo2 = colidiveis[cc].GetSet(6);
        }
      }

      if ( collision ) {
        var sign = Math.abs(moveBy[direcao]) / moveBy[direcao];
        moveBy[direcao] -= collision[measure] * sign;
      }

      var colisaoCompleta = [];
      colisaoCompleta.push(collision,tipo2,tipo);

      return colisaoCompleta;
    }

    Util.prototype.calculateIntersection = function(rect1, rect2, x, y) {
      // prevent x|y from being null||undefined
      x = x || 0; y = y || 0;

      // first we have to calculate the
      // center of each rectangle and half of
      // width and height
      var dx, dy, r1={}, r2={};
      r1.cx = rect1.x+x+(r1.hw = (rect1.width /2));
      r1.cy = rect1.y+y+(r1.hh = (rect1.height/2));
      r2.cx = rect2.x + (r2.hw = (rect2.width /2));
      r2.cy = rect2.y + (r2.hh = (rect2.height/2));

      dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
      dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);

      if (dx < 0 && dy < 0) {
        return {width:-dx,height:-dy};
      } else {
        return null;
      }
    }

    Util.prototype.ativarModoDesenvolvedor = function(){
      statusDesenvolvedor = true;

    }

    Util.prototype.desativarModoDesenvolvedor = function(){
      statusDesenvolvedor = false;
    }

    Util.prototype.getStatusModoDesenvolvedor = function(){
      return statusDesenvolvedor;
    }

    Util.prototype.DesenvolvedorInfo = function(){

      if(!statusDesenvolvedor)
        return;

      var fundo = new createjs.Shape();
      fundo.graphics.beginFill("#000000").drawRect(495, 55, 180, 150);
      fundo.name = "fundoinfo_dev";
      fundo.alpha = 0.5;


      //Titulo / Fps
      var info0 = new createjs.Text("???:  ","14px Arial", "#FFFFFF");
      info0.name = "info0_dev";
      info0.x = 560;
      info0.y = 60;

      //Personagem
      var info1 = new createjs.Text("???::  ","14px Arial", "#ff7700");
      info1.name = "info1_dev";
      info1.x = 500;
      info1.y = 80;

      //Velocidade
      var info2 = new createjs.Text("???::  ","14px Arial", "#ff7700");
      info2.name = "info2_dev";
      info2.x = 500;
      info2.y = 100;

      //Frames
      var info4 = new createjs.Text("???:  ","14px Arial", "#ff7700");
      info4.name = "info4_dev";
      info4.x = 500;
      info4.y = 120;
      //Frames
      var info5 = new createjs.Text("???:  ","14px Arial", "#ff7700");
      info5.name = "info5_dev";
      info5.x = 500;
      info5.y = 140;

      //Animacao
      var info6 = new createjs.Text("???:  ","14px Arial", "#ff7700");
      info6.name = "info6_dev";
      info6.x = 500;
      info6.y = 160;

      //Cenario
      var info3 = new createjs.Text("???:  ","14px Arial", "#ff7700");
      info3.name = "info3_dev";
      info3.x = 500;
      info3.y = 180;

      cFase.getVariavel("stage").getChildByName("informacoes").addChild(info0);
      cFase.getVariavel("stage").getChildByName("informacoes").addChild(fundo);
      cFase.getVariavel("stage").getChildByName("informacoes").addChild(info1);
      cFase.getVariavel("stage").getChildByName("informacoes").addChild(info2);
      cFase.getVariavel("stage").getChildByName("informacoes").addChild(info3);
      cFase.getVariavel("stage").getChildByName("informacoes").addChild(info4);
      cFase.getVariavel("stage").getChildByName("informacoes").addChild(info5);
      cFase.getVariavel("stage").getChildByName("informacoes").addChild(info6);

    }

    Util.prototype.DesenvolvedorInfoUpdate = function(){

      if(!statusDesenvolvedor)
        return;

      var informacaoes_camada = cFase.getVariavel("stage").getChildByName("informacoes");
      var Cenario = cFase.getVariavel("stage").getChildByName("cenario1");
      var Personagem = Cenario.getChildByName("Player");
      var info0 = informacaoes_camada.getChildByName("info0_dev");
      var info1 = informacaoes_camada.getChildByName("info1_dev");
      var info2 = informacaoes_camada.getChildByName("info2_dev");
      var info3 = informacaoes_camada.getChildByName("info3_dev");
      var info4 = informacaoes_camada.getChildByName("info4_dev");
      var info5 = informacaoes_camada.getChildByName("info5_dev");
      var info6 = informacaoes_camada.getChildByName("info6_dev");

      info0.text = "FPS: "+Math.round(createjs.Ticker.getMeasuredFPS());
      info1.text = Personagem.nome+": X " + Personagem.x+" Y "+Personagem.y;
      info2.text = "Velocidade: X " + Personagem.velocidade.x+" Y "+Personagem.velocidade.y;
      info3.text = Cenario.name+": X " + Cenario.x+" Y "+Cenario.y;
      info4.text = "F-Animacao: "+Personagem.currentAnimationFrame+" - "+Personagem.spriteSheet._frameWidth+"/"+Personagem.spriteSheet._frameHeight;
      info5.text = "F-Currente: "+Personagem.currentFrame;
      info6.text = "Animacao: "+Personagem.currentAnimation;




    }

    Util.prototype.buscarSalaDoJogador = function(cliente, Salas){

    for(var i = 0; i< Salas.length; i++){

      var jogadores = Salas[i].jogadores;

      for(var n = 0; n< jogadores.length; n++) {

        if (cliente == jogadores[n].conexao) {
          return i;
        }
      }
    }

  }

    return new Util();
}

var cUtil = cUtil();