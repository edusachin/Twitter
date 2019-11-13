const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

async function getFollowing(msg, callback) {
    let response = {};
    let err = {};
    try {
        let user = await Users.findById(msg.user_id);

        if (!user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        } else {
            let following = [];
            for(let i=0; i< user.following.length;i++){
                let target_user = await Users.findById(user.following[i]);
                following.push({user_id: target_user._id, first_name: target_user.first_name, user_name: target_user.user_name});
            }

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