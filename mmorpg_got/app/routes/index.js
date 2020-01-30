module.exports = (application) => {
	application.get('/', (req, res) => {
		application.app.controllers.index.index(application, req, res);
	});

	application.post('/autenticar', (req, res) => {
		application.app.controllers.index.autenticar(application, req, res);
	});

	application.get('/cadastrar', (req, res) => {
		application.app.controllers.index.cadastrar(application, req, res);
	})
}