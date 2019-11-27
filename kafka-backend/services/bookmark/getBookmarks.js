"use strict";
const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getBookmarks = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let bookmarks = await Users.findById(msg.user_id, { bookmarks: 1, _id: 0 }).populate({
            path: "bookmarks",
            populate: {
                path: 'tweet_owner',
                model: 'User',
                select: 'first_name last_name user_name'
            }
        });

        if (!bookmarks) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.INVALID_INPUTS;
            return callback(err, null);
        } else {
            let formattedBookmarks = [];
            bookmarks.bookmarks.map(tweet => {
                formattedBookmarks.push(Object.assign({},tweet._doc,
                    {
                        likes_count: tweet.likes.length,
                        retweets_count: tweet.retweeters.length,
                        replies_count: tweet.replies.length,
                    }
                ))
            })
            console.log(formattedBookmarks);
            response.status = STATUS_CODE.SUCCESS;
            response.data = formattedBookmarks;
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