import {sequelize} from "../db.ts";
import {DataTypes, Model} from "sequelize";

export class Category extends Model {
    name!: string;
    allowGroups?: string[];
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    allowGroups: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
        defaultValue: ['admin'],
    }
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
});