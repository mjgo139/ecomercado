import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createCategory, deleteCategory, getCategories, getCategory, updateCateory } from "../controllers/category.controller.js";
const router = Router()

router.get('/category',authRequired, getCategories);
router.get('/category/:id',authRequired, getCategory);
router.post('/category',authRequired, createCategory);
router.delete('/category/:id',authRequired, deleteCategory);
router.put('/category/:id',authRequired, updateCateory);

export default router