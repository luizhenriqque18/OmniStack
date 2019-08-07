const DevController = require('./controllers/DevController');
const express = require('express');

const routes = express.Router();

routes.post('/devs', DevController.store);

module.exports = routes;