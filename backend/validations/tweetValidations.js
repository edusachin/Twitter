const Joi = require("joi");

//Validation for Profile API
function validateTweet(user) {
    const schema = {
        user_id: Joi.string().required(),
    };

    return Joi.validate(user, schema);
}

exports.validateTweet = validateTweet;
