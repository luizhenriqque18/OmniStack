const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DeslikeController = require('./controllers/DeslikeController');

const express = require('express');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/like', LikeController.store);
routes.post('/devs/:devId/deslike', DeslikeController.store);

module.exports = routes;