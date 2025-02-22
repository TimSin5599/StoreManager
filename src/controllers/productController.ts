import {NextFunction, Request, Response} from 'express';
import {Product} from "../models/Product";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        next(err);
    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        next(err);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, category_id, image, quantity, unit, price } = req.body;

        if (!name || !quantity || !unit) {
            res.status(400).json({ error: 'Fields \"name\", \"quantity\", and \"unit\" are required' });
            return;
        }

        if (quantity < 0 || (price !== undefined && price < 0)) {
            res.status(400).json({ error: 'Quantity and price must be non-negative' });
            return;
        }

        const product = await Product.create({
            name,
            description: description || null,
            category_id: category_id || null,
            image: image || null,
            quantity: quantity,
            unit,
            price: price || null
        });

        res.status(201).json({ message: 'Product created successfully', product: product.toJSON() });
    } catch (err) {
        console.error('Database query error:', err);
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { id }
        });

        if (deleted === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Database query error:', err);
        next(err);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, description, category_id, image, quantity, unit, price } = req.body;

        if (!name || !quantity || !unit) {
            res.status(400).json({ error: 'Fields "name", "quantity", and "unit" are required' });
            return;
        }

        if (isNaN(quantity) || quantity < 0) {
            res.status(400).json({ error: 'Quantity must be a non-negative integer' });
            return;
        }

        if (price !== null && price < 0) {
            res.status(400).json({ error: 'Price must be a non-negative number' });
            return;
        }

        const [updated] = await Product.update(
            {
                name: name,
                description: description || null,
                category_id: category_id || null,
                image: image || null,
                quantity: quantity,
                unit: unit,
                price: price,
            },
            {
                where: { id },
                returning: true // Получим обновленную запись
            }
        );

        if (updated === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        const updatedProduct = await Product.findByPk(id);
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        console.error('Database query error:', err);
        next(err);
    }
}
