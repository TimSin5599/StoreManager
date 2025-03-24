import jwt from 'jsonwebtoken';
import { jwtSecret } from './passport.ts';
import User from "../models/User.ts";

export const generateAccessToken = (user: User) => {
    if (!user.id) throw new Error('User ID is undefined');
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email, group: user.group, avatarUrl: user.avatarUrl },
        jwtSecret,
        { expiresIn: '15m', algorithm: 'HS256' },
    );
};

export const generateRefreshToken = (user: User) => {
    if (!user.id) throw new Error('User ID is undefined');
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email, group: user.group, avatarUrl: user.avatarUrl },
        jwtSecret,
        { expiresIn: '7d', algorithm: 'HS256' },
    );
};