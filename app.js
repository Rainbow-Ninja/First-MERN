const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// Load User model

require("./models/user");
require("./models/Blog");
//passport config - the module in the file required is a function, which accepts an argument passport
require("./config/passport")(passport);

//Load routes
const auth = require("./routes/auth");
const blog = require("./routes/blog");

// Load mongoose keys
const keys = require("./config/keys");

// Map global promises
mongoose.Promise = global.Promise;
// mongoose connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  ) // note connect returns promise
  .then(() => console.log("MongoDb connection"))
  .catch(err => console.log(err));

const app = express();

app.use(cookieParser());
// body parser middleware goes here
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars just like current_user if user logged in
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  res.send("HOME");
});

// use auth Routes : anything that routes to /auth goes to auth.js
app.use("/auth", auth);
app.use("/api/blogs", blog);

// run only in production : deploy to heroku with react client
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  //like our main.js, or main.css file
  //this checks the routes hosted in express server
  // any get request comes in for any route on our application and if we do not have route handler set up look up for the client side implementation
  app.use(express.static("client/build"));

  //this checks for the routes not in express server but defined only on client side like a static route
  //Express will serve up the index.html file
  //if it doesn't recognize the route
  // return index.html if route was not found in server or client/build
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
var port = process.env.PORT || 5000;
// start the server and listen on the port
app.listen(port, () => {
  // res.send('HELLO');
  console.log(`started server on port ${port}`);
});
