module.exports.jogo = (application, req, res) => {
  if (req.session.autorizado !== true) {
    res.render("fazerLogin");
    return;
  }

  let msg = "";

  if (req.query.msg != "") {
    msg = req.query.msg;
  }

  let usuario = req.session.usuario;
  let casa = req.session.casa;
  let connection = application.config.dbConnection;
  let JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa, msg);
};

module.exports.sair = (application, req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { validacao: {} });
    }
  });
};

module.exports.suditos = (application, req, res) => {
  if (req.session.autorizado !== true) {
    res.render("fazerLogin");
    return;
  }
  res.render("aldeoes");
};

module.exports.pergaminhos = (application, req, res) => {
  if (req.session.autorizado !== true) {
    res.render("fazerLogin");
    return;
  }

  let connection = application.config.dbConnection;
  let JogoDAO = new application.app.models.JogoDAO(connection);
  let usuario = req.session.usuario;
  JogoDAO.getAcoes(usuario, res);
};

module.exports.ordenar_acao_sudito = (application, req, res) => {
  if (req.session.autorizado !== true) {
    res.render("fazerLogin");
    return;
  }
  let dadosForm = req.body;
  req.assert("acao", "Ação deve ser informada").notEmpty();
  req.assert("quantidade", "Quantidade deve ser informada").notEmpty();

  let erros = req.validationErrors();

  if (erros) {
    res.redirect("jogo?msg=A");
    return;
  }

  let connection = application.config.dbConnection;
  let JogoDAO = new application.app.models.JogoDAO(connection);

  dadosForm.usuario = req.session.usuario
  JogoDAO.acao(dadosForm);
  
  res.redirect("jogo?msg=B");
};

module.exports.revogar_acao = (application, req, res) => {
  let url_query = req.query;

  let connection = application.config.dbConnection;
  let JogoDAO = new application.app.models.JogoDAO(connection);

  let _id = url_query.id_acao;
  JogoDAO.revogarAcao(_id, res);
}
