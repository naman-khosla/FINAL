const express = require("express");
const router = express.Router();

let pageCount = 0; // This will reset every time the server restarts

router.get("/page-counter", (req, res) => {
  pageCount += 1;
  res.json({ count: pageCount });
});

module.exports = router;
