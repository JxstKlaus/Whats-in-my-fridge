const express = require("express");
const { getFridge, createFridge, updateFridge, deleteFridge } = require("../controllers/fridgeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getFridge); // Get user's fridge
router.post("/", protect, createFridge); // Get user's fridge
router.put("/", protect, updateFridge); // Update user's fridge
router.delete("/", protect, deleteFridge); // Delete user's fridge (if needed)

module.exports = router;

