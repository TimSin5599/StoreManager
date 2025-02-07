import {Box, Button, Dialog, FormHelperText, Input, Typography} from "@mui/material";
import {addProduct} from "../../store/slices/goodsReducer.ts";
import {AppDispatch} from "../../store";
import {useDispatch} from "react-redux";
import {Product} from "./GoodCard.tsx";
import {useState} from "react";
import {v4} from "uuid";

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

    const handleAddItem = () => {
        const newErrors: { [key: string]: boolean } = {};
        Object.entries(newItem).forEach(([key, value]) => {
            if (value === "" && key !== "id") {
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
            <Typography marginTop={2} align="center" fontSize={20} fontFamily={"sans-serif"} fontWeight={"bold"} mb={2}>Adding Good</Typography>
            {Object.keys(newItem).map((key) => (
                key !== "id" && (
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
                        {errors[key] && (
                            <FormHelperText error>{key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty</FormHelperText>
                        )}
                    </Box>
                )
            ))}
            <Button onClick={handleAddItem} variant="contained" color="secondary" style={{alignSelf: "center", margin: 10, width: "min-content", height: "auto"}}>Save</Button>
        </Dialog>
    );
}

export default AddModalDialog;