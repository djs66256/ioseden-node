/**
 * Created by daniel on 16/5/3.
 */

// TODO: validate token
export default function() {
    return function(req, res, next) {
        next();
    };
};
