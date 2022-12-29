const { MESSAGES } = require("../constants");
const { spellChecking } = require("../services/spellCheck.service");

const getSpellingIssuesAndSuggestions = async (req, res) => {
    try {
        const { body: { paragraph } } = req;
        if (!paragraph) return res.status(422).json(MESSAGES.paragraph);
        return res.json(spellChecking(paragraph));
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getSpellingIssuesAndSuggestions
};
