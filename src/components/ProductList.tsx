import React from 'react';
import ProductCard, { Product } from './ProductCard';
import './ProductList.css';

export interface ProductListProps {
    products: Product[];
    onCardClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onCardClick }) => {


    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onCardClick={() => onCardClick(product)}>
                </ProductCard>
            ))}
        </div>
    );
};

export default ProductList;