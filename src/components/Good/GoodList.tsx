import React, {useMemo, useState} from 'react';
import GoodCard, {Product} from './GoodCard.tsx';
import {Box, Button, Pagination} from "@mui/material";
import {Filters} from "../FiltersDrawer.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import AddModalDialog from "./AddModalDialog.tsx";

const ITEMS_PER_PAGE = 14;

const GoodList: React.FC<({ filters: Filters })> = ({ filters }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const products = useSelector((state: RootState) => state.products);

    // AddModalDialog for adding products
    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const filteredProducts = useMemo(() => {
        return products.filter((product: Product) => {
            const matchesName = filters.name
                ? product.name.toLowerCase().includes(filters.name.toLowerCase())
                : true;
            const matchesCategory = filters.category
                ? product.category === filters.category
                : true;
            const matchesStock = filters.inStock ? product.quantity > 0 : true;

            return matchesName && matchesCategory && matchesStock;
        });
    }, [filters, products]);

    const paginatedProducts = useMemo(() => {
        return filteredProducts.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    return (
        <Box padding={2} justifyContent={"center"} alignItems="center">
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 150px))" gap={2} justifyContent={"center"} alignItems="center">
                {paginatedProducts.map((product: Product) => (
                    <GoodCard key={product.id} product={product as Product} />
                ))}
            </Box>
            <Box display="block" justifyContent="center" marginTop={2} alignItems="center" style={{placeItems: "center"}}>
                <Button onClick={handleOpenAddModal} variant="contained" color="primary" style={{placeItems: "center", borderRadius: 10}}>
                    Add Good
                </Button>
                <Pagination
                    count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
                    style={{marginTop: 10}}
                />
            </Box>
            <AddModalDialog openAddModal={openAddModal} handleCloseAddModal={handleCloseAddModal} />
        </Box>
    );
};

export default GoodList;