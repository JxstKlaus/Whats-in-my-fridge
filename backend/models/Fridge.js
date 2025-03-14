const mongoose = require("mongoose");

const fridgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const Fridge = mongoose.model("Fridge", fridgeSchema);

module.exports = Fridge;
