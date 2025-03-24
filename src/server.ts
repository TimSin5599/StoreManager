import { createServer } from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import cors from 'cors';
import passport from "passport";
import categoryRouter from "./routes/categoryRoutes.ts";
import authRouter from "./routes/authRouter.ts";
import errorHandler from "./utils/errorHandler.ts";
import productRouter, {middleware} from "./routes/productRoutes.ts";

dotenv.config();

const app = express();
const server = createServer(app);

const PORT = process.env.PORT!;
console.log(`Server running on port: ${PORT}`);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT,
    credentials: true,
}))


app.use('/api/auth', authRouter)
app.use('/api/products', middleware, passport.authenticate('jwt', { session: false }), productRouter);
app.use('/api/categories', middleware, passport.authenticate('jwt', { session: false }), categoryRouter);
app.use(errorHandler);


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
