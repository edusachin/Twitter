const app = require("./app");

//routes
const login = require("./routes/login");
const signup = require("./routes/signup");

app.use("/api/signup", signup);
app.use("/api/login", login);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
