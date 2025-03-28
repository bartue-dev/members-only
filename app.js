const express = require("express");
const session = require("express-session");
const path = require("node:path");

const passport = require("./authentication/passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");

const app = express();
require("dotenv").config()

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const homeRouter = require("./routes/homeRouter");
const postRouter = require("./routes/postRouter");
const settingsRouter = require("./routes/settingsRouter");
const faqRouter = require("./routes/faqRouter");

//connect ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//connect static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//session store user data to session and cookie
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: "session"
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 1000
  }
}));

//invoke passport session for login persistent
app.use(passport.passportSession);
//turn req.body into object
app.use(express.urlencoded({ extended: true}));

passport.passportLocalStrat;
passport.passportSerializeUser;
passport.passportDeserializeUser;

//routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next();
});

app.use((req, res, next) => {
  console.log("session:", req.session);
  console.log("user:", req.user)
  next();
});
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.post("/log-in", passport.passportAuth)
app.use("/home", homeRouter);
app.use("/posts", postRouter);
app.use("/settings", settingsRouter);
app.use("/faq", faqRouter);
app.get("/log-out", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/")
  });
});

//error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: "Internal Server Error"})
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app listening to PORT: ${PORT}`);
});
