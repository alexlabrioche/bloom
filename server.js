// Require Modules for server settings
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const helmet = require("helmet");

// Import Routes
const deputies = require("./routes/api/deputies");
const parties = require("./routes/api/parties");
const groups = require("./routes/api/groups");
const lawsCategories = require("./routes/api/lawsCategories");
const laws = require("./routes/api/laws");
const votes = require("./routes/api/votes");
const admin = require("./routes/api/admin");

const app = express();

// Enable Cors to allow server and client routes to be different
app.use(cors());

// Protects the server from HTTP vulnerabilities
app.use(helmet());

// Enable Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser()); // JSON.stringify
passport.deserializeUser(Admin.deserializeUser()); // JSON.parse

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Config
const db = require("./config/keys").mongoURI;
console.info("@Server: dbPath", db);

// Connect API to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.info("@Server: MongoDB connected"))
  .catch(error => console.info("@Server: error connecting Mongoose", error));

// Use routes
app.use("/api/deputies", deputies);
app.use("/api/parties", parties);
app.use("/api/groups", groups);
app.use("/api/laws-categories", lawsCategories);
app.use("/api/laws", laws);
app.use("/api/votes", votes);
app.use("/api/admin", admin);

const port = process.env.PORT || 4000;

// Listen port
app.listen(port, () => console.info(`@Server: running on port ${port}`));
