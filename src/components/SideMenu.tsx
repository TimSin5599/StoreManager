import './SideMenu.css';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import {useState} from "react";

interface SideMenuProps {
    isOpen: boolean;
    onToggle: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onToggle }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showInStock, setShowInStock] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCheckboxChange = () => {
        setShowInStock(!showInStock);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className={`side-menu ${isOpen ? 'open' : 'closed'}`}>
            <div className="side-menu-indicator" onClick={onToggle}>
                <HiOutlineMenuAlt2 style={{fontSize: '24px', color: 'white', cursor: 'pointer', margin: '10px'}}/>
            </div>

            <div className="side-menu-header">
                <span className="menu-title">Menu</span>
                <button className="close-btn" onClick={onToggle}>×</button>
            </div>

            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
                className="search-input"
            />

            <label>
                <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={handleCheckboxChange}
                />
                Only available
            </label>

            <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="toys">Toys</option>
            </select>
        </div>
    );
};

export default SideMenu;