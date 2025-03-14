const express = require("express");
const {
  addToShoppingList,
  viewShoppingList,
  removeFromShoppingList,
} = require("../controllers/shoppingListController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addToShoppingList);
router.get("/", protect, viewShoppingList);
router.delete("/remove", protect, removeFromShoppingList);

module.exports = router;
