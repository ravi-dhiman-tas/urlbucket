var jwt = require('jsonwebtoken'),
    tokenSecret = sails.config.session.secret;

module.exports.issue = function (payload) {
    return jwt.sign(payload, tokenSecret);
};

module.exports.verify = function (token, callback) {
    return jwt.verify(token, tokenSecret, {}, callback);
};