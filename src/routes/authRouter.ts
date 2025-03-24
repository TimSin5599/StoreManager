import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.ts";
import {generateAccessToken, generateRefreshToken} from "../auth/jwt.ts";
import {jwtSecret} from "../auth/passport.ts";
import {middleware} from "./productRoutes.ts";

const authRouter = express.Router();

authRouter.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}});

        if (user) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json(user);
            return;
        }
    } catch (err) {
        console.error('Database query error:', err);
    }
});

authRouter.get('/:id', async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching product:', err);
        next(err);
    }
})

authRouter.post('/register', async (req, res) => {
    const { username, email, password, group, avatarUrl } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Email уже используется' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            group: group || 'user',
            avatarUrl,
        });

        res.status(201).json({ message: 'Пользователь создан', userId: newUser.id });
    } catch (err) {
        console.error('Ошибка при регистрации:', err);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

authRouter.get('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken);

    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, jwtSecret);
            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
                const user = await User.findByPk(decoded.id);
                if (!user) {
                    return;
                }

                const accessToken = generateAccessToken(user);

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 15 * 60 * 1000,
                });

                res.status(200).json({accessToken});

            }
            return;
        } catch (err) {
            console.error(err);
        }
    }
})

authRouter.post('/logout', middleware, passport.authenticate("jwt", {session: false}), (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: "strict" });
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ message: 'Logged out' });
    return;
})

export default authRouter;