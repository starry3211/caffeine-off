import React from 'react';
import { BiHomeAlt, BiCoffee, BiShoppingBag, BiBarChart, BiMessageRoundedDots } from 'react-icons/bi';
import './BottomNavigation.css';

const BottomNavigation: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('home');

    return (
        <nav className="bottom-nav">
            <button
                className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
            >
                <BiHomeAlt size={24} />
                <span className="nav-label">홈</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'cafe' ? 'active' : ''}`}
                onClick={() => setActiveTab('cafe')}
            >
                <BiCoffee size={24} />
                <span className="nav-label">카페</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'shop' ? 'active' : ''}`}
                onClick={() => setActiveTab('shop')}
            >
                <BiShoppingBag size={24} />
                <span className="nav-label">쇼핑</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'log' ? 'active' : ''}`}
                onClick={() => setActiveTab('log')}
            >
                <BiBarChart size={24} />
                <span className="nav-label">로그</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'comm' ? 'active' : ''}`}
                onClick={() => setActiveTab('comm')}
            >
                <BiMessageRoundedDots size={24} />
                <span className="nav-label">커뮤</span>
            </button>
        </nav>
    );
};

export default BottomNavigation;
