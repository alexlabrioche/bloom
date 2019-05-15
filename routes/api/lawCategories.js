const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Initialize slug Module
const slug = require("slug");
slug.defaults.mode = "rfc3986";

// Law Category Model
const LawCategory = require("../../models/LawCategory");

// @route   GET api/laws-categories/test
// @desc    Test route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    message: "LawCategory route works"
  })
);

// @route   GET api/laws-categories/
// @desc    Get all laws categories
// @access  Public
router.get("/", (req, res) => {
  LawCategory.find()
    .then(laws => {
      res.json(laws);
    })
    .catch(err =>
      res.status(404).json({
        laws: "there are no laws Categories",
        error: err
      })
    );
});

// @route   GET api/laws-categories/:id
// @desc    Get law category by Id
// @access  Public
router.get("/:id", (req, res) => {
  LawCategory.findById(req.params.id)
    .then(law => res.json(law))
    .catch(err =>
      res.status(404).json({
        nolawfound: "No law category found with that Id"
      })
    );
});

// @route   PUT api/laws-categories/add
// @desc    Create new law category
// @access  Private
router.put("/add", (req, res) => {
  const newLawCategory = new LawCategory({
    name: req.body.name,
    description: req.body.description,
    laws: req.body.laws,
    slug: slug(req.body.name.toString())
  });
  newLawCategory.save().then(law => res.json(law));
});

// @route   POST api/laws-categories/:id
// @desc    Update a law category
// @access  Private
router.post("/:id", (req, res) => {
  LawCategory.findById(req.params.id).then(law => {
    const lawFields = {};
    if (req.body.name) lawFields.name = req.body.name;
    if (req.body.description) lawFields.description = req.body.description;
    if (req.body.laws) lawFields.laws = req.body.laws;
    if (req.body.slug) lawFields.slug = slug(req.body.name.toString());
    LawCategory.findOneAndUpdate(
      { _id: req.params.id },
      { $set: lawFields },
      { useFindAndModify: false }
    ).then(law => res.json(law));
  });
});

// @route   DELETE api/laws-categories/:id
// @desc    Delete a law
// @access  Private
router.delete("/:id", (req, res) => {
  LawCategory.findById(req.params.id).then(law => {
    law
      .remove()
      .then(() =>
        res.json({
          success: true
        })
      )
      .catch(err =>
        res.status(404).json({
          lawnotfound: "No law category found"
        })
      );
  });
});

module.exports = router;
