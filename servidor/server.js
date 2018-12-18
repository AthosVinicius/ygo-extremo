/**
 * Created by Athos Vinicius on 25/01/2017.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var porta = 8003;
var util = require('util');
var scriptSever = require('./script_server.js');
var io = require('socket.io').listen(server);

/////////////////////[[ INICIA O SERVIDOR E EXIBE A MENSAGEM NO LOG ]]///////////////
server.listen(porta, function(){
    console.log(" __     _______  ____   _____");
    console.log("CARD GAME Versão: 1.0");
    console.log("Servidor iniciado na porta " + porta);

});

// Eventos do Socket.IO
io.sockets.on('connection', function (socket) {

    var servidor = socket;

    util.log("Um novo jogador se conectou ao servidor!");
    scriptSever.iniciar(servidor);

});