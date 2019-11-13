const passwordHash = require('password-hash');
const Users = require('../../models/users');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

async function handle_request(msg, callback) {
    let response = {};
    let err = {};
    const email_id = msg.email_id;
    try {
        let user = await Users.findOne({
            email_id: email_id
        });

        if (!user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.INVALID_CREDENTIALS;
            return callback(err, null);
        } else {
            const validPassword = await passwordHash.verify(msg.password, user.password);
            if (!validPassword) {
                err.status = STATUS_CODE.BAD_REQUEST;
                err.data = MESSAGES.INVALID_CREDENTIALS;
                return callback(err, null);
            } else {
                const payload = {
                    _id: user._id, first_name: user.first_name, last_name: user.last_name,
                    user_name: user.user_name, email_id: user.email_id
                };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 900000 // in seconds
                });
                response.status = STATUS_CODE.SUCCESS;
                response.data = token;
                return callback(null, response);
            }
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.handle_request = handle_request;