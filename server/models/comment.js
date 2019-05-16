const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://marijnvanloo:cuwteW-xagdup-honge9@mytinerary-app-3j4ew.mongodb.net/mytineraryApp?retryWrites=true",
  { useNewUrlParser: true }
);

let commentSchema = new mongoose.Schema({
  post: {
    type: String,
    default: ""
  },
  reference: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model("Comment", commentSchema);
