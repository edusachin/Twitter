const passwordHash = require('password-hash');
const User = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

async function handle_request(msg, callback) {
    let response = {};
    let err = {};
    try {
        const hashedPassword = passwordHash.generate(msg.password);
        const user = await User.findOne({
            email_id: msg.email_id
        });
        if (user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.USER_ALREADY_EXISTS;
            return callback(err, null);
        } else {
            let user = new User({
                first_name: msg.first_name,
                last_name: msg.last_name,
                user_name: msg.user_name,
                email_id: msg.email_id,
                password: hashedPassword
            });
            const usersave = await user.save();
            if (usersave) {
                response.status = STATUS_CODE.SUCCESS;
                response.data = MESSAGES.CREATE_SUCCESSFUL;
                return callback(null, response);
            } else {
                err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                err.data = MESSAGES.INTERNAL_SERVER_ERROR;
                return callback(err, null);
            }
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
}

exports.handle_request = handle_request;