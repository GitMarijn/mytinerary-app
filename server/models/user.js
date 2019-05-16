const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(
  "mongodb+srv://marijnvanloo:cuwteW-xagdup-honge9@mytinerary-app-3j4ew.mongodb.net/mytineraryApp?retryWrites=true",
  { useNewUrlParser: true }
);

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  googleId: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  isLogged: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  favourites: {
    type: Array,
    default: []
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
