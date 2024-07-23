import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createProduct, deleteProduct, getProductsByCategory, getProductsById, getProductsByStore, updateProduct } from "../controllers/product.controller.js";
import upload from "../middlewares/upload.js";

const router = Router()

router.get('/products/category/:id',authRequired, getProductsByCategory);
router.get('/products/store/:id', getProductsByStore);
router.get('/products/:id',authRequired, getProductsById);
router.post('/products',authRequired, upload.single('photo'), createProduct);
router.delete('/products/:id',authRequired, deleteProduct);
router.put('/products/:id',authRequired, upload.single('photo'), updateProduct);

export default router