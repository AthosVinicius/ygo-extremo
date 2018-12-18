/**
 * Created by Athos Vinicius on 26/01/2017.
 */


exports.iniciar = function(cliente, ID){

    var deck = {};


    deck.main = [];
    deck.side = [];
    deck.extra = [];

    deck.fora = [];



    return deck;
}


exports.acessarDeck = function(s, cliente){

    var dados = {
        evento: 10,
        valor: null
    }

    s.emit("EventosR", dados);

};