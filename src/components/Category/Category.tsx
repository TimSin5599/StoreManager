import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {Button, Dialog, FormHelperText, Input, Stack, Typography} from "@mui/material";
import {
    CategoryProps,
    changeCategory,
    removeCategory,
    removeCategoryFromProducts
} from "../../store/slices/categoriesReducer.ts";
import {useState} from "react";
import CategoryConfirm from "./CategoryConfirm.tsx";


const Category: React.FC<CategoryProps> = (category) => {
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [newCategory, setNewCategory] = useState<CategoryProps>(category)
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const products = useSelector((state: RootState) => state.products);
    // const categories = useSelector((state: RootState) => state.categories);
    const dispatch: AppDispatch = useDispatch();

    const handleChange = () => {
        setOpen(!open);
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewCategory((prevState) => ({
            ...prevState,
            name: value
        }))
    }

    const handleChangeCategory = () => {
        const newErrors: { [key: string]: boolean } = {};
        Object.entries(newCategory).forEach(([key, value]) => {
            if (value === "" && key !== "id") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(changeCategory({ ...newCategory}));
            handleChange();
        }
    }

    const handleRemove = () => {
        const isUseCategory = products.some(product => product.category === category.name);

        if (isUseCategory) {
            setOpenConfirm(true);
        } else {
            dispatch(removeCategory(category.name));
            dispatch(removeCategoryFromProducts(category.name));
            setOpenConfirm(false);
        }
    }

    const handleRemoveConfirm = () => {
        dispatch(removeCategory(category.name));
        dispatch(removeCategoryFromProducts(category.name));
        setOpenConfirm(false);
    }

    return (
        <Stack direction={"row"} gap={2} justifyContent={"space-between"} width="100%" alignItems={"center"}>
            <Typography variant={"h6"} color={"black"} sx={{ marginLeft: 4 }}>{category.name}</Typography>
            <Stack direction={"row"} gap={2} >
                <Button variant={"contained"} color={"secondary"} onClick={handleChange}>Change</Button>
                <Button variant={"contained"} color={"primary"} onClick={handleRemove}>Remove</Button>
                <CategoryConfirm open={openConfirm} onClose={() => setOpenConfirm(false)} onConfirm={handleRemoveConfirm} category={category} />
            </Stack>

            <Dialog open={open} onClose={handleChange}
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
                    <Typography alignSelf={"center"} fontSize={20}  fontWeight={"bold"}>Changing Category</Typography>
                    <Input value={newCategory.name} onChange={handleChangeInput}></Input>
                    {errors['name'] && (
                        <FormHelperText error>Category name cannot be empty</FormHelperText>
                    )}
                    <Button variant={"contained"} color={"primary"} onClick={handleChangeCategory}>Change</Button>
                </Stack>
            </Dialog>
        </Stack>
        /*
        <Stack gap={3} direction="column" alignItems="center" justifyContent="center" sx={{height: '80vh'}}>
            <Typography fontSize={20} fontWeight={"bold"}>Category list:</Typography>
            <Stack direction={"column"} gap={2} justifyContent={"center"} alignItems="center">
                {categories.map((category: CategoryProps) => (
                    <Stack direction={"row"} gap={2} justifyContent={"space-between"} width="100%" alignItems={"center"}>
                        <Typography variant={"h6"} color={"black"} sx={{ marginLeft: 4 }}>{category.name}</Typography>
                        <Stack direction={"row"} gap={2} >
                            <Button variant={"contained"} color={"secondary"} onClick={handleChange}>Change</Button>
                            <Button variant={"contained"} color={"primary"} onClick={() => handleRemove(category.id)}>Remove</Button>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Button variant={"contained"} color={"primary"} onClick={handleChange}>Add category</Button>

            <Dialog open={open} onClose={handleChange}
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
                    <Input placeholder={"Category"} onChange={(e) => setNewCategory(e.target)}></Input>
                    {errors[key] && (
                        <FormHelperText error>{key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty</FormHelperText>
                    )}
                    <Button variant={"contained"} color={"primary"} onClick={handleAddCategory}>Add</Button>
                </Stack>
            </Dialog>
        </Stack>
        */
    )
}

export default Category;