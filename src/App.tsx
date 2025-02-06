import Navbar from './components/NavigationBar.tsx';
import FiltersDrawer, {Filters} from './components/FiltersDrawer';
import React, {useState} from "react";
import GoodList from "./components/GoodList.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import GoodDetail from "./components/GoodDetail.tsx";
import {Category} from "@mui/icons-material";
import User from "./components/User.tsx";

const App: React.FC = () => {

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        name: '',
        inStock: false,
        category: '',
    });

    const toggleDrawer = () => setDrawerOpen((prevState) => !prevState);

    const handleFilterApply = (newFilters: Filters) => {
        setFilters(newFilters);
        toggleDrawer();
    };

    return (
        <>
            <Router>
                <Navbar onMenuClick={toggleDrawer} />
                <Routes>
                    <Route path="/" />
                    <Route path="/products" element={
                        <>
                            <GoodList filters={filters} />
                            <FiltersDrawer open={isDrawerOpen}
                                           onClose={toggleDrawer}
                                           onFilter={handleFilterApply} />
                        </>
                    } />
                    <Route path="/product/:id" element={<GoodDetail />} />
                    <Route path="/categories" element={<Category />} />
                    <Route path="/about" element={<User />} />
                </Routes>
            </Router>
            {/*<GoodList filters={filters} />*/}
        </>
    );
};

export default App;