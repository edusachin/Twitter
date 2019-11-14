const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

async function getFollowers(msg, callback) {
    let response = {};
    let err = {};
    try {
        let user = await Users.findById(msg.user_id);

        if (!user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        } else {
            let followers = await Users.find(
                {
                    '_id': { $in: user.followers }
                },
                { first_name: 1, user_name: 1 }
            );

            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(followers);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getFollowers = getFollowers;