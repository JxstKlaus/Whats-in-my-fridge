const express = require("express");
const { getFridges, createFridge, addIngredientToFridge, removeIngredientFromFridge } = require("../controllers/fridgeController");

const router = express.Router();

router.get("/", getFridges);
router.post("/", createFridge);
router.put("/:fridgeId/add-ingredient", addIngredientToFridge);
router.put("/:fridgeId/remove-ingredient", removeIngredientFromFridge);

module.exports = router;
