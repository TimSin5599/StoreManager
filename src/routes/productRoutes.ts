import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct
} from "../controllers/productController.ts";
import jwt from "jsonwebtoken";
import {jwtSecret} from "../auth/passport.ts";
import User from "../models/User.ts";
import {generateAccessToken} from "../auth/jwt.ts";

const productRouter = express.Router();

export const middleware = async (req: any, res: any, next: any) => {
    const accessToken = req.cookies['accessToken'];
    const refreshToken = req.cookies['refreshToken'];

    if (!accessToken && !refreshToken) {
        res.status(401).json({ message: 'Не авторизован' });
        return;
    }

    try {
        const decoded = jwt.verify(accessToken, jwtSecret);
        req.user = decoded;
        return next();
    } catch (err) {
        if (!refreshToken) {
            res.status(401).json({ message: 'Требуется повторная авторизация' });
            return;
        }

        try {
            const decodedRefresh = jwt.verify(refreshToken, jwtSecret) as jwt.JwtPayload;
            const user = await User.findByPk(decodedRefresh.id);

            if (!user) {
                res.status(401).json({ message: 'Пользователь не найден' });
                return;
            }

            const newAccessToken = generateAccessToken(user);
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 15 * 60 * 1000,
            });

            req.user = { id: user.id };
            next();
        } catch (refreshErr) {
            res.status(401).json({ message: 'Refresh токен недействителен' });
            next();
            return;
        }
    }
};

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', createProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);



export default productRouter;