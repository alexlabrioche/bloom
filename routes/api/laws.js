const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Initialize slug Module (test with print for results)
// const print = console.log.bind(console, ">");
const slug = require("slug");
slug.defaults.mode = "rfc3986";

// Group Model
const Law = require("../../models/Law");

// @route   GET api/groups/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    message: "laws route works"
  })
);

// @route   GET api/laws/
// @desc    Get all laws
// @access  Public
router.get("/", (req, res) => {
  Law.find()
    .then(laws => {
      res.json(laws);
    })
    .catch(err =>
      res.status(404).json({
        law: "there are no laws",
        error: err
      })
    );
});

// @route   GET api/laws/:id
// @desc    Get law by Id
// @access  Public
router.get("/:id", (req, res) => {
  Law.findById(req.params.id)
    .then(law => res.json(law))
    .catch(err =>
      res.status(404).json({
        nolawfound: "No law found with that Id"
      })
    );
});

// @route   PUT api/laws/add
// @desc    Create new law
// @access  Private
router.put("/add", (req, res) => {
  const newLaw = new Law({
    title: req.body.title,
    subTitle: req.body.subTitle,
    protect: req.body.protect,
    commencement: req.body.commencement,
    resume: req.body.resume,
    fullText: req.body.fullText,
    link: req.body.link,
    slug: slug(req.body.title.toString())
  });
  newLaw.save().then(law => res.json(law));
});

// @route   POST api/laws/:id
// @desc    Update a law
// @access  Private
router.post("/:id", (req, res) => {
  Law.findById(req.params.id).then(law => {
    const lawFields = {};
    if (req.body.title) lawFields.title = req.body.title;
    if (req.body.subTitle) lawFields.subTitle = req.body.subTitle;
    if (req.body.protect) lawFields.protect = req.body.protect;
    if (req.body.commencement) lawFields.commencement = req.body.commencement;
    if (req.body.resume) lawFields.resume = req.body.resume;
    if (req.body.fullText) lawFields.fullText = req.body.fullText;
    if (req.body.link) lawFields.link = req.body.link;
    if (req.body.slug) lawFields.slug = slug(req.body.title.toString());
    Law.findOneAndUpdate(
      { _id: req.params.id },
      { $set: lawFields },
      { useFindAndModify: false }
    ).then(law => res.json(law));
  });
});

// @route   DELETE api/laws/:id
// @desc    Delete a law
// @access  Private
router.delete("/:id", (req, res) => {
  Law.findById(req.params.id).then(law => {
    law
      .remove()
      .then(() =>
        res.json({
          success: true
        })
      )
      .catch(err =>
        res.status(404).json({
          lawnotfound: "No law found"
        })
      );
  });
});

module.exports = router;
