module.exports.jogo = (application, req, res) => {
    if(req.session.autorizado) {
        res.render('jogo');
    } else {
        res.send('Usuario precisa fazer login!!')
    }
    // res.render('index', { validacao: {}});
}