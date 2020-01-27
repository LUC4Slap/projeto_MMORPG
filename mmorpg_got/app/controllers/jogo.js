module.exports.jogo = (application, req, res) => {
  if (req.session.autorizado !== true) {
    res.render("fazerLogin");
    return;
  }

  let comando_invalido = "N";

  if (req.query.comando_invalido == "S") {
    comando_invalido = "S";
  }

  let usuario = req.session.usuario;
  let casa = req.session.casa;
  let connection = application.config.dbConnection;
  let JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
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
  res.render("pergaminhos");
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
    res.redirect("jogo?comando_invalido=S");
    return;
  }

  console.log(dadosForm);
  res.send("Tudo ok");
};
