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

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
    this._connection.open(function(err, mongocliente) {
        mongocliente.collection("jogo", function(err, collection){
            collection.find({ usuario: usuario }).toArray((err, result) => {
                // console.log(result[0]);
                res.render('jogo', { img_casa : casa, jogo: result[0], msg: msg });
                mongocliente.close();
            });
        });
    })
}

JogoDAO.prototype.acao = function(acao) {
    this._connection.open(function(err, mongocliente) {
        mongocliente.collection("acao", function(err, collection){
            let date = new Date();
            let tempo = null;
            switch(parseInt(acao.acao)) {
                case 1: 
                    tempo = 1 * 60 * 60000;
                    break;
                case 2: 
                    tempo = 2 * 60 * 60000;
                    break;
                case 3: 
                    tempo = 5 * 60 * 60000;
                    break;
                case 4: 
                    tempo = 5 * 60 * 60000;
                    break;
            }

            acao.acao_termina_em = date.getTime() + tempo;
            collection.insert(acao);
            mongocliente.close();
        });
    })
}

JogoDAO.prototype.getAcoes = function(usuario, res) {
    this._connection.open(function(err, mongocliente) {
        mongocliente.collection("acao", function(err, collection){
            collection.find({ usuario: usuario }).toArray((err, result) => {
                res.render("pergaminhos", { acoes: result });
                mongocliente.close();
            });
        });
    })
}

module.exports = () => JogoDAO;