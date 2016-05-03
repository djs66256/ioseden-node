/**
 * Created by daniel on 16/5/3.
 */

// TODO: validate token
module.exports = function() {
    return function(req, res, next) {
        next();
    };
};
