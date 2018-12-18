/**
 * Created by Athos Vinicius on 26/01/2017.
 */

var cSala = require('./sala.js');
var cClientes = require('./clientes.js');

var lista = [];
var ID_increment = 0;

exports.criarSala = function(s, cliente){

    if(this.buscarSalaDoJogador(cliente) >= 0)
        return;

    var sala = cSala.iniciar(cliente, ID_increment);
    ID_increment++;

    cliente.status = 1;
    lista.push(sala);


    var dados = {
        evento: 1,
        valor: null
    }

    s.emit("EventosR", dados);

};

exports.entrarEmSala = function(s, cliente){

    if(this.buscarSalaDoJogador(cliente) >= 0)
        return;

    if(this.buscarSalaLivre() >= 0)
        var sala = lista[this.buscarSalaLivre()];
    else
        return;


    if(sala.jogadores.length >= 2)
        return;

    cliente.status = 1;
    sala.jogadores.push(cliente);


    var dados = {
        evento: 2,
        valor: null
    }

    s.emit("EventosR", dados);

};

exports.deconectar = function(s, cliente){

    //Se o jogador que saiu da sala for host
    if(this.buscarSalaDoHost(cliente) >= 0) {

        var posSalaDoHost = this.buscarSalaDoHost(cliente);
        var salaDoHost = lista[posSalaDoHost];
        var jogadores = salaDoHost.jogadores;


        var dados = {
            evento: 9,
            valor: null
        }

        dados.valor = { jogadores: jogadores };

        s.emit("EventosR", dados);
        s.broadcast.emit("EventosR", dados);

        //remove a sala
        lista.splice(salaDoHost, 1);

        //Altera o status do jogador

        for(var i = 0; i< jogadores.length; i++){

            cClientes.alterarStatus(jogadores[i], 0);
        }

    }else if(this.buscarSalaDoJogador(cliente) >= 0){
        var sala = lista[this.buscarSalaDoJogador(cliente)];
        sala.jogadores.splice(1,1);

        cClientes.alterarStatus(cliente, 0);
    }
    console.log("Salas: "+lista.length);

}

exports.getLista = function(){

    return lista;
}

exports.buscarSalaDoJogador = function(cliente){

    for(var i = 0; i< lista.length; i++){

        var jogadores = lista[i].jogadores;

        for(var n = 0; n< jogadores.length; n++) {

            if (cliente.conexao == jogadores[n].conexao) {
                return i;
            }
        }
    }

}

exports.buscarSalaDoHost = function(cliente){

    for(var i = 0; i< lista.length; i++){

        if(cliente.conexao == lista[i].host.conexao){
            return i;
        }
    }

}

exports.buscarSalaLivre = function(){

    for(var i = 0; i< lista.length; i++){

        if(lista[i].jogadores.length == 1){
            return i;
        }
    }

}

exports.enviarSala = function(cliente, s){

    var dados = {
        evento: 8,
        valor: null
    }

    var sala = this.buscarSalaDoJogador(cliente);

    dados.valor = { sala: sala, salas: lista };

    s.emit("EventosR", dados);
    s.broadcast.emit("EventosR", dados);
}