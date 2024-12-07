import React, {useMemo, useState} from 'react';
import ProductCard, {Product} from './ProductCard';
import {Box, Pagination} from "@mui/material";
import {products} from "../data/products.tsx";
import {Filters} from "./FiltersDrawer.tsx";

const ITEMS_PER_PAGE = 14;

const ProductList: React.FC<({ filters: Filters })> = ({ filters }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesName = filters.name
                ? product.name.toLowerCase().includes(filters.name.toLowerCase())
                : true;
            const matchesCategory = filters.category
                ? product.category === filters.category
                : true;
            const matchesStock = filters.inStock ? product.quantity > 0 : true;

            return matchesName && matchesCategory && matchesStock;
        });
    }, [filters]);

    const paginatedProducts = useMemo(() => {
        return filteredProducts.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    return (
        <Box padding={2} >
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(150px, 150px))" gap={2}>
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product as Product} />
                ))}
            </Box>
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination
                    count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default ProductList;