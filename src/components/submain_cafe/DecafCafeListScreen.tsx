import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DecafCafeListScreen.css';
import { BiTargetLock, BiChevronDown } from 'react-icons/bi';
import { IoSearchOutline } from 'react-icons/io5';
import GlobalNavigation from '../main/GlobalNavigation';

interface CafeItem {
    id: number;
    brand: string;
    menu: string;
    caffeine: number;
}

const DecafCafeListScreen: React.FC = () => {
    const [items, setItems] = useState<CafeItem[]>([]);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    // UI States
    const [sortMode, setSortMode] = useState<'popular' | 'distance'>('popular');
    const [isCoffeeOnly, setIsCoffeeOnly] = useState(true);

    // Initial load
    useEffect(() => {
        loadMoreItems(true);
    }, []);

    const loadMoreItems = (reset = false) => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const newItems: CafeItem[] = Array.from({ length: 10 }).map((_, i) => ({
                id: Date.now() + i,
                brand: '스타벅스', // Mock data
                menu: '디카페인 아메리카노',
                caffeine: 5 + Math.floor(Math.random() * 10)
            }));

            setItems(prev => reset ? newItems : [...prev, ...newItems]);
            setLoading(false);
        }, 800);
    };

    const lastItemRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMoreItems();
            }
        });

        if (node) observer.current.observe(node);
    }, [loading]);

    return (
        <div className="decaf-cafe-screen">
            <GlobalNavigation />

            <header className="screen-header">
                <h2 className="screen-title">Cafe</h2>
                <p className="screen-subtitle">디카페인 커피나 티가 준비되어 있는 카페예요!</p>
            </header>

            <div className="controls-section">
                {/* Coffee Only Toggle */}
                <div className="coffee-toggle-wrapper">
                    <span className="sub-toggle-label">Coffee only</span>
                    <button
                        className={`sub-toggle-switch ${isCoffeeOnly ? 'active' : ''}`}
                        onClick={() => setIsCoffeeOnly(!isCoffeeOnly)}
                        aria-label="Toggle coffee only"
                    >
                        <div className="sub-toggle-knob" />
                    </button>
                </div>

                {/* Sort & Location Controls */}
                <div className="ranking-controls">
                    <div className="location-row">
                        <button className="location-btn current">
                            <BiTargetLock size={16} />
                            현위치
                        </button>
                        <span className="location-divider">|</span>
                        <button className="location-btn region">
                            연남동 <BiChevronDown size={16} />
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="search-container" style={{ position: 'relative', margin: '16px 20px 0' }}>
                        <input
                            type="text"
                            className="popup-search-box"
                            placeholder="카페 또는 메뉴 검색"
                        />
                        <IoSearchOutline style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '20px' }} />
                    </div>
                </div>

                <div className="cafe-list-container">
                    <div className="shop-list-header" style={{ paddingTop: '16px' }}>
                        <span className="product-count">총 {items.length}개</span>
                        <div className="sort-select-wrapper">
                            <select
                                className="sort-select"
                                value={sortMode}
                                onChange={(e) => setSortMode(e.target.value as 'popular' | 'distance')}
                            >
                                <option value="popular">인기순</option>
                                <option value="distance">거리순</option>
                            </select>
                        </div>
                    </div>
                    {items.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="cafe-list-item"
                            ref={index === items.length - 1 ? lastItemRef : undefined}
                        >
                            <div className="item-icon">
                                <div className="brand-logo-placeholder">
                                    {item.brand[0]}
                                </div>
                            </div>
                            <div className="item-info">
                                <div className="rank-brand-row">
                                    <span className="item-brand">{item.brand}</span>
                                    <span className="location-badge">내주변</span>
                                </div>
                                <div className="item-menu">
                                    {item.menu} <span className="item-caffeine">({item.caffeine}mg)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && <div className="loading-indicator">목록을 불러오는 중...</div>}
                </div>
            </div>
        </div>
    );
};

export default DecafCafeListScreen;
