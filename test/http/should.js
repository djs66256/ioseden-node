/**
 * Created by daniel on 16/5/17.
 */
let util = {
    shouldNot(done, message) {
        return (err, res, body) => {
            if (err) done(err);
            else if (body.code == 1) done(new Error(message));
            else done();
        };
    },

    should(done) {
        return (err, res, body) => {
            if (err) done(err);
            else if (body.code != 1) done(new Error(body.message));
            else done();
        }
    }
};

export default util;

