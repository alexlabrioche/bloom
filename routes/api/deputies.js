// Require Modules
const express = require("express");

// Import Model Deputy
const Deputy = require("../../models/Deputy");

// Set Router from Express
const router = express.Router();

// @route     GET api/deputies/all
// @desc      Get all deputies
// @access    Public
router.get("/all", (req, res) => {
  Deputy.find().then(deputies => {
    res.json({
      deputies
    });
  });
});

// @route         POST api/deputies/add
// @descrip       Add a new deputy
// @access        Restricted
router.post("/add", (req, res) => {
  Deputy.findOne({ name: req.body.name }).then(deputy => {
    if (deputy) {
      return res.status(400).json({ name: "Ce député existe déjà" });
    } else {
      Deputy.countDocuments((err, count) => {
        console.log(`There are already ${count} deputies in the database`);
        const newDeputy = new Deputy({
          // deputyNumber: count + 1,
          name: name,
          participationRate: req.body.participationRate,
          from: req.body.from,
          to: req.body.to,
          group: req.body.group,
          party: req.body.party,
          picture: req.body.picture
        });
        newDeputy
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    }
  });
});

module.exports = router;
