import React from 'react';
import './ProductCard.css'

export interface Product {
    id: number;
    name: string;
    description?: string;
    category?: string;
    quantity: number;
    unit: string;
    image?: string;
}

interface ProductCardProps {
    product: Product;
    onCardClick: () => void;
}
export const imageNone = "https://www.clipartsuggest.com/images/181/log-in-sign-up-upload-clipart-o72BVQ-clipart.png";

const ProductCard: React.FC<ProductCardProps> = ({product, onCardClick}) => {

    return (
        <div className="product-card" onClick={onCardClick}>
            {product.image ? (
                <img src={product.image} alt={product.name}/>
            ) : (
                <img src={imageNone}
                     alt={"Photo missing"}></img>
            )}
            <h3 style={{fontWeight: 'bold'}}>{product.name}</h3>
            {product.description ? (<p>{product.description}</p>) : (<p>Description missing</p>)}
            {product.category ? (<p>Category: {product.category}</p>) : (<p>Category: -</p>)}
            <p>Quantity: {product.quantity} {product.unit}</p>
        </div>
    );
};

export default ProductCard;