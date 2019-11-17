const Joi = require("joi");

//Validation for Tweet API
function validateTweet(user) {
    const schema = {
        user_id: Joi.string().required(),
        tweet_text: Joi.string()
    };

    return Joi.validate(user, schema);
}

//Validation for Tweet API
function validateLikes(likes) {
    const schema = {
        user_id: Joi.string().required(),
        tweet_id: Joi.string().required()
    };

    return Joi.validate(likes, schema);
}

exports.validateLikes = validateLikes;
exports.validateTweet = validateTweet;
