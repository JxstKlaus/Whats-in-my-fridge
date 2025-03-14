const express = require("express");
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers); // Get all users
router.get("/:id", getUserById); // Get single user by ID
router.post("/", createUser); // Create user
router.put("/:id", updateUser); // Update user
router.delete("/:id", deleteUser); // Delete user

module.exports = router;
