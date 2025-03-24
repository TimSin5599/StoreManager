import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME!,
    process.env.DATABASE_USER!,
    process.env.DATABASE_PASSWORD!,
    {
        host: process.env.DATABASE_HOST,  // 'db' внутри Docker
        dialect: 'postgres',
    }
    // dialect: "postgres",
    // database: process.env.DATABASE_NAME,
);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('User table created or updated');
    })
    .catch((err) => {
        console.error('Error creating User table:', err);
    });