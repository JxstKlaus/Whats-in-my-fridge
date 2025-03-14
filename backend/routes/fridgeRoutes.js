const express = require("express");
const { getFridge,
        createFridge,
        updateFridge,
        deleteFridge,
        addIngredientToFridge,
        removeIngredientFromFridge } = require("../controllers/fridgeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getFridge);
router.post("/", protect, createFridge);
router.put("/", protect, updateFridge);
router.delete("/", protect, deleteFridge);

router.put("/add", protect, addIngredientToFridge);
router.delete("/remove", protect, removeIngredientFromFridge);

module.exports = router;

