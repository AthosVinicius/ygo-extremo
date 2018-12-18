/**
 * Created by Athos Vinicius on 25/01/2017.
 */


var util = require('util');
var cClientes = require('./classe/clientes.js');
var cSalas = require('./classe/salas.js');
var cDeck = require('./classe/deck.js');
var cEngine = require('./classe/engine.js');
var mysql = require('mysql');


var conexaoMysql = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'ygo_server'
});



exports.iniciar = function(engine){


    var cliente = cClientes.criarCliente_atual(engine);
    cClientes.addCliente(cliente);



    var gatilho = {
        disconnect: function () {
            cClientes.deconectar(cliente);
            cSalas.deconectar(cliente);
        },
        btnCriarSala: function () {
            cSalas.criarSala(engine, cliente);
            console.log(cSalas.getLista().length);
            console.log("====================");
        },
        btnEntrarEmSala: function () {
            cSalas.entrarEmSala(engine, cliente);
            console.log(cSalas.getLista().length);
            console.log("====================");
        },
        btnSairDaSala: function () {
            cSalas.deconectar(engine, cliente);
            console.log(cSalas.getLista().length);
            console.log("====================");
        },
        btnTelaDeck: function () {
            cDeck.acessarDeck(engine, cliente);
        },
        btnLogin: function (data) {
            cEngine.login(engine, data, cClientes, cliente, conexaoMysql);
            console.log("====================");
        }
    }




    setInterval(function(){
        
        cEngine.updateDados(engine,cClientes.getLista(),cSalas.getLista());

    },1000);

    engine.on('disconnect', gatilho.disconnect);
    engine.on('btnCriarSala', gatilho.btnCriarSala);
    engine.on('btnEntrarEmSala', gatilho.btnEntrarEmSala);
    engine.on('btnSairDaSala', gatilho.btnSairDaSala);
    engine.on('btnTelaDeck', gatilho.btnTelaDeck);
    engine.on('btnLogin', gatilho.btnLogin);

}
