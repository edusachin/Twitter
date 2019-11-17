"use strict";
const Users = require('../../models/users');
const Tweets = require('../../models/tweets');
const Conversations = require('../../models/conversations');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let deleteAccount = async (msg, callback) => {
    let response = {};
    let err = {};
    Users.deleteOne({ _id: msg.user_id }, function (err) {
        if (err) {
            err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            err.data = MESSAGES.INTERNAL_SERVER_ERROR;
            return callback(err, null);
        } else {
            Tweets.deleteOne({ tweet_owner: msg.user_id }, function (err) {
                if (err) {
                    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
                    return callback(err, null);
                } else {
                    Conversations.deleteOne({ $or: [{ "user1": msg.user_id }, { "user2": msg.user_id }] }, function (err) {
                        if (err) {
                            err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                            err.data = MESSAGES.INTERNAL_SERVER_ERROR;
                            return callback(err, null);
                        } else {
                            response.status = STATUS_CODE.SUCCESS;
                            response.data = MESSAGES.SUCCESS;
                            return callback(null, response);
                        }
                    });
                }
            });
        }
    });
};

exports.deleteAccount = deleteAccount;