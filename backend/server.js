require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const ingredientsRoutes = require("./routes/ingredientRoutes");
const fridgeRoutes = require("./routes/fridgeRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const shoppingListRoutes = require("./routes/shoppingListRoutes");

// Initialize express with middlewares
const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/fridge", fridgeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shopping-list", shoppingListRoutes);

//connect to mongodb
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}` );
    });
})
.catch((error) => console.error("MongoDB connection error:", error));