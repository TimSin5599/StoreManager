import React from 'react';
import './ProductCard.css'

export interface Product {
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
    onClick: () => void; // Обработчик клика
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div className="product-card" onClick={onClick}>
            <h3 style={{ fontWeight: 'bold' }}>{product.name}</h3>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Quantity: {product.quantity} {product.unit}</p>
            {product.image ? (
                <img src={product.image} alt={product.name} />
            ) : (
                <img src={"https://www.clipartsuggest.com/images/181/log-in-sign-up-upload-clipart-o72BVQ-clipart.png"}></img>
            )}
        </div>
    );
};

export default ProductCard;