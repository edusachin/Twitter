var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
var kafka = require("../kafka/client");

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      const body = jwt_payload;

      kafka.make_request("passport", body, function (err, results) {
        if (err) {
          return done(err.data, err.boolean);
        } else {
          return done(results.boolean, results.data);
        }
      });
    })
  );
}
const checkAuth = passport.authenticate("jwt", { session: false });

exports.auth = auth;
exports.checkAuth = checkAuth;