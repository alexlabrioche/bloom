// Require Modules
const express = require("express");

// Set Router from Express
const router = express.Router();

// @route     GET api/deputy/test
// @desc      TEST ROUTE
// @access    Public
router.get("/test", (req, res) =>
  res.json({
    message: "Deputies route works"
  })
);

// @route     GET api/deputy/all
// @desc      Get all deputies
// @access    Public
router.get("/all", (req, res) =>
  res.json({
    message: "Test route works"
  })
);

module.exports = router;
