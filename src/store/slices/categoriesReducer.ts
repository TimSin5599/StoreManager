import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {categories} from "../../data/categories.tsx";
import {v4} from "uuid";


export interface Category {
    id: string;
    category: string;
}

const initializeCategories = categories.map((category) => ({
    ...category,
    id: v4(),
}));

type CategoriesState = Category[];

const initialState: CategoriesState = initializeCategories;

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            return state.filter(category => category.id !== action.payload);
        },
        changeCategory: (state, action: PayloadAction<Category>) => {
            const index = state.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
})

export default categoriesSlice.reducer;
export const {addCategory, removeCategory, changeCategory} = categoriesSlice.actions;