import {Box, Button, Dialog, FormHelperText, Input, MenuItem, Select, Stack, Typography} from "@mui/material";
import {addProduct} from "../../store/slices/goodsReducer.ts";
import {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {Product} from "./GoodCard.tsx";
import React, {useState} from "react";
import {v4} from "uuid";
import {CategoryProps} from "../../store/slices/categoriesReducer.ts";

interface AddModalDialogProps {
    openAddModal: boolean;
    handleCloseAddModal: () => void;
}

const initialProduct = {
    id: "",
    name: "",
    category: "",
    description: "",
    image: "",
    unit: "",
    quantity: 0
}

const AddModalDialog: React.FC<AddModalDialogProps> = ({openAddModal,
                                                       handleCloseAddModal}) => {

    const [newItem, setNewItem] = useState<Product>(initialProduct);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories);

    const handleAddItem = () => {
        const newErrors: { [key: string]: boolean } = {};
        Object.entries(newItem).forEach(([key, value]) => {
            if ((value === "" || value === null) && key !== "id" && key !== "image" && key !== "description") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(addProduct({ ...newItem, id: v4()}));
            setNewItem(initialProduct);
            handleCloseAddModal();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem((prev: Product) => ({
            ...prev,
            [name]: name === "quantity" ? Number(value) : value,
        }));
    }

    return (
        <Dialog open={openAddModal} onClose={handleCloseAddModal}
        PaperProps={{
            sx: {
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                borderRadius: 2,
            },
        }} fullWidth>
            <Stack gap={1} padding={2}>
                <Typography marginTop={2} align="center" fontSize={20} fontFamily={"sans-serif"} fontWeight={"bold"} mb={2}>Adding Good</Typography>
                {Object.keys(newItem).map((key) => (
                    key !== "id" && key !== "category" && (
                        <Box key={key} display="flex" flexDirection="column" paddingLeft={2} paddingRight={2}>
                            <Input
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                name={key}
                                value={newItem[key as keyof Product]}
                                onChange={handleChange}
                                error={errors[key]}
                                fullWidth
                                type={key === "quantity" ? "number" : "text"}
                            />
                            {errors[key] && (key !== "image" && key !== "description" && key !== "category") && (
                                <FormHelperText error>{key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty</FormHelperText>
                            )}
                        </Box>
                    )
                ))}
                <Select value={newItem.category} onChange={(e) => setNewItem((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                } ))} style={{ marginLeft: 15, marginRight: 15 }}>
                    {categories.map((category: CategoryProps) => (
                        <MenuItem key={category.id} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                {errors['category'] && (
                    <FormHelperText error style={{marginLeft: 15}}>Category cannot be empty</FormHelperText>
                )}
                <Button onClick={handleAddItem} variant="contained" color="secondary" style={{alignSelf: "center", margin: 10, width: "min-content", height: "auto"}}>Save</Button>
            </Stack>
        </Dialog>
    );
}

export default AddModalDialog;