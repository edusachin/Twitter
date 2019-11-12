var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var config = require("./config");

var kafka = require("../kafka/client");

const passport = require("passport");
// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      const body = jwt_payload;

      kafka.make_request("auth_topic", body, function (err, results) {
        console.log("in make request call back");
        console.log(results);
        console.log(err);
        if (err) {
          console.log("Inside err");
          console.log(err);
          return done(err.data, err.boolean);
        } else {
          console.log("Inside else");
          console.log(results);
          return done(results.boolean, results.data);
        }
      });
    })
  );
}

checkAuth = passport.authenticate("jwt", { session: false });

exports.auth = auth;
exports.checkAuth = checkAuth;
