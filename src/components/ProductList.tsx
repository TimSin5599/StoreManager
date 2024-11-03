import React from 'react';
import ProductCard, {Product} from './ProductCard';
import './ProductList.css'

export interface ProductListProps {
    products: Product[];
    onCardClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onCardClick }) => {
    return (
        <div className="product-list">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} onClick={() => onCardClick(product)} />
            ))}
        </div>
    );
};

export default ProductList;