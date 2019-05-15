const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Vote Model
const Vote = require("../../models/Vote");

// @route   GET api/votes/test
// @desc    Test route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    message: "vote route works"
  })
);

// @route   GET api/votes/
// @desc    Get all votes
// @access  Public
router.get("/", (req, res) => {
  Vote.find()
    .then(vote => {
      res.json(vote);
    })
    .catch(err =>
      res.status(404).json({
        votes: "there are no votes",
        error: err
      })
    );
});

// @route   GET api/votes/:id
// @desc    Get vote by Id
// @access  Public
router.get("/:id", (req, res) => {
  Vote.findById(req.params.id)
    .then(vote => res.json(vote))
    .catch(err =>
      res.status(404).json({
        novotefound: "No vote found with that Id"
      })
    );
});

// @route   PUT api/votes/add
// @desc    Create new vote
// @access  Private
router.put("/add", (req, res) => {
  const newVote = new Vote({
    decision: req.body.decision,
    deputy: req.body.deputy,
    law: req.body.law
  });
  newVote.save().then(vote => res.json(vote));
});

// @route   POST api/votes/:id
// @desc    Update a vote
// @access  Private
router.post("/:id", (req, res) => {
  Vote.findById(req.params.id).then(vote => {
    const voteFields = {};
    if (req.body.decision) voteFields.decision = req.body.decision;
    if (req.body.deputy) voteFields.deputy = req.body.deputy;
    if (req.body.law) voteFields.law = req.body.law;
    Vote.findOneAndUpdate(
      { _id: req.params.id },
      { $set: voteFields },
      { useFindAndModify: false }
    ).then(vote => res.json(vote));
  });
});

// @route   DELETE api/vote/:id
// @desc    Delete a vote
// @access  Private
router.delete("/:id", (req, res) => {
  Vote.findById(req.params.id).then(vote => {
    vote
      .remove()
      .then(() =>
        res.json({
          success: true
        })
      )
      .catch(err =>
        res.status(404).json({
          votenotfound: "No vote found"
        })
      );
  });
});

module.exports = router;
