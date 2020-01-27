function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario) {
    this._connection.open(function(err, mongocliente) {
        mongocliente.collection("jogo", function(err, collection){
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor (Math.random() * 1000),
                sabedoria: Math.floor (Math.random() * 1000),
                comercio: Math.floor (Math.random() * 1000),
                magia: Math.floor (Math.random() * 1000)
            });
            mongocliente.close();
        });
    })
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, comando_invalido) {
    this._connection.open(function(err, mongocliente) {
        mongocliente.collection("jogo", function(err, collection){
            collection.find({ usuario: usuario }).toArray((err, result) => {
                // console.log(result[0]);
                res.render('jogo', { img_casa : casa, jogo: result[0], comando_invalido: comando_invalido });
                mongocliente.close();
            });
        });
    })
}

module.exports = () => JogoDAO;