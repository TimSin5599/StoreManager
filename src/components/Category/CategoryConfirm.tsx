import {CategoryProps} from "../../store/slices/categoriesReducer.ts";
import {Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface CategoryConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    category: CategoryProps;
}

const CategoryConfirm: React.FC<CategoryConfirmProps> = ({open, onClose, onConfirm, category}) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle color={"black"} variant={"h5"} align={"center"}>Removing category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы уверены, что хотите удалить категорию {category.name}?<br/>
                    Все товары, относящиеся к ней, останутся без категории.
                </DialogContentText>
            </DialogContent>
            <Box justifyContent={"space-between"} width="100%" display="flex" padding={2}>
                <Button onClick={onClose} color="primary" variant={"contained"}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">Remove</Button>
            </Box>
        </Dialog>
    );
};

export default CategoryConfirm;