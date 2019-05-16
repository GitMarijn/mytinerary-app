var express = require("express");
var app = express();
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const User = require("./models/user");
var passport = require("passport");
const keys = require("./config/keys");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passportSetup = require("./config/passport-setup.js");
const cookieSession = require("cookie-session");
const Comment = require("./models/comment");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

MongoClient.connect(
  "mongodb+srv://marijnvanloo:cuwteW-xagdup-honge9@mytinerary-app-3j4ew.mongodb.net/mytineraryApp?retryWrites=true",
  { useNewUrlParser: true },
  (err, db) => {
    var dbase = db.db("mytineraryApp");
    if (err) return console.log(err);
    app.listen(8080, () => {
      console.log("app working on 8080");
    });

    router.get("/all", function(req, res) {
      dbase
        .collection("cities")
        .find()
        .toArray((err, result) => {
          if (!err) return res.send(result);
        });
    });

    router.get("/itinerary/:city", function(req, res) {
      let { city } = req.params;
      dbase
        .collection("itinerary")
        .find({
          reference: city
        })
        .toArray((err, result) => {
          if (err)
            return res.send({
              success: false,
              message: "Error: Server Error"
            });
          if (result.length == 0)
            return res.send({
              success: false,
              message: "Error: No Itinerary Found"
            });
          return res.send({
            success: true,
            message: result
          });
        });
    });

    router.get("/favourites", function(req, res) {
      let favs = Object.values(req.query).map(val => ObjectID(val))
      dbase.collection("itinerary").find({
        _id: { "$in" : favs}
      })
      .toArray((err, result) => {
        if (err)
        return res.send({
          success: false,
          message: "Error: server error"
        });
        if (result.length == 0)
            return res.send({
              success: false,
              message: "Error: No Itinerary Found"
            });
            return res.send({
              success: true,
              message: result
        });
      })
    })

    router.get("/activities/:itinerary", function(req, res) {
      let { itinerary } = req.params;
      dbase
        .collection("activities")
        .find({
          reference: itinerary
        })
        .toArray((err, result) => {
          if (err)
            return res.send({
              success: false,
              message: "Error: Server Error"
            });
          if (result.length == 0)
            return res.send({
              success: false,
              message: "Error: No Activities Found"
            });
          return res.send({
            success: true,
            message: result
          });
        });
    });

    router.get("/comments/:itinerary", function(req, res) {
      let { itinerary } = req.params;
      dbase
        .collection("comments")
        .find({
          reference: itinerary 
        })
        .toArray((err, result) => {
          if (err)
            return res.send({
              success: false,
              message: "Error: Server Error"
            });
          if (result.length == 0)
            return res.send({
              success: false,
              message: "Error: No comments found"
            });
          return res.send({
            success: true,
            message: result
          });
        });
    });

    router.post("/comments", (req, res) => {
      const { message, itineraryId } = req.body;

      if (!message) {
        return res.send({
          success: false,
          message: "Error: no message"
        })
      }
      const comment = new Comment();
      comment.post = message;
      comment.reference = ObjectID(itineraryId);

      dbase.collection("comments").save(comment, (err, result) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        res.send({
          success: true,
          message: "Comment posted"
        });
      })
    })

    router.post("/user/signup", (req, res) => {
      const {
        username,
        password,
        email,
        firstName,
        lastName,
        country
      } = req.body;

      if (!username) {
        return res.send({
          success: false,
          message: "Error: Username is required"
        });
      }
      if (!password) {
        return res.send({
          success: false,
          message: "Error: Password is required"
        });
      }
      if (!email) {
        return res.send({
          success: false,
          message: "Error: Email is required"
        });
      }
      if (!firstName) {
        return res.send({
          success: false,
          message: "Error: First name is required"
        });
      }
      if (!lastName) {
        return res.send({
          success: false,
          message: "Error: Last name is required"
        });
      }
      if (!country) {
        return res.send({
          success: false,
          message: "Error: Country is required"
        });
      }

      dbase
        .collection("users")
        .find()
        .toArray((err, result) => {
          let existingUser = result.filter(user => user.username == username);
          if (existingUser.length > 0)
            return res.send({
              success: false,
              message: "Error: Username already in use."
            });
        });

      const user = new User();
      user.username = username;
      user.password = password;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.country = country;

      dbase.collection("users").save(user, (err, result) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        res.send({
          success: true,
          message: "New user created"
        });
      });
    });

    router.post("/user/login", (req, res) => {
      const { username, password } = req.body;
      if (!username) {
        return res.send({
          success: false,
          message: "Error: username is required"
        });
      }
      if (!password) {
        return res.send({
          success: false,
          message: "Error: password is required"
        });
      }
      dbase
        .collection("users")
        .find({ password: password, username: username })
        .toArray((err, users) => {
          if (err)
            return res.send({
              success: false,
              message: "Error: server error"
            });
          if (!users[0])
            return res.send({
              success: false,
              message: "Error: Username or password not found"
            });
          let user = users[0];
          dbase.collection("users").findOneAndUpdate(
            user,
            {
              $set: {
                isLogged: true
              }
            },
            null,
            (err, result) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error: server error"
                });
              }
              res.send({
                success: true,
                message: "You're logged in",
                token: user._id,
              });
            }
          );
        });
    });

    router.get("/user/verify/:id", (req,res) => {
      const {id} = req.params;
      dbase.collection("users").findOne({
        _id: ObjectID(id)
      }, (err,user) => {
        if (err)
        return res.send({
          success: false,
          message: "Error: Server Error"
        })
        if (!user)
        return res.send({
          success: false,
          message: "Error: No User Logged In"
        })
        return res.send({
          success: true,
          user: user
        })
      })
    })

    router.post("/user/logout", (req, res) => {
      const { token } = req.body
      if (!token) {
        return res.send({
          success: false,
          message: "Error: already logged out"
        });
      }
      dbase.collection("users").find({ _id: ObjectID(token)}).toArray((err, user) => {
        if (err)
            return res.send({
              success: false,
              message: "Error: server error"
            });
          if (!user[0])
            return res.send({
              success: false,
              message: "Error: User not found"
            });
        let currentUser = user[0];
        dbase.collection("users").findOneAndUpdate(currentUser, {
          $set: {
            isLogged: false
          }
        }, null, (err, result) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: server error"
            });
          }
          res.send({
            success: true,
            message: "You're logged out",
          });
        })
      })
    })

    router.post("/favourites/:id", (req, res) => {
      const { id } = req.params;
      const { favourites } = req.body;
      var update = {
        $addToSet: { favourites: favourites }
    }
    dbase.collection("users").findOneAndUpdate({_id: ObjectID(id)}, 
      update,
      null,
      (err, result) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }
        res.send({
          success: true,
          message: "Favourite added"
        });
      })
    })

    router.post("/favourites/delete/:id", (req, res) => {
      const { id } = req.params;
      const { favourites } = req.body;
      const remove = {
        $pull: { favourites: favourites }
      }
      dbase.collection("users").findOneAndUpdate({_id: ObjectID(id)},
      remove,
      null,
      (err, result) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }
        res.send({
          success: true,
          message: "Favourite deleted"
        })
      })
    })

    router.get("/auth/logout", (req, res) => {
      req.logout();
      res.redirect("/home");
    });

    router.get("/auth/google", passport.authenticate("google", {
        scope: ["profile", "email"]
      })
    );

    router.get("/auth/google/callback", passport.authenticate("google"),
      (req, res) => {
        const { user } = req;
        dbase
          .collection("users")
          .findOne({ googleId: user.googleId })
          .then(currentUser => {
            if (currentUser) {
              dbase.collection("users").findOneAndUpdate(currentUser,
                {
                  $set: {
                    isLogged: true
                  }
                },
                null,
                (err, result) => {
                  if (err) {
                    return res.send({
                      success: false,
                      message: "Error: server error"
                    });
                  }
                  return res.send({
                    success: true,
                    message: "user logged in",
                    token: currentUser._id
                  });
                }
              );
            } else {
              dbase.collection("users").save(user, (req, result) => {
                if (err)
                  return res.send({
                    success: false,
                    message: "Error: Server Error"
                  });
                dbase.collection("users").findOne({ googleId: user.googleId })
                  .then(currentUser => {
                      dbase.collection("users").findOneAndUpdate(currentUser,
                        {
                          $set: {
                            isLogged: true
                          }
                        },
                        null,
                        (err, result) => {
                          if (err) {
                            return res.send({
                              success: false,
                              message: "Error: server error"
                            });
                          }
                          return res.send({
                            success: true,
                            message: "user logged in",
                            token: currentUser._id
                          });
                        }
                      );
                  });
              });
            }
          });
      }
    );

    router.get("/home", authCheck, (req, res) => {
      res.render("profile", { user: req.user });
    });

    app.use("/api", router);
  }
);
