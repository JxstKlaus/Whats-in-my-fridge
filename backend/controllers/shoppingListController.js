const Fridge = require("../models/Fridge");
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

// Move Ingredients from Shopping List to Fridge
const moveToFridge = async (req, res) => {
    try {
      const { name, quantity, unit } = req.body; // Optional input
      const userId = req.user.userId;
  
      // Find user's shopping list
      const shoppingList = await ShoppingList.findOne({ user: userId });
      if (!shoppingList || shoppingList.ingredients.length === 0) {
        return res.status(404).json({ message: "Shopping list is empty" });
      }
  
      // Find or create user's fridge
      let fridge = await Fridge.findOne({ user: userId });
      if (!fridge) {
        fridge = new Fridge({ user: userId, ingredients: [] });
      }
  
      // Helper function to move an ingredient
      const moveIngredient = (ingredientToMove) => {
        const { name, quantity, unit } = ingredientToMove;
  
        // Find the ingredient in the fridge
        const fridgeIngredient = fridge.ingredients.find(
          (item) => item.name === name && item.unit === unit
        );
  
        if (fridgeIngredient) {
          // Update quantity if it already exists
          fridgeIngredient.quantity += quantity;
        } else {
          // Add new ingredient
          fridge.ingredients.push({ name, quantity, unit });
        }
      };
  
      if (name && unit) {
        // Move a single ingredient if provided
        const ingredientIndex = shoppingList.ingredients.findIndex(
          (item) => item.name === name && item.unit === unit
        );
  
        if (ingredientIndex === -1) {
          return res.status(404).json({ message: "Ingredient not found in shopping list" });
        }
  
        const ingredient = shoppingList.ingredients[ingredientIndex];
  
        if (ingredient.quantity < quantity) {
          return res.status(400).json({ message: "Not enough quantity in shopping list" });
        }
  
        // Move ingredient to fridge
        moveIngredient({ name, quantity, unit });
  
        // Update shopping list: reduce or remove ingredient
        ingredient.quantity -= quantity;
        if (ingredient.quantity <= 0) {
          shoppingList.ingredients.splice(ingredientIndex, 1);
        }
      } else {
        // Move all ingredients from shopping list to fridge
        shoppingList.ingredients.forEach((ingredient) => moveIngredient(ingredient));
  
        // Clear the shopping list
        shoppingList.ingredients = [];
      }
  
      // Save updates
      await fridge.save();
      await shoppingList.save();
  
      res.status(200).json({ message: "Ingredients moved to fridge", fridge, shoppingList });
    } catch (error) {
      res.status(500).json({ message: "Error moving ingredients to fridge", error });
    }
  };

module.exports = { addToShoppingList, viewShoppingList, removeFromShoppingList, moveToFridge };
