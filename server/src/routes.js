const { Router } = require('express');
const USersController = require('./controllers/USersController');
const authentication = require('./middlewares/auth');

const routes = Router();

routes.post('/users', USersController.Create)
routes.post('/login', USersController.Login)
routes.post('/forgot', USersController.Forgot)
routes.post('/reset/:code', USersController.Reset)


module.exports = routes;