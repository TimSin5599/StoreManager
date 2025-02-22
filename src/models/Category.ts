import {sequelize} from "../db";
import {DataTypes, Model} from "sequelize";

export class Category extends Model {
    name!: string;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
});