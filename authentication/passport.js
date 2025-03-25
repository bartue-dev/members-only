const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const passportSession = passport.session();

const passportLocalStrat = passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    
    const user = rows[0];

    if (!user) {
      return done(null, false, {message: "Incorrect username"});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
      return done(null, false, {message: "Incorrect password"});
    }

    return done(null, user);

  } catch (error) {
    return done(error)
  }
}));

const passportSerializeUser = passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

const passportDeserializeUser = passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

    const user = rows[0];

    done(null, user);

  } catch (error) {
    done(error)
  }
});

const passportAuth = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/"
})

module.exports = {
  passportSession,
  passportLocalStrat,
  passportSerializeUser,
  passportDeserializeUser,
  passportAuth
}