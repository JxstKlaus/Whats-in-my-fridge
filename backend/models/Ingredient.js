const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true }, // e.g., "grams", "liters"
  expiryDate: { type: Date, required: false }, // Optional
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
