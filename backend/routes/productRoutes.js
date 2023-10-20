import express from "express";
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from "../models/productModel.js";


// Route for all products, the /api/products is not needed; it is in the server.js file(get all)
router.get('/', asyncHandler(async (req,res) => {
    const products = await Product.find({});    //Passing in empty object, because that will get al lof them
    res.json(products);
}));

// Route for a single product(Get one)
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        // If product is not found:
        res.status(404);
        throw new Error("Resource not found")
    }
}));




export default router;