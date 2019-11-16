"use strict";
const Users = require('../../models/users');
const Conversation = require("../../models/conversations");

const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let sendMessage = async (msg, callback) => {
    let response = {};
    let err = {};
    try {
        let newMessage = {
            sender: msg.sender_id,
            message_content: msg.message_content,
            message_time: Date.now()
        }

        if (msg.conversation_id) {
            let existingConversation = await Conversation.findById(msg.conversation_id);

            existingConversation.message.push(newMessage);
            let conversationUpdate = await existingConversation.save();
            
            if (conversationUpdate) {
                response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
                response.data = MESSAGES.CREATE_SUCCESSFUL;
                return callback(null, response);
            } else {
                err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                err.data = MESSAGES.ACTION_NOT_COMPLETE;
                return callback(err, null);
            }

        }
        else {
            let newConversation = new Conversation({
                user1: msg.sender_id,
                user2: msg.receiver_id,
                message: newMessage,
            })

            const convSave = await newConversation.save();

            if (convSave) {
                response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
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
};

exports.sendMessage = sendMessage;