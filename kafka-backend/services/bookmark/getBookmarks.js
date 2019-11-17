"use strict";
const Users = require('../../models/users');

const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getBookmarks = async (msg, callback) => {
    let response = {};
    let err = {};
    try {

        let bookmarks = await Users.findById(msg.user_id, { bookmarks: 1, _id:0 });
        if (!bookmarks) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.INVALID_INPUTS;
            return callback(err, null);
        } else {
            response.status = STATUS_CODE.SUCCESS;
            response.data = bookmarks;
            return callback(null, response);
        }

    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getBookmarks = getBookmarks;