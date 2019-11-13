const User = require('../../models/users');

async function handle_request(msg, callback) {
    let response = {};
    let err = {};
    try {
        let user = await Users.findById(msg);
        if (!user) {
            response.boolean = null;
            err.data = false;
            return callback(null, response);
        }
        if (user) {
            response.boolean = null;
            response.data = user;
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.boolean = false;
        err.data = error;
        return callback(err, null);
    }
}

exports.handle_request = handle_request;