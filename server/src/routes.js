const { Router } = require('express');
const USersController = require('./controllers/USersController');
const authentication = require('./middlewares/auth');

const routes = Router();

routes.post('/users', USersController.Create)
routes.post('/users/login', USersController.Login)
routes.post('/users/forgot', USersController.Forgot)
routes.post('/users/reset/:code', USersController.Reset)


module.exports = routes;