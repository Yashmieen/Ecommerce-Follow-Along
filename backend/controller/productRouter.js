const express = require("express");
const router = express.Router(); // ✅ Define the router at the beginning
const {Product} = require("../controller/productSchema");
const authenticate = require("../middleware/auth");
const upload = require("../multer");


// Add Product Route
router.post("/add", authenticate, upload.array("images", 5), async (req, res) => {
    try {
        console.log("Uploaded files:", req.files); // Debugging

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized! User not authenticated." });
        }

        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required." });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ message: "Price must be a valid positive number." });
        }

        const imagePaths = req.files.map(file => file.filename);
        const product = new Product({ name, price, images: imagePaths, userId: req.user._id });

        await product.save();
        res.status(201).json({ message: "Product added successfully!", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get All Products Route
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router; // ✅ Ensure router is exported
