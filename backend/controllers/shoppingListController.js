const ShoppingList = require("../models/ShoppingList");

// Add Ingredient to Shopping List
const addToShoppingList = async (req, res) => {
  try {
    const { name, quantity, unit } = req.body;

    // Find the user's shopping list
    let shoppingList = await ShoppingList.findOne({ user: req.user.userId });

    if (!shoppingList) {
      // If the shopping list doesn't exist, create a new one
      shoppingList = new ShoppingList({
        user: req.user.userId,
        ingredients: [{ name, quantity, unit }],
      });
    } else {
      // Check if the ingredient already exists in the shopping list
      const existingIngredient = shoppingList.ingredients.find(
        (item) => item.name === name && item.unit === unit
      );

      if (existingIngredient) {
        // If it exists, update the quantity
        existingIngredient.quantity += quantity;
      } else {
        // If it doesn't exist, add the new ingredient
        shoppingList.ingredients.push({ name, quantity, unit });
      }
    }

    await shoppingList.save();
    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: "Error adding ingredient to shopping list" });
  }
};

// View Shopping List
const viewShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findOne({ user: req.user.userId });

    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving shopping list" });
  }
};

// Remove Ingredient from Shopping List
const removeFromShoppingList = async (req, res) => {
  try {
    const { name, quantity, unit } = req.body;

    const shoppingList = await ShoppingList.findOne({ user: req.user.userId });

    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    const ingredientIndex = shoppingList.ingredients.findIndex(
      (item) => item.name === name && item.unit === unit
    );

    if (ingredientIndex === -1) {
      return res.status(404).json({ message: "Ingredient not found in shopping list" });
    }

    // Reduce the quantity or remove the ingredient if the quantity is 0 or negative
    shoppingList.ingredients[ingredientIndex].quantity -= quantity;

    if (shoppingList.ingredients[ingredientIndex].quantity <= 0) {
      shoppingList.ingredients.splice(ingredientIndex, 1); // Remove the ingredient
    }

    await shoppingList.save();
    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: "Error removing ingredient from shopping list" });
  }
};

module.exports = { addToShoppingList, viewShoppingList, removeFromShoppingList };
