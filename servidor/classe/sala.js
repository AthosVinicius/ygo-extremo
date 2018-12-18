/**
 * Created by Athos Vinicius on 26/01/2017.
 */


exports.iniciar = function(cliente, ID){

    var sala = {};


    sala.ID = ID;
    sala.nome = "Sala "+ID;
    sala.host = cliente;
    sala.jogadores = [cliente];
    sala.status = 0;

    return sala;
}