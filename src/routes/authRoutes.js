const express = require("express");
const { getAllUsers, getAllTrades, createEvent, deleteEvent } = require("../controllers/adminController");
const { adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", adminOnly, getAllUsers);
router.get("/trades", adminOnly, getAllTrades);
router.post("/event", adminOnly, createEvent);
router.delete("/event/:id", adminOnly, deleteEvent);

module.exports = router;
