module.exports.jogo = (application, req, res) => {
    if(req.session.autorizado) {
        res.render('jogo', { img_casa: req.session.casa });
    } else {
        res.send('Usuario precisa fazer login!!')
    }
    // res.render('index', { validacao: {}});
}

module.exports.sair = (application, req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
        } else {
            res.render('index', { validacao: {} });
        }
    });
}