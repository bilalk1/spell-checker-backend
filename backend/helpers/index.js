const { getDictionarySync } = require('simple-spellchecker');
const { LANGUAGES: { english } } = require('../constants');

/**
 * 
 * @returns {Dictionary} dictionary
 */
const getDictionary = () => getDictionarySync(english);

/**
 * 
 * @param {string} paragraph 
 * @returns {array} 
 */
const getWordsFromParagraph = paragraph => paragraph.split(" ");

/**
 * 
 * @param {string} word 
 * @returns 
 */
const isMisspelled = word => getDictionary().spellCheck(word);
/**
 * 
 * @param {string} paragraph 
 * @param {string} word 
 * @returns 
 */
const getBeginOffset = (paragraph, word) => paragraph.indexOf(`${word}`);

/**
 * 
 * @param {number} beginOffset 
 * @param {string} word 
 * @returns 
 */
const getEndOffset = (beginOffset, word) => beginOffset + word.length - 1;

/**
 * 
 * @param {string} word 
 * @returns 
 */
const getReplacements = word => getDictionary().getSuggestions(word);

module.exports = {
    getDictionary,
    getWordsFromParagraph,
    isMisspelled,
    getBeginOffset,
    getEndOffset,
    getReplacements
};
