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

// Create or Update Fridge
const updateFridge = async (req, res) => {
  try {
    const { ingredients } = req.body;

    let fridge = await Fridge.findOne({ user: req.user.userId });

    if (fridge) {
      // Update existing fridge
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

module.exports = { getFridge, createFridge, updateFridge, deleteFridge };
