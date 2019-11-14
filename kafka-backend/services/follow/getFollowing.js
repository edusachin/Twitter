const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

async function getFollowing(msg, callback) {
    let response = {};
    let err = {};
    try {
        let following = await Users.findById(msg.user_id, { following: 1}).populate("following", "first_name user_name");

        if (!following) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        } else {
            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(following);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getFollowing = getFollowing;