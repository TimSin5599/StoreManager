import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory
} from "../controllers/categoryController.ts";
import {middleware} from "./productRoutes.ts";

const categoryRouter = express.Router();

categoryRouter.use(middleware)

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteCategory);
categoryRouter.put('/:id', updateCategory);

export default categoryRouter;