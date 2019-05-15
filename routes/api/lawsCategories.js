const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Initialize slug Module
const slug = require("slug");
slug.defaults.mode = "rfc3986";

// Law Category Model
const LawCategory = require("../../models/LawCategory");

// @route   GET api/laws-categories/
// @desc    Get all laws categories
// @access  Public
router.get("/", (req, res) => {
  LawCategory.find()
    .populate("laws", [
      "title",
      "subTitle",
      "protect",
      "commencement",
      "resume",
      "fullText",
      "link",
      "slug",
      "created"
    ])
    .then(categories => {
      res.json(categories);
    })
    .catch(err =>
      res.status(404).json({
        categories: "Il n'y a pas encore de catégories",
        error: err
      })
    );
});

// @route   GET api/laws-categories/:id
// @desc    Get law category by Id
// @access  Public
router.get("/:id", (req, res) => {
  LawCategory.findById(req.params.id)
    .populate("laws", [
      "title",
      "subTitle",
      "protect",
      "commencement",
      "resume",
      "fullText",
      "link",
      "slug",
      "created"
    ])
    .then(category => res.json(category))
    .catch(err =>
      res.status(404).json({
        noCategoryFound: "Il n'y a pas de catégorie de loi avec cet ID"
      })
    );
});

// @route   POST api/laws-categories/add
// @desc    Create new law category
// @access  Private
router.post("/add", (req, res) => {
  LawCategory.findOne({ name: req.body.name }).then(category => {
    if (category) {
      return res.status(400).json({ name: "Cette catégorie existe déjà" });
    } else {
      const newLawCategory = new LawCategory({
        name: req.body.name,
        description: req.body.description,
        laws: req.body.laws,
        slug: slug(req.body.name.toString())
      });
      newLawCategory.save().then(law => res.json(law));
    }
  });
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
          categoryNotFound:
            "La catégorie de loi avec cette ID n'a pas été trouvée"
        })
      );
  });
});

module.exports = router;