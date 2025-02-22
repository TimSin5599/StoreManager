import { createServer } from 'http';
import express from 'express';
import productRouter from "./routes/productRoutes";
import categoryRouter from "./routes/categoryRoutes";
import errorHandler from "./utils/errorHandler";

const app = express();
const server = createServer(app);

const PORT = 3000;

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use(errorHandler);


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
