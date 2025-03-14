const Fridge = require("../models/Fridge");
const Ingredient = require("../models/Ingredient");

// Get all fridges
const getFridges = async (req, res) => {
  try {
    const fridges = await Fridge.find().populate("ingredients");
    res.status(200).json(fridges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fridges" });
  }
};

// Create a new fridge
const createFridge = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newFridge = new Fridge({ name, userId, ingredients: [] });
    await newFridge.save();
    res.status(201).json(newFridge);
  } catch (error) {
    res.status(500).json({ message: "Error creating fridge" });
  }
};

// Add ingredient to fridge
const addIngredientToFridge = async (req, res) => {
  try {
    const { fridgeId } = req.params;
    const { ingredientId } = req.body;

    const fridge = await Fridge.findById(fridgeId);
    if (!fridge) return res.status(404).json({ message: "Fridge not found" });

    fridge.ingredients.push(ingredientId);
    await fridge.save();

    res.status(200).json(fridge);
  } catch (error) {
    res.status(500).json({ message: "Error adding ingredient" });
  }
};

// Remove ingredient from fridge
const removeIngredientFromFridge = async (req, res) => {
  try {
    const { fridgeId } = req.params;
    const { ingredientId } = req.body;

    const fridge = await Fridge.findById(fridgeId);
    if (!fridge) return res.status(404).json({ message: "Fridge not found" });

    fridge.ingredients = fridge.ingredients.filter(id => id.toString() !== ingredientId);
    await fridge.save();

    res.status(200).json(fridge);
  } catch (error) {
    res.status(500).json({ message: "Error removing ingredient" });
  }
};

module.exports = { getFridges, createFridge, addIngredientToFridge, removeIngredientFromFridge };
