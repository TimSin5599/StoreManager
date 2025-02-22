import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory
} from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories)
categoryRouter.get('/:id', getCategory)
categoryRouter.post('/', createCategory)
categoryRouter.delete('/:id', deleteCategory)
categoryRouter.put('/:id', updateCategory)

export default categoryRouter;