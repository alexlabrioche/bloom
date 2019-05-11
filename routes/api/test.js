// Require Modules
const express = require("express");

// Set Router from Express
const router = express.Router();

// @route     GET api/test
// @desc      Test route
// @access    Public
router.get("/", (req, res) =>
  res.json({
    message: "Test route works"
  })
);

module.exports = router;
