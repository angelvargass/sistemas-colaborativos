import express from 'express';
import { createProduct, deleteProduct, readProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

// Route: /api/products

router.post("/", createProduct);
router.get("/", readProducts);
router.put("/:id", updateProduct); 
router.delete("/:id", deleteProduct);

export default router;