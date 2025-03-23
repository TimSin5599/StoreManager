import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createCategory,
    fetchCategories,
    removeCategory,
    updateCategory
} from "../../components/api/categoriesApi.ts";

export interface CategoryProps {
    id: number | null;
    name: string;
}

type CategoriesState = {
    categories: CategoryProps[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null;
};

const initialState: CategoriesState = {
    categories: [],
    status: 'idle',
    error: null,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        // addCategory: (state, action: PayloadAction<CategoryProps>) => {
        //     state.categories.push(action.payload);
        // },
        // removeCategory: (state, action: PayloadAction<string>) => {
        //     state.categories = state.categories.filter(category => category.name !== action.payload);
        // },
        // changeCategory: (state, action: PayloadAction<CategoryProps>) => {
        //     const index = state.categories.findIndex(category => category.id === action.payload.id);
        //     if (index !== -1) {
        //         state.categories[index].name = action.payload.name;
        //     }
        // }
    },
    extraReducers: builder => {
        builder

            // Fetching categories
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryProps[]>) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error";
            })

            // Creating category
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<CategoryProps>) => {
                state.categories.push(action.payload as CategoryProps);
            })
            .addCase(createCategory.rejected, (_, action) => {
                console.log(action.error.message);
            })

            // Updating category
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<CategoryProps>) => {
                const index = state.categories.findIndex(category => category.id === action.payload.id);

                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (_, action) => {
                console.log(action.error.message);
            })

            // Removing category
            .addCase(removeCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.categories = state.categories.filter((category) => category.id !== action.payload)
            })
            .addCase(removeCategory.rejected, (_, action) => {
                console.log(action.error.message);
            })
    }
})

export default categoriesSlice.reducer;
// export const {addCategory, removeCategory, changeCategory} = categoriesSlice.actions;