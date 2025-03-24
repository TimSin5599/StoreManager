import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryProps} from "../../store/slices/categoriesReducer.ts";

export const fetchCategories = createAsyncThunk<CategoryProps[], void>('categories/fetchCategories',
    async () => {
        const response = await fetch('http://localhost:3000/api/categories/', {
                method: 'GET',
                credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return await response.json();
});

export const updateCategory = createAsyncThunk<CategoryProps, CategoryProps>('categories/updateCategory',
    async (category: CategoryProps) => {
        const response = await fetch('http://localhost:3000/api/categories/' + category.id,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(category),
                credentials: "include",
            }
        );

        if (!response.ok) {
            // const message: {error: string} = await response.json();
            throw new Error(`Ошибка: ${response.status}`);
        }

        const message: {message: string; category: CategoryProps} = await response.json();

        console.log(message.message);

        return message.category;
});

export const createCategory = createAsyncThunk<CategoryProps, {name: string, allowGroups: string[]}>('categories/createCategory',
    async (Category: {name: string, allowGroups: string[]}) => {
        const response = await fetch('http://localhost:3000/api/categories/',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Category),
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const message: {message: string; category: CategoryProps} = await response.json();

        console.log(message.message);

        return message.category;
});

export const removeCategory = createAsyncThunk<number, CategoryProps>('categories/removeCategory',
    async (category: CategoryProps) => {
        const response = await fetch('http://localhost:3000/api/categories/' + category.id,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const message: {message: string} = await response.json();
        console.log(message.message);

        return category.id!;
});