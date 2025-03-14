const mongoose = require("mongoose");

const shoppingListSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
