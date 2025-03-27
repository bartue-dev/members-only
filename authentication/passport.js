const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const passportSession = passport.session();

//This function is what will be called when we use the passport.authenticate() function later
//passReqToCallBack set to true to be able to call req and clear the session messages
const passportLocalStrat = passport.use(new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
  try {
    // get the specific user base on username
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]); 
    
    //save it to a variable
    const user = rows[0];

    //clear the session messages
    req.session.messages = [];

    //if user is not found in db or falsy call the cb done function and pass null, false and the message
    if (!user) {
      return done(null, false, {message: "Incorrect username"});
    }

    //compare the hash password to the password that user inputed
    const match = await bcrypt.compare(password, user.password);

    //if password and db password is not match call cb done function and pass null, false and the message
    if(!match) {
      return done(null, false, {message: "Incorrect password"});
    }

    //if user and password match call cb done function then pass null and the user
    return done(null, user);

  } catch (error) {
    return done(error)
  }
}));


//takes a callback which contains the information we wish to store in the session data
const passportSerializeUser = passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

//is called when retrieving a session, where it will extract the data we “serialized” in it then ultimately attach something to the .user property of the request object (req.user) for use in the rest of the request
const passportDeserializeUser = passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

    const user = rows[0];

    done(null, user);

  } catch (error) {
    done(error)
  }
});

// This middleware performs numerous functions behind the scenes. Among other things, it looks at the request body for parameters named username and password then runs the LocalStrategy function that we defined earlier to see if the username and password are in the database. It then creates a session cookie that gets stored in the user’s browser and used in all future requests to see whether or not that user is logged in. Redirect if log-in success or fail
const passportAuth = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
  failureMessage: true
})

module.exports = {
  passportSession,
  passportLocalStrat,
  passportSerializeUser,
  passportDeserializeUser,
  passportAuth
}