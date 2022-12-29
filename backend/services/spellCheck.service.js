
const uidv4 = require('uuid');
const { TYPES: { spelling } } = require('../constants');
const {
    getWordsFromParagraph,
    isMisspelled,
    getBeginOffset,
    getEndOffset,
    getReplacements,
} = require('../helpers');

/**
 * 
 * @param {string} paragraph 
 */

const spellChecking = paragraph => {
    let words = getWordsFromParagraph(paragraph);
    let info = {
        id: uidv4.v4(),
        words: words.length,
        time: new Date(),
        issues: [],
    }

    for (let word of words) {
        if (!isMisspelled(word)) {
            let beginOffset = getBeginOffset(paragraph, word);
            let issue = {
                type: spelling,
                match: {
                    surface: word,
                    beginOffset,
                    endOffset: getEndOffset(beginOffset, word),
                    replacement: getReplacements(word)
                }
            }
            info.issues.push(issue);
        }

    }
    info.issues = info.issues.filter(i => i.match.replacement.length)
    return info;
}

module.exports = { spellChecking }