import Navbar from './components/NavigationBar.tsx';
import FiltersDrawer, {Filters} from './components/FiltersDrawer';
import React, {useState} from "react";
import ProductList from "./components/ProductList.tsx";

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
            <Navbar onMenuClick={toggleDrawer} />
            <FiltersDrawer open={isDrawerOpen}
                           onClose={toggleDrawer}
                           onFilter={handleFilterApply} />
            <ProductList filters={filters} />
        </>
    );
};

export default App;