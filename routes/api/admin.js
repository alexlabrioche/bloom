const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// SuperUser Model
const Admin = require("../../models/Admin");

// Set Router from Express
const router = express.Router();

// @route     POST api/admin/signup
// @desc      CREATE : Create an admin
// @access    Restricted
router.post("/signup", (req, res) => {
  console.log("@admin signup <<");
  const username = req.body.username;
  const password = req.body.password;

  Admin.register(
    new Admin({
      username: username
      // other fields can be added here
    }),
    password, // password is created and hashed
    function(err, user) {
      if (err) {
        console.log("/signup user register err", err);
        return res.render("register");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.json({ msg: "Admin created!" });
        });
      }
    }
  );
});

// @route     POST api/admin/login
// @desc      Login vs dB
// @access    Restricted
router.post("/login", (req, res, next) => {
  console.log("@admin login <<");
  passport.authenticate("local", { session: false }, (err, admin) => {
    if (err) {
      return res.json({ error: err.message });
    }
    if (!admin) {
      return res.json({ error: "Username ou mot de passe incorrect" });
    }
    res.json({
      _id: admin._id.toString(),
      // token: user.token,
      username: admin.username
    });
  })(req, res, next);
});

module.exports = router;
