const passwordHash = require('password-hash');
const User = require('../../models/users');

async function handle_request(msg, callback) {
    let response = {};
    let err = {};
    try {
        const hashedPassword = passwordHash.generate(msg.password);
        const user = await User.findOne({
            email_id: msg.email_id
        });
        if (user) {
            err.status = 400;
            err.data = "User already exists";
            return callback(err, null);
        } else {
            let user = new User({
                first_name: msg.first_name,
                last_name: msg.last_name,
                user_name: msg.user_name,
                email_id: msg.email_id,
                password: hashedPassword
            });
            const usersave = await user.save();
            if (usersave) {
                response.status = 200;
                response.data = "User saved";
                return callback(null, response);
            } else {
                err.status = 400;
                err.data = "Restaurant Could Not be signed up";
                return callback(err, null);
            }
        }
    } catch (error) {
        console.log(error);
        err.status = 500;
        err.data = "Internal Server Error";
        return callback(err, null);
    }
}

exports.handle_request = handle_request;