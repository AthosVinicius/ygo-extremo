/**
 * Created by Athos Vinicius on 25/01/2017.
 */

var cCliente = require('./cliente.js');

var lista = [];

exports.criarCliente_atual = function(engine){

    return cCliente.iniciar(engine);

}

exports.addCliente = function(cliente){

    lista.push(cliente);

}

exports.deconectar = function(cliente){

    lista.splice(this.buscarCliente(cliente), 1);

    console.log("Clientes: "+lista.length);

}

exports.getLista = function(){

    return lista;
}

exports.alterarStatus = function(cliente, status){

    for(var i = 0; i< lista.length; i++){

        if(cliente.conexao == lista[i].conexao){

            lista[i].status = status;
        }
    }
}

exports.verificarAtividades = function(){

}

exports.buscarCliente = function(cliente){

    for(var i = 0; i< lista.length; i++){

        if(cliente.conexao == lista[i].conexao){
            return i;
        }
    }

}