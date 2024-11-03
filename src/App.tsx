import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import { Product } from './components/ProductCard.tsx';
import productData from './data/products.json';
import NavigationBar from "./components/NavigationBar.tsx";
import './App.css'
import ProductModal from "./components/ProductModal.tsx";

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        setProducts(productData);
    }, []);

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="App">
            <NavigationBar/>
            <div className="content">
                <h1>Product List</h1>
                <ProductList products={products} onCardClick={handleCardClick} />
                {isModalOpen && selectedProduct && (
                    <ProductModal product={selectedProduct} onClose={handleCloseModal} />
                )}
            </div>
        </div>
    );
};

export default App;