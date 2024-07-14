const express = require("express");

const router = express.Router();

const path = require("path");

const views = path.join(__dirname, "../views");

router.get("/", (req, res) => {
  res.sendFile(path.join(views, "index.html"));
});

router.get("/registro", (req, res) => {
  res.sendFile(path.join(views, "registro.html"));
});

module.exports = router;
