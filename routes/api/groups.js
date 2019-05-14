const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Initialize slug Module (test with print for results)
// const print = console.log.bind(console, ">");
const slug = require("slug");
slug.defaults.mode = "rfc3986";

// Group Model
const Group = require("../../models/Group");

// @route   GET api/groups/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    message: "groups route works"
  })
);

// @route   GET api/groups
// @desc    Get all groups
// @access  Public
router.get("/", (req, res) => {
  Group.find()
    .then(group => res.json(group))
    .catch(err =>
      res.status(404).json({
        nogroupsfound: "No groups found"
      })
    );
});

// @route   GET api/groups/:id
// @desc    Get party by id
// @access  Public
router.get("/:id", (req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err =>
      res.status(404).json({
        nogroupfound: "No group found with that ID"
      })
    );
});

// @route   POST api/groups
// @desc    Create group
// @access  Private
router.post("/", (req, res) => {
  const newGroup = new Group({
    name: req.body.name,
    description: req.body.description,
    slug: slug(req.body.name.toString())
  });

  newGroup.save().then(group => res.json(group));
});

// @route   POST api/groups/:id
// @desc    Update group
// @access  Private
router.post("/:id", (req, res) => {
  Group.findById(req.params.id).then(group => {
    const groupFields = {};
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.description) groupFields.description = req.body.description;
    groupFields.slug = slug(req.body.name.toString());
    Group.findOneAndUpdate(
      { _id: req.params.id },
      { $set: groupFields },
      { useFindAndModify: false }
    ).then(group => res.json(group));
  });
});

// @route   DELETE api/groups/:id
// @desc    Delete group
// @access  Private
router.delete("/:id", (req, res) => {
  Group.findById(req.params.id).then(group => {
    group
      .remove()
      .then(() =>
        res.json({
          success: true
        })
      )
      .catch(err =>
        res.status(404).json({
          partynotfound: "No group found"
        })
      );
  });
});

module.exports = router;
