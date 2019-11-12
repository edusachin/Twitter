const app = require("./app");

//routes
const signup = require("./routes/signup");
const login = require("./routes/login");
const menu_items = require("./routes/menuItems");

app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/items", menu_items);


//Port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
