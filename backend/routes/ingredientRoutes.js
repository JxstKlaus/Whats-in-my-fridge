const express = require("express");
const { getIngredients, addIngredient, deleteIngredient } = require("../controllers/ingredientController");

const router = express.Router();

router.get("/", getIngredients);
router.post("/", addIngredient);
router.delete("/:id", deleteIngredient);

module.exports = router;
