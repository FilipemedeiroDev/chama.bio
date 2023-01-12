const { Router } = require('express');
const ProfileController = require('./controllers/ProfileController');
const UsersController = require('./controllers/USersController');
const LinkController = require('./controllers/LinkController');
const authentication = require('./middlewares/auth');

const multer = require('multer');
const USersController = require('./controllers/USersController');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const routes = Router();

routes.post('/users', UsersController.Create)
routes.post('/users/login', UsersController.Login)
routes.post('/users/forgot', UsersController.Forgot)
routes.post('/users/reset/:code', UsersController.Reset)
routes.get('/users/me', authentication, UsersController.getUser);
routes.put('/users/edit', authentication, USersController.editUser)


routes.get('/profiles/me', authentication, ProfileController.getProfile);
routes.get('/profiles/:username', ProfileController.getProfileByUsername);
routes.post('/profiles/update', authentication, ProfileController.updateProfile);
routes.patch('/profiles/avatar', authentication, upload.single('avatar'), ProfileController.uploadAvatar);

routes.get('/links', authentication, LinkController.getUserLinks);
routes.post('/links', authentication, LinkController.createLink);
routes.patch('/links/:id/title', authentication, LinkController.editLinkTitle);
routes.patch('/links/:id/destination', authentication, LinkController.editLinkDestination);
routes.delete('/links/:id', authentication, LinkController.deleteLink)

module.exports = routes;