// Require Modules
const express = require("express");
const slug = require("slug");

// Import Model Deputy
const Deputy = require("../../models/Deputy");

// Configure slug to default url
slug.defaults.mode = "rfc3986";

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
          deputyNumber: count + 1,
          name: req.body.name,
          participationRate: req.body.participationRate,
          mandateFrom: req.body.mandateFrom,
          mandateTo: req.body.mandateTo,
          group: req.body.group,
          party: req.body.party,
          picture: req.body.picture,
          slug: slug(req.body.name.toString())
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
