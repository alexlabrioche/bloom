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

router.get("/admin", function(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("admin");
  } else {
    res.redirect("/");
  }
});

// @route     GET api/admin/login
// @desc      Login an admin
// @access    Restricted
router.get("/login", function(req, res) {
  if (req.isAuthenticated()) {
    res.json({ msg: "You are already connected" });
  } else {
    res.json("login");
  }
});

// @route     POST api/admin/login
// @desc      Login vs dB
// @access    Restricted
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login"
  })
);

module.exports = router;
