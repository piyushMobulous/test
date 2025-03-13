const express = require("express");
const { placeTrade } = require("../controllers/tradeController");
const router = express.Router();

router.post("/", placeTrade);

module.exports = router;
