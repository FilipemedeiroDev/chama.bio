const { Router } = require('express');
const ProfileController = require('./controllers/ProfileController');
const USersController = require('./controllers/USersController');
const authentication = require('./middlewares/auth');

const routes = Router();

routes.post('/users', USersController.Create)
routes.post('/users/login', USersController.Login)
routes.post('/users/forgot', USersController.Forgot)
routes.post('/users/reset/:code', USersController.Reset)

routes.get('/profiles', authentication, ProfileController.getProfile);
routes.post('/profiles/update', authentication, ProfileController.updateProfile);



module.exports = routes;