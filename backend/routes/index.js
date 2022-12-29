const express = require('express');
const routes = express.Router();

const { spellCheckRoutes } = require('./spellCheck.routes');

routes.use('/spell-check', spellCheckRoutes);

module.exports = {
    routes
}