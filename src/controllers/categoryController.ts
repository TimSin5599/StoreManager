import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Category} from "../models/Category.ts";
import {Product} from "../models/Product.ts";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { name, allowGroups } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }

    try {
        const newCategory = await Category.create({ name, allowGroups });
        res.status(201).json({
            message: 'Category created successfully',
            category: newCategory
        });
    } catch (err) {
        console.error('Database query error:', err);
        next(err);
    }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }

    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        } else {
            category.name = name;
            await category.save();

            res.json({
                message: 'Category updated successfully',
                category
            });
        }
    } catch (err) {
        console.error('Error updating category:', err);
        next(err);
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            res.status(404).json({error: 'Category not found'});
            return;
        }

        const [updatedRows] = await Product.update(
            {category_id: null},
            {where: {category_id: categoryId}}
        );

        console.log("The quantity of updated rows - " + updatedRows);

        await category.destroy();

        res.json({
            message: 'Category deleted successfully',
            categoryId
        });
    } catch (err) {
        console.error('Error deleting category:', err);
        next(err);
    }
}

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        next(err);
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findByPk(categoryId);

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        res.json(category);
    } catch (err) {
        console.error('Error fetching category:', err);
        next(err);
    }
}