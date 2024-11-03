import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import { Product } from './components/ProductCard.tsx';
import productData from './data/products.json';
import NavigationBar from "./components/NavigationBar.tsx";
import './App.css'

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(productData);
    }, []);

    const handleCardClick = (product: Product) => {
        console.log('Product clicked:', product);
    };

    return (
        <div className="App">
            <NavigationBar/>
            <div className="content">
                <h1>Product List</h1>
                <ProductList products={products} onCardClick={handleCardClick} />
            </div>
        </div>
    );
};

export default App;