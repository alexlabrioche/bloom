const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Party Model
const Party = require("../../models/Party");

// @route   GET api/parties/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    message: "parties route works"
  })
);

// @route   GET api/parties/all
// @desc    Get all parties
// @access  Public
router.get("/", (req, res) => {
  Party.find()
    .then(party => res.json(party))
    .catch(err =>
      res.status(404).json({
        noPartiesFound: "No parties found"
      })
    );
});

module.exports = router;
