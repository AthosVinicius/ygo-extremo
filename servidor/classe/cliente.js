/**
 * Created by Athos Vinicius on 25/01/2017.
 */


exports.iniciar = function (data) {

    var cliente = {};

    cliente.nome = "????";
    cliente.id = 0;
    cliente.login = 0;
    cliente.conexao = data.id;
    cliente.tempoConectado = 0;
    cliente.jogos = 0;
    cliente.status = 0;


    return cliente;
}