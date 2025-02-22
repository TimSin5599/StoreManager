import {NextFunction, Request, Response} from 'express';
import {Category} from "../models/Category";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const newCategory = await Category.create({ name });
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
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
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
            return res.status(404).json({ error: 'Category not found' });
        }

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
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        next(err);
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json(category);
    } catch (err) {
        console.error('Error fetching category:', err);
        next(err);
    }
}