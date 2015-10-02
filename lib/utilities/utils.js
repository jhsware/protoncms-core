'use strict';

module.exports.forgivingJSONParse = function (inp) {
    try {
        return JSON.parse(inp);
    } catch (e) {
        return {
            parseError: true,
            text: inp
        }
    }
}