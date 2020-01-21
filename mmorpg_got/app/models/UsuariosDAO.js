function UsuariosDAO(connection) {
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongocliente) {
        mongocliente.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongocliente.close();
        });
    })
}

module.exports = () => UsuariosDAO;