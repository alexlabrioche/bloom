// Require Modules
const express = require("express");
const slug = require("slug");
const multer = require("multer");
const fs = require("fs");

// Define path for uploads images
const upload = multer({ dest: "public/uploads/" });

// Import Model Deputy
const Deputy = require("../../models/Deputy");

// Configure slug to default url
slug.defaults.mode = "rfc3986";

// Set Router from Express
const router = express.Router();

// @route     GET api/deputies
// @desc      READ : Display all deputies
// @access    Public
router.get("/", (req, res) => {
  Deputy.find()
    .populate("group", ["name", "description", "picture", "slug", "created"])
    .populate("party", ["name", "description", "picture", "slug", "created"])
    .then(deputies => {
      res.json({
        deputies
      });
    });
});

// @route     GET api/deputies/:id
// @desc      READ : Display 1 deputiy
// @access    Public
router.get("/:id", (req, res) => {
  Deputy.findById(req.params.id)
    .populate("group", ["name", "description", "picture", "slug", "created"])
    .populate("party", ["name", "description", "picture", "slug", "created"])
    .then(deputy => res.json(deputy))
    .catch(err =>
      res
        .status(400)
        .json({ noDeputyFound: "Il n'y a pas de député avec cet ID" })
    );
});

// @route         POST api/deputies/add
// @descrip       CREATE : Add a new deputy
// @access        Restricted
router.post("/add", upload.single("image"), (req, res) => {
  // On rename la photo dans le upload
  console.info("ICI");
  console.info("req.body", req.body);
  console.info("req.file", req.file);
  const extension = getExtension(req.file); // Voir en dessous
  const filename = req.file.filename + extension;
  const serverPictureName = "public/uploads/" + filename;
  const apiPictureName = "uploads/" + filename;
  console.log("filename", filename);
  console.log("serverPictureName", serverPictureName);
  console.log("apiPictureName", apiPictureName);
  fs.rename(req.file.path, serverPictureName, function(err) {
    if (err) {
      console.log("il y a une erreur", err);
      return res
        .status(400)
        .json({ img: "L'image n'a pas pu être sauvegardée" });
    }
    Deputy.findOne({ name: req.body.name }).then(deputy => {
      if (deputy) {
        return res.status(400).json({ name: "Ce député existe déjà" });
      } else {
        console.info("ICI AUSSI");
        const newDeputy = new Deputy({
          name: req.body.name,
          participationRate: req.body.participationRate,
          mandateFrom: req.body.mandateFrom,
          mandateTo: req.body.mandateTo,
          group: req.body.group,
          party: req.body.party,
          picture: apiPictureName,
          slug: slug(req.body.name.toString())
        });
        newDeputy
          .save()
          .then(user => res.json(user))
          .catch(err => console.log("err", err));
      }
    });
  });
});

// Ici on compare check quelle est l'extension de l'image reçue
const getExtension = file => {
  switch (file.mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/gif":
      return ".gif";
    default:
      return ".jpg";
  }
};

// @route         POST api/deputies/:id
// @descrip       UPDATE : Update a deputy
// @access        Restricted
router.post("/:id", (req, res) => {
  Deputy.findById(req.params.id).then(deputy => {
    const deputyFields = {};

    if (req.body.name) {
      deputyFields.name = req.body.name;
    }
    if (req.body.participationRate) {
      deputyFields.participationRate = req.body.participationRate;
    }
    if (req.body.mandateFrom) {
      deputyFields.mandateFrom = req.body.mandateFrom;
    }
    if (req.body.mandateTo) {
      deputyFields.mandateTo = req.body.mandateTo;
    }
    if (req.body.group) {
      deputyFields.group = req.body.group;
    }
    if (req.body.party) {
      deputyFields.party = req.body.party;
    }
    if (req.body.picture) {
      deputyFields.picture = req.body.picture;
    }

    deputyFields.slug = slug(req.body.name.toString());
    Deputy.findOneAndUpdate(
      { _id: req.params.id },
      { $set: deputyFields },
      { useFindAndModify: false }
    ).then(deputy => res.json(deputy));
  });
});

// @route         DELETE api/deputies/:id
// @descrip       DELETE : Delete a deputy
// @access        Restricted
router.delete("/:id", (req, res) => {
  Deputy.findById(req.params.id).then(deputy => {
    deputy
      .remove()
      .then(() =>
        res.json({
          success: true,
          successMessage: "Le député a été supprimé"
        })
      )
      .catch(err =>
        res.status(404).json({
          deputyNotFound: "Il n'y a pas de député à supprimer"
        })
      );
  });
});

module.exports = router;
