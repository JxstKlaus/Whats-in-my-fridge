const Fridge = require("../models/Fridge");

// Get User's Fridge
const getFridge = async (req, res) => {
  try {
    const fridge = await Fridge.findOne({ user: req.user.userId });
    if (!fridge) return res.status(404).json({ message: "Fridge not found" });

    res.status(200).json(fridge);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fridge" });
  }
};

//Update Fridge
const updateFridge = async (req, res) => {
  try {
    const { name, ingredients } = req.body;

    let fridge = await Fridge.findOne({ user: req.user.userId });

    if (fridge) {
      // Update existing fridge
      fridge.name = name;
      fridge.ingredients = ingredients;
    } else {
      // Create new fridge
      fridge = new Fridge({ user: req.user.userId, ingredients });
    }

    await fridge.save();
    res.status(200).json(fridge);
  } catch (error) {
    res.status(500).json({ message: "Error updating fridge" });
  }
};

const createFridge = async (req, res) => {
  try {
    const fridge = new Fridge({ user: req.user.userId, ingredients: [] });
    await fridge.save();
    res.status(200).json(fridge);
  } catch (error) {
    res.status(500).json({ message: "Error creating fridge" });
  }
}

// Delete Fridge (if needed)
const deleteFridge = async (req, res) => {
  try {
    const fridge = await Fridge.findOneAndDelete({ user: req.user.userId });

    if (!fridge) return res.status(404).json({ message: "Fridge not found" });

    res.status(200).json({ message: "Fridge deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting fridge" });
  }
};

// Add Ingredient
const addIngredientToFridge = async (req, res) => {
  try {
    const { name, quantity, unit } = req.body;
    const fridge = await Fridge.findOne({ user: req.user.userId });

    if (!fridge) {
      return res.status(404).json({ message: "Fridge not found" });
    }

    // Find if ingredient already exists
    const ingredient = fridge.ingredients.find(
      (item) => item.name === name && item.unit === unit
    );

    if (ingredient) {
      // If ingredient exists, increase the quantity
      ingredient.quantity += quantity;
    } else {
      // If ingredient does not exist, add a new one
      fridge.ingredients.push({ name, quantity, unit });
    }

    await fridge.save();
    res.status(200).json(fridge);
  } catch (error) {
    res.status(500).json({ message: "Error adding ingredient" });
  }
};

// Remove Ingredient
const removeIngredientFromFridge = async (req, res) => {
  try {
    const { name, quantity, unit } = req.body;
    const fridge = await Fridge.findOne({ user: req.user.userId });

    if (!fridge) {
      return res.status(404).json({ message: "Fridge not found" });
    }

    // Find the ingredient to update
    const ingredient = fridge.ingredients.find(
      (item) => item.name === name && item.unit === unit
    );

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    // Decrease the quantity
    ingredient.quantity -= quantity;

    // If the quantity is 0 or below, remove the ingredient from the fridge
    if (ingredient.quantity <= 0) {
      fridge.ingredients = fridge.ingredients.filter(
        (item) => item.name !== name || item.unit !== unit
      );
    }

    await fridge.save();
    res.status(200).json(fridge);
  } catch (error) {
    res.status(500).json({ message: "Error removing ingredient" });
  }
};
module.exports = { getFridge, createFridge, updateFridge, deleteFridge, addIngredientToFridge, removeIngredientFromFridge };
