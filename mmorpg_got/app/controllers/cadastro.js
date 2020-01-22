module.exports.cadastro = (application, req, res) => {
    res.render('cadastro', { validacao: {}, dadosForm: {} })
}

module.exports.cadastrar = (application, req, res) => {
    let dadosForm = req.body;

    req.assert('nome', 'O campo nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'O campo usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'O campo senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa é obrigatorio').notEmpty();

    let erros = req.validationErrors();

    if(erros) {
        res.render('cadastro', { validacao: erros, dadosForm: dadosForm });
        return;
    }

    let connection = application.config.dbConnection;
    let UsuariosDAO = new application.app.models.UsuariosDAO(connection);

    UsuariosDAO.inserirUsuario(dadosForm);

    res.send('Podemos cadastrar');
}