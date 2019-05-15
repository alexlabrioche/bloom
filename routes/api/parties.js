const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Initialize slug Module (test with print for results)
// const print = console.log.bind(console, ">");
const slug = require("slug");
slug.defaults.mode = "rfc3986";

// Party Model
const Party = require("../../models/Party");

// @route   GET api/parties
// @desc    Get all parties
// @access  Public
router.get("/", (req, res) => {
  Party.find()
    .then(party => res.json(party))
    .catch(err =>
      res.status(404).json({
        noPartiesFound: "Il n'y a pas encore de parti politique"
      })
    );
});

// @route   GET api/parties/:id
// @desc    Get party by id
// @access  Public
router.get("/:id", (req, res) => {
  Party.findById(req.params.id)
    .then(party => res.json(party))
    .catch(err =>
      res.status(404).json({
        noPartyFound: "Il n'y a pas de parti politique avec cet ID"
      })
    );
});

// @route   POST api/parties
// @desc    Create party
// @access  Private
router.post("/", (req, res) => {
  Party.findOne({ name: req.body.name }).then(party => {
    if (party) {
      return res.status(400).json({ title: "Ce parti politique existe déjà" });
    } else {
      const newParty = new Party({
        name: req.body.name,
        description: req.body.description,
        slug: slug(req.body.name.toString())
      });

      newParty.save().then(party => res.json(party));
    }
  });
});

// @route   POST api/parties/:id
// @desc    Update party
// @access  Private
router.post("/:id", (req, res) => {
  Party.findById(req.params.id).then(party => {
    const partyFields = {};

    if (req.body.name) partyFields.name = req.body.name;
    if (req.body.description) partyFields.description = req.body.description;
    partyFields.slug = slug(req.body.name.toString());
    Party.findOneAndUpdate(
      { _id: req.params.id },
      { $set: partyFields },
      { useFindAndModify: false }
    ).then(party => res.json(party));
  });
});

// @route   DELETE api/parties/:id
// @desc    Delete party
// @access  Private
router.delete("/:id", (req, res) => {
  Party.findById(req.params.id).then(party => {
    party
      .remove()
      .then(() =>
        res.json({
          success: true
        })
      )
      .catch(err =>
        res.status(404).json({
          partyNotFound: "Il n'y a pas de parti à supprimer"
        })
      );
  });
});

module.exports = router;
