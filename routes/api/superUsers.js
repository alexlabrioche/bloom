const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// SuperUser Model
const SuperUser = require("../../models/SuperUser");

// Set Router from Express
const router = express.Router();

// @route     GET api/superusers/admin
// @desc      READ : Login for admin
// @access    Public
router.get("/admin", (req, res) => {
  // Check si pas de champs vide
  const { errors } = validateLoginInput(req.body);

  // Récupère données du login
  const name = req.body.name;
  const password = req.body.password;

  // Find SuperUser by name
  User.findOne({ name }).then(user => {
    // Check User
    if (!user) {
      errors.name = "User not found";
      return res.status(404).json(errors);
    }
  });
});
