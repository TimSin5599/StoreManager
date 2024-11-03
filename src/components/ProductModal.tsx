import React from 'react';
import {imageNone, Product} from "./ProductCard.tsx";
import './ProductModal.css'

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-product">
                    <h3>{product.name}</h3>
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="modal-image" />
                    ) : (
                        <img src={imageNone} alt={"Image not available"} className="modal-image" />
                    )}
                    <p>{product.description}</p>
                    <p>Category: {product.category}</p>
                    <p>Quantity: {product.quantity} {product.unit}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;