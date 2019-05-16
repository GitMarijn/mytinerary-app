var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "11477829839-budntnqug8amk3ebc4l14ns29rrjui8n.apps.googleusercontent.com",
      clientSecret: "9KlzewTn2Tik-h5efNUHudj9",
      callbackURL: "http://localhost:3000/login"
    },
    function(accessToken, refreshToken, profile, done) {
      let newUser = new User({
        username: profile.displayName,
        googleId: profile.id,
        profilePic: profile.photos[0].value
      });
      done(null, newUser);
    }
  )
);
