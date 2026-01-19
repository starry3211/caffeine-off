import React from 'react';
import { BiHomeAlt, BiCoffee, BiShoppingBag, BiBarChart, BiMessageRoundedDots } from 'react-icons/bi';
import './BottomNavigation.css';

interface BottomNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="bottom-nav">
            <button
                className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => onTabChange('home')}
            >
                <BiHomeAlt size={24} />
                <span className="nav-label">홈</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'cafe' ? 'active' : ''}`}
                onClick={() => onTabChange('cafe')}
            >
                <BiCoffee size={24} />
                <span className="nav-label">카페</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'shop' ? 'active' : ''}`}
                onClick={() => onTabChange('shop')}
            >
                <BiShoppingBag size={24} />
                <span className="nav-label">쇼핑</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'log' ? 'active' : ''}`}
                onClick={() => onTabChange('log')}
            >
                <BiBarChart size={24} />
                <span className="nav-label">로그</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'comm' ? 'active' : ''}`}
                onClick={() => onTabChange('comm')}
            >
                <BiMessageRoundedDots size={24} />
                <span className="nav-label">커뮤</span>
            </button>
        </nav>
    );
};

export default BottomNavigation;
