import React from 'react';
import { IoCafeOutline, IoBagHandleOutline, IoBarChartOutline } from 'react-icons/io5';
import './BottomNavigation.css';

interface BottomNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
    const tabs = ['home', 'cafe', 'shop', 'log', 'comm'];
    const activeIndex = tabs.indexOf(activeTab);

    return (
        <nav
            className="bottom-nav"
            style={{ '--active-index': activeIndex } as React.CSSProperties}
        >
            <div className="nav-background"></div>
            <div className="nav-indicator-dot"></div>

            <button
                className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => onTabChange('home')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M15.29 20.663h3.017a2.194 2.194 0 0 0 2.193-2.194v-6.454a3.3 3.3 0 0 0-1.13-2.48l-5.93-5.166a2.194 2.194 0 0 0-2.88 0L4.63 9.534a3.3 3.3 0 0 0-1.13 2.481v6.454c0 1.212.982 2.194 2.194 2.194h3.29m6.306 0v-6.581c0-.908-.736-1.645-1.645-1.645H10.63c-.909 0-1.645.737-1.645 1.645v6.581m6.306 0H8.984" />
                </svg>
                <span className="nav-label">홈</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'cafe' ? 'active' : ''}`}
                onClick={() => onTabChange('cafe')}
            >
                <IoCafeOutline size={24} />
                <span className="nav-label">카페</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'shop' ? 'active' : ''}`}
                onClick={() => onTabChange('shop')}
            >
                <IoBagHandleOutline size={24} />
                <span className="nav-label">쇼핑</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'log' ? 'active' : ''}`}
                onClick={() => onTabChange('log')}
            >
                <IoBarChartOutline size={24} />
                <span className="nav-label">기록</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'comm' ? 'active' : ''}`}
                onClick={() => onTabChange('comm')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.5 19.5v-7a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v7M5.5 9.5V6a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v3.5M2.5 16h19" />
                </svg>
                <span className="nav-label">라운지</span>
            </button>
        </nav>
    );
};

export default BottomNavigation;
