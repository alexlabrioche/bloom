const express = require("express");
const router = express.Router();
const multer = require("multer");

// Define path for uploads images
const upload = multer({ dest: "public/uploads/" });
// Initialize slug Module (test with print for results)
// const print = console.log.bind(console, ">");
const slug = require("slug");
slug.defaults.mode = "rfc3986";

// Group Model
const Law = require("../../models/Law");

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
        law: "Il n'y a pas encore de loi"
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
        noLawFound: "Il n'y a pas de loi avec cet ID"
      })
    );
});

// @route   POST api/laws/add
// @desc    Create new law
// @access  Private
router.post("/add", upload.single("image"), (req, res) => {
  console.log("data", req);
  const data = JSON.parse(req.body.data);
  console.log("data", data);
  Law.findOne({ name: data.name }).then(law => {
    if (law) {
      return res.status(400).json({ law: "Cette loi existe déjà" });
    } else {
      const newLaw = new Law({
        name: data.name,
        subTitle: data.subTitle,
        protect: data.protect,
        category: data.category,
        commencement: data.commencement,
        resume: data.resume,
        fullText: data.fullText,
        link: data.link,
        slug: slug(data.name.toString())
      });

      newLaw.save().then(law => res.json(law));
    }
  });
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
          success: true,
          message: "La loi a été supprimé"
        })
      )
      .catch(err =>
        res.status(404).json({
          error: true,
          message: "Il n'y a pas de loi à supprimer"
        })
      );
  });
});

module.exports = router;
