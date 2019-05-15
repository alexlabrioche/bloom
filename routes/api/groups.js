const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Initialize slug Module (test with print for results)
// const print = console.log.bind(console, ">");
const slug = require("slug");
slug.defaults.mode = "rfc3986";

// Group Model
const Group = require("../../models/Group");

// @route   GET api/groups
// @desc    Get all groups
// @access  Public
router.get("/", (req, res) => {
  Group.find()
    .then(group => res.json(group))
    .catch(err =>
      res.status(404).json({
        noGroupsFound: "Il n'y a pas encore de groupe politique"
      })
    );
});

// @route   GET api/groups/:id
// @desc    Get group by id
// @access  Public
router.get("/:id", (req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err =>
      res.status(404).json({
        noGroupFound: "Il n'y a pas de groupe politique avec cet ID"
      })
    );
});

// @route   POST api/groups
// @desc    Create group
// @access  Private
router.post("/", (req, res) => {
  Group.findOne({ name: req.body.name }).then(group => {
    if (group) {
      return res.status(400).json({ title: "Ce groupe politique existe déjà" });
    } else {
      const newGroup = new Group({
        name: req.body.name,
        description: req.body.description,
        slug: slug(req.body.name.toString())
      });

      newGroup.save().then(group => res.json(group));
    }
  });
});

// @route   POST api/groups/:id
// @desc    Update group
// @access  Private
router.post("/:id", (req, res) => {
  Group.findById(req.params.id).then(group => {
    const groupFields = {};
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.description) groupFields.description = req.body.description;
    if (req.body.slug) groupFields.slug = slug(req.body.name.toString());
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
          groupNotFound: "Il n'y a pas de groupe à supprimer"
        })
      );
  });
});

module.exports = router;
