const express = require('express');
const routes = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-xyc4a.mongodb.net/omnistack?retryWrites=true&w=majority',{
    useNewUrlParser:true
})
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);