const app = require("./app");

//routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const follow = require("./routes/follow");

app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/profile", profile);
app.use("/api/follow", follow);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
