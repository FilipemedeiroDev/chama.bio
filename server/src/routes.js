const { Router } = require('express');
const ProfileController = require('./controllers/ProfileController');
const USersController = require('./controllers/USersController');
const authentication = require('./middlewares/auth');

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const routes = Router();

routes.post('/users', USersController.Create)
routes.post('/users/login', USersController.Login)
routes.post('/users/forgot', USersController.Forgot)
routes.post('/users/reset/:code', USersController.Reset)

routes.get('/profiles', authentication, ProfileController.getProfile);
routes.post('/profiles/update', authentication, ProfileController.updateProfile);
routes.patch('/profiles/avatar', authentication, upload.single('avatar'), ProfileController.uploadAvatar);
routes.delete('/profiles/avatar', authentication, ProfileController.removeAvatar)

module.exports = routes;