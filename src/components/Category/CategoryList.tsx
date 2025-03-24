import Category from "./Category.tsx";
import {Button, Dialog, FormHelperText, Input, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {CategoryProps} from "../../store/slices/categoriesReducer.ts";
import {useEffect, useState} from "react";
import {createCategory, fetchCategories} from "../api/categoriesApi.ts";
import {Navigate} from "react-router";

const CategoryList = () => {
    // const categorySelector = useSelector((state: RootState) => {state.categories});
    const user = JSON.parse(localStorage.getItem("user") as string);
    const dispatch: AppDispatch = useDispatch();
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [newCategory, setNewCategory] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const categories = useSelector((state: RootState) => state.categories.categories);
    const status = useSelector((state: RootState) => state.categories.status);

    useEffect(() => {
        if (status == "idle") {
            dispatch(fetchCategories());
        }
    }, [status, dispatch])

    const handleAddCategory = () => {
        const newErrors: { [key: string]: boolean } = {};
        Object.entries(newCategory).forEach(([key, value]) => {
            if (value === "" && key !== "id") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(createCategory({name: newCategory, allowGroups: [user.group]}));
            setNewCategory("");
            setOpen(false);
        }
    }

    if (status == "failed") {
        return (<Navigate to={"/auth/login"} />)
    }

    return (
        <Stack gap={3} direction="column" alignItems="center" justifyContent="center" sx={{height: '80vh'}}>
            <Typography fontSize={20} fontWeight={"bold"}>Category list:</Typography>
            <Stack direction={"column"} gap={2} justifyContent={"center"} alignItems="center">
                {categories.map((category: CategoryProps) => {
                    if (category.allowGroups?.includes(user.group) || user.group === "admin") {
                        return (
                        <Category key={category.id} id={category.id} name={category.name} />)
                    }
                })}
            </Stack>

            <Button variant={"contained"} color={"primary"} onClick={() => setOpen(true)}>Add category</Button>

            <Dialog open={open} onClose={() => setOpen(!open)}
                    PaperProps={{
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                            borderRadius: 2,
                            minWidth: "min-content",
                            width: "fit-content",
                            padding: 4,
                        },
                    }} fullWidth>
                <Stack direction="column" alignItems={"center"} gap={2}>
                    <Typography alignSelf={"center"} fontSize={20}  fontWeight={"bold"}>Adding Category</Typography>
                    <Input placeholder={"Category"} onChange={(e) => setNewCategory(e.target.value)}></Input>
                    {errors['name'] && (
                        <FormHelperText error>Category name cannot be empty</FormHelperText>
                    )}
                    <Button variant={"contained"} color={"primary"} onClick={handleAddCategory}>Add</Button>
                </Stack>
            </Dialog>
        </Stack>
    )
}

export default CategoryList;