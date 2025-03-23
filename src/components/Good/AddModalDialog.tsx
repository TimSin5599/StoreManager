import {Box, Button, Dialog, FormHelperText, Input, MenuItem, Select, Stack, Typography} from "@mui/material";
import {addProduct} from "../api/goodApi.ts";
import {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {CategoryProps} from "../../store/slices/categoriesReducer.ts";

interface AddModalDialogProps {
    openAddModal: boolean;
    handleCloseAddModal: () => void;
}

export type newProductState = {
    name: string;
    description?: string | null;
    category_id?: number | null;
    image?: string | null;
    quantity: number;
    unit: string;
    price?: number | null;
};

const initialProduct: newProductState = {
    name: "",
    category_id: null,
    description: "",
    image: "",
    unit: "",
    quantity: 0,
    price: null,
}

const AddModalDialog: React.FC<AddModalDialogProps> = ({openAddModal,
                                                       handleCloseAddModal}) => {

    const [newItem, setNewItem] = useState<newProductState>(initialProduct);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    const handleAddItem = () => {
        const newErrors: { [key: string]: boolean } = {};
        Object.entries(newItem).forEach(([key, value]) => {
            if ((value === "" || value === null) && key !== "id" && key !== "image" && key !== "description") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(addProduct({ ...newItem}));
            setNewItem(initialProduct);
            handleCloseAddModal();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem((prev: newProductState) => ({
            ...prev,
            [name]: name === "quantity" || name === "price" ? Number(value) : value,
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
                    key !== "id" && key !== "category_id" && (
                        <Box key={key} display="flex" flexDirection="column" paddingLeft={2} paddingRight={2}>
                            <Input
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                name={key}
                                value={newItem[key as keyof newProductState]}
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
                <Select value={categories.find((c) => c.id === newItem.category_id)?.name} onChange={(e) => setNewItem((prevState) => ({
                    ...prevState,
                    category_id: categories.find((c) => c.name === e.target.value)?.id,
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