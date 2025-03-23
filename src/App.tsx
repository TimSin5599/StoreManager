import Navbar from './components/NavigationBar.tsx';
import FiltersDrawer, {Filters} from './components/FiltersDrawer';
import React, {useState} from "react";
import GoodList from "./components/Good/GoodList.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router';
import GoodDetail from "./components/Good/GoodDetail.tsx";
import User, {UserProps} from "./components/User.tsx";
import CategoryList from "./components/Category/CategoryList.tsx";
import Authorization from "./components/auth/Authorization.tsx";

const App: React.FC = () => {
    const user: UserProps = JSON.parse(localStorage.getItem('user') as string);

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        name: '',
        inStock: false,
        category_id: null,
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
                    {user.group === "admin" && (
                        <Route path="/categories" element={<CategoryList />} />
                    )}
                    <Route path="/about" element={<User />} />
                    <Route path="/auth/login" element={<Authorization />} />
                    <Route
                        path="/"
                        element={<Navigate to="/login" />}
                    />
                </Routes>
            </Router>

        </>
    );
};

export default App;