const express = require('express');
const { getSpellingIssuesAndSuggestions,

} = require('../controllers/spellCheck.controller');

const spellCheckRoutes = express.Router();

spellCheckRoutes.post('/', getSpellingIssuesAndSuggestions);

module.exports = {
    spellCheckRoutes
};
