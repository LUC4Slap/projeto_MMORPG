module.exports = (application) => {
	application.get('/', (req, res) => {
		res.send('Bem vindo a sua app NodeJS!');
	});
}