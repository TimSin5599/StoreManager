import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {categories} from "../../data/categories.tsx";
import {v4} from "uuid";


export interface CategoryProps {
    id: string;
    name: string;
}

const initializeCategories = categories.map((category) => ({
    ...category,
    id: v4(),
}));

type CategoriesState = CategoryProps[];

const initialState: CategoriesState = initializeCategories;
export const removeCategoryFromProducts = createAction<string>("products/removeCategoryFromProducts");

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<CategoryProps>) => {
            state.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            return state.filter(category => category.name !== action.payload);
        },
        changeCategory: (state, action: PayloadAction<CategoryProps>) => {
            const index = state.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state[index].name = action.payload.name;
            }
        }
    }
})

export default categoriesSlice.reducer;
export const {addCategory, removeCategory, changeCategory} = categoriesSlice.actions;