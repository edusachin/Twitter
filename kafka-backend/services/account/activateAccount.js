"use strict";
const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let activateAccount = async (msg, callback) => {
    let response = {};
    let err = {};
    let activeUser;

    try {
        let user = await Users.findById(msg.user_id);

        if(user){
        user.is_active = true;
        activeUser = await user.save();
        }

        if (activeUser) {
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.SUCCESS;
            return callback(null, response);
        } else {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.activateAccount = activateAccount;