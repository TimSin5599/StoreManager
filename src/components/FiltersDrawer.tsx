import React, {useEffect, useState} from 'react';
import {
    Drawer,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Box, Stack, IconButton,
} from '@mui/material';
import {Close} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {fetchCategories} from "./api/categoriesApi.ts";

export type Filters = {
    name: string;
    inStock: boolean;
    category_id?: number | null;
};

interface FiltersDrawerProps {
    open: boolean;
    onClose: () => void;
    onFilter: (filters: Filters) => void;
}

const FiltersDrawer: React.FC<FiltersDrawerProps> = ({ open, onClose, onFilter }) => {
    const categories = useSelector((state: RootState) => state.categories.categories);
    const status = useSelector((state: RootState) => state.categories.status);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategories());
        }
    }, [categories, dispatch]);

    const [filters, setFilters] = useState<Filters>({
        name: "",
        inStock: false,
        category_id: 0,
    });

    const handleFilterChange = <K extends keyof Filters>(key: K, value?: Filters[K]) => {
        console.log(key, value);
        if (value === undefined) {
            setFilters((prev) => ({ ...prev, [key]: key === "inStock" ? false : "" }));
            return;
        }
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onFilter(filters);
    };

    const handleReset = () => {
        setFilters({name: "", inStock: false, category_id: 0});
        onFilter({name: "", inStock: false, category_id: 0});
    };

    return (
        <>
            <Drawer anchor="left"
                    open={open}
                    onClose={onClose}
            >
                <Box padding={2} width="250px">
                    <Stack direction="column" spacing={3}>
                        <Box position="relative">
                            <TextField
                                label="Название товара"
                                value={filters.name}
                                onChange={(e) => handleFilterChange("name", e.target.value)}
                                fullWidth
                            />
                            {filters.name && (
                                <IconButton
                                    onClick={() => handleFilterChange('name')}
                                    size="small"
                                    style={{
                                        position: "absolute",
                                        right: 8,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            )}
                        </Box>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.inStock}
                                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                                />
                            }
                            label="In Stock Only"
                        />

                        <Stack direction="row" alignItems={"center"}>
                            <Select
                                value={filters.category_id}
                                onChange={(e) => handleFilterChange("category_id", Number(e.target.value))}
                                fullWidth
                                displayEmpty
                            >
                                <MenuItem value={0} key={0}>Все категории</MenuItem>
                                {categories.map(category => (
                                    <MenuItem value={category.id!} key={category.id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                            <IconButton
                                onClick={() => handleFilterChange("category_id", 0)}
                                size="small"
                                sx={{
                                    display: 'flex',
                                    marginLeft: 1,
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    },
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Stack>

                        <Button onClick={handleApply} variant="contained" color="primary" fullWidth>
                            Apply
                        </Button>
                        <Button onClick={handleReset} variant="outlined" color="secondary" fullWidth>
                            Reset
                        </Button>
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
};

export default FiltersDrawer;