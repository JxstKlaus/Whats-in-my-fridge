const mongoose = require("mongoose");

const fridgeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Fridge name (e.g., "Kitchen Fridge")
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }], // List of ingredients
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Fridge = mongoose.model("Fridge", fridgeSchema);

module.exports = Fridge;
