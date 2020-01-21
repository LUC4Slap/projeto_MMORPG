module.exports.index = (application, req, res) => {
    res.render('index', { validacao: {} });
}

module.exports.autenticar = (application, req, res) => {
    let dadosForm = req.body;

    req.assert('usuario', 'Usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();

    let erros = req.validationErrors();

    if(erros) {
        res.render('index', { validacao: erros });
        return;
    }

    res.send('tudo certo para o inicio da sessão')
}