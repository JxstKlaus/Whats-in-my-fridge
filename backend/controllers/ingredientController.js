const Ingredient = require("../models/Ingredient");

// Get all ingredients
const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ingredients" });
  }
};

// Add a new ingredient
const addIngredient = async (req, res) => {
  try {
    const { name, quantity, unit, expiryDate } = req.body;
    const newIngredient = new Ingredient({ name, quantity, unit, expiryDate });
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Error adding ingredient" });
  }
};

// Delete an ingredient
const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    await Ingredient.findByIdAndDelete(id);
    res.status(200).json({ message: "Ingredient deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ingredient" });
  }
};

module.exports = { getIngredients, addIngredient, deleteIngredient };
