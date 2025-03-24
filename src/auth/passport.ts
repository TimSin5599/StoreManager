import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';
import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from '../models/User.ts';
import dotenv from "dotenv";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET!;

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        return req.cookies['accessToken']
    }]),
    secretOrKey: jwtSecret,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findByPk(jwt_payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return done(null, false, { message: 'No user found with this email' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// const refresh = async (refreshToken: string) => {
//     try {
//         const decoded = jwt.verify(refreshToken, jwtSecret);
//         if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
//             const user = await User.findByPk(decoded.id);
//             if (!user) {
//                 return null;
//             }
//
//             return generateAccessToken(user);
//         }
//         return null;
//     } catch (err) {
//         console.error(err);
//     }
// }