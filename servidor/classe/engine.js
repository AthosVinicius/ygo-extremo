/**
 * Created by Athos Vinicius on 26/01/2017.
 */


var update_time = 0;
var update_limite = 5;
var md5 = require('md5');

exports.updateDados = function (s, clientes, salas) {

    if(update_time >= update_limite) {

        this.updateClientes(s, clientes);
        this.updateSalas(s, salas);


        update_time = 0;
    }


    update_time++;

}
exports.getUpdateTime = function(){

    return update_time;

}

exports.updateClientes = function(s, clientes){

        var dados = {
            evento: 3,
            valor: clientes
        }

        s.emit("EventosR", dados);
        s.broadcast.emit("EventosR", dados);

}
exports.updateSalas = function(s, salas){

        var dados = {
            evento: 4,
            valor: salas
        }

        s.emit("EventosR", dados);
        s.broadcast.emit("EventosR", dados);

}

exports.login = function(s, data, cClientes, clienteAtual, mysqlConn){

    var login = data.login;
    //if(login != "Athos")
    //    return;
    var senha = md5(data.senha);

    var consulta = 'SELECT count(id) AS validarAcesso, nick FROM cadastro WHERE login = ? and senha = ?'; // SQL


    var dados = {
        evento: 7,
        valor: {}
    }

    mysqlConn.query(consulta, [login, senha], function(err, rows, fields) {

        if (err){
            console.log('Aconteceu o seguinte erro: '+ err);

        }else{

            if(rows[0].validarAcesso>0){

                var cliente = cClientes.getLista()[cClientes.buscarCliente(clienteAtual)];
                cliente.nome = rows[0].nick;

                console.log('Acesso valido!!');

                dados.valor = true;

                s.emit("EventosR", dados);


            }else{

                console.log('Acesso negado!!');

                dados.valor = false;

                s.emit("EventosR", dados);

            }
        } // fim da condição de acesso
    }); // fim da consulta mysql


}