import React, { useState } from 'react';
import './ShoppingHome.css';
import { PRODUCTS, Product } from '../main/CommerceSection';
import GlobalNavigation from '../main/GlobalNavigation';
import CommonProductCard from '../common/CommonProductCard';

const FILTER_DATA = {
    process: {
        label: "공법",
        options: ["SWP 공법", "CO2 공법", "임산부 안심", "유기농 인증"]
    },
    type: {
        label: "방식",
        options: ["원두/홀빈", "캡슐 커피", "커피 스틱", "드립백/티백", "RTD"]
    },
    taste: {
        label: "맛",
        options: ["고소한/너티", "화사한/산미", "다크 로스트", "디저트 조화"]
    }
};

const SORT_OPTIONS = ["카페인 낮은순", "인기순", "가격 낮은순", "신상품순"];

const ShoppingHome: React.FC<{ initialTab?: string; onProductClick?: (product: Product) => void }> = ({ initialTab, onProductClick }) => {
    // Local state for products
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [activeTab, setActiveTab] = useState(initialTab || '🌙 디카페인');

    // Sync tab when prop changes
    React.useEffect(() => {
        if (initialTab) setActiveTab(initialTab);
    }, [initialTab]);

    // Scroll to top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter State
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({
        process: '',
        type: '',
        taste: '',
        sort: '함량 낮은순'
    });

    const TABS = ["🌙 디카페인", "🫧 Low 카페인", "🌿 릴렉스 티"];

    const TAB_CONTENT: { [key: string]: { slogan: string; keywords: string[]; desc: string } } = {
        "🌙 디카페인": {
            slogan: "카페인은 끄고, 깊은 휴식의 스위치를 켜세요",
            keywords: ["#잔류카페인최소화", "#숙면가이드", "#미드나잇"],
            desc: "커피의 풍미는 유지하되 카페인은 아주 미량만 남겼습니다. 수면에 미치는 영향을 최소화하여, 숙면시간이 가까워진 시간, 커피 한 잔이 간절한 순간에 즐겨보세요"
        },
        "🫧 Low 카페인": {
            slogan: "두근거림 없는 몰입, 기분 좋은 활력만 남기세요",
            keywords: ["#일상의활력", "#마일드각성", "#몰입"],
            desc: "일반 커피 대비 카페인 수치를 절반 이하로 낮추어, 카페인 브레이크(급격한 피로) 없이 은은하고 지속적인 집중력을 도와줍니다."
        },
        "🌿 릴렉스 티": {
            slogan: "민감한 마음까지 차분하게 토닥이는 시간",
            keywords: ["#마음안정", "#무카페인티", "#순수한휴식"],
            desc: "카페인에 유독 민감한 날에도 안심할 수 있도록, 엄선된 허브와 천연 원료로 마음의 긴장을 부드럽게 풀어주는 '자극 없는 쉼표'입니다."
        }
    };

    const toggleHeart = (id: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, isHearted: !product.isHearted } : product
            )
        );
    };

    const handleFilterClick = (category: string) => {
        setOpenFilter(prev => prev === category ? null : category);
    };

    const handleOptionSelect = (category: string, option: string) => {
        setSelectedFilters(prev => ({
            ...prev,
            [category]: prev[category] === option ? '' : option
        }));
        setOpenFilter(null); // Close after selection
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilters(prev => ({ ...prev, sort: e.target.value }));
    };

    const removeFilter = (category: string) => {
        setSelectedFilters(prev => ({ ...prev, [category]: '' }));
    };

    const resetFilters = () => {
        setSelectedFilters({
            process: '',
            type: '',
            taste: '',
            sort: '함량 낮은순'
        });
        setOpenFilter(null);
    };

    // Filter Logic (Mock)
    const filteredProducts = products;

    // Drag Scroll Logic
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const isDown = React.useRef(false);
    const startX = React.useRef(0);
    const scrollLeft = React.useRef(0);
    const isDragging = React.useRef(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown.current = true;
        if (scrollRef.current) {
            startX.current = e.pageX - scrollRef.current.offsetLeft;
            scrollLeft.current = scrollRef.current.scrollLeft;
        }
        isDragging.current = false;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDown.current = false;
        setTimeout(() => { isDragging.current = false; }, 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current) return;
        e.preventDefault();
        if (scrollRef.current) {
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX.current) * 2; // scroll-fast
            scrollRef.current.scrollLeft = scrollLeft.current - walk;
            if (Math.abs(walk) > 5) isDragging.current = true;
        }
    };

    // Wrap handleFilterClick to block if dragging
    const onFilterClick = (key: string) => {
        if (isDragging.current) return;
        handleFilterClick(key);
    };

    return (
        <div className="shopping-home-screen">
            <GlobalNavigation />

            <header className="screen-header">
                <h2 className="screen-title">Shopping</h2>

                {/* Category Tabs */}
                <div className="category-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dynamic Tab Content Info */}
                <div className="tab-info-section">
                    <p className="tab-slogan">{TAB_CONTENT[activeTab]?.slogan}</p>
                    <div className="tab-keywords">
                        {TAB_CONTENT[activeTab]?.keywords.map((kw, i) => (
                            <span key={i} className="tab-keyword">{kw}</span>
                        ))}
                    </div>
                    <p className="tab-desc">{TAB_CONTENT[activeTab]?.desc}</p>
                </div>
            </header>

            {/* Section: Precision Filter Chips (Replaces Slider & Banner) */}
            <section className="precision-filter-section">
                {/* Dimming Layer (Right Side) */}
                <div className="filter-dimming-layer"></div>

                {/* Reset Button (Top Right) */}
                <button
                    className="filter-reset-btn"
                    onClick={resetFilters}
                    aria-label="초기화"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </button>

                {/* Top Row: Filter Categories */}
                <div
                    className="filter-category-row"
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {Object.entries(FILTER_DATA).map(([key, data]) => (
                        <button
                            key={key}
                            className={`filter-category-btn ${selectedFilters[key] ? 'active' : ''} ${openFilter === key ? 'open' : ''}`}
                            onClick={() => onFilterClick(key)}
                        >
                            {selectedFilters[key] ? `${data.label}: ${selectedFilters[key]}` : data.label}
                            {selectedFilters[key] && <span className="filter-remove" onClick={(e) => { e.stopPropagation(); removeFilter(key); }}>ⓧ</span>}
                            {!selectedFilters[key] && <span className="filter-arrow">▼</span>}
                        </button>
                    ))}
                </div>

                {/* Sub Row: Filter Options (Expandable) */}
                {openFilter && (
                    <div className="filter-options-panel">
                        {FILTER_DATA[openFilter as keyof typeof FILTER_DATA].options.map(option => (
                            <button
                                key={option}
                                className={`filter-option-chip ${selectedFilters[openFilter] === option ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(openFilter, option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* Section 4: Product List */}
            <section className="shop-product-list">
                <div className="shop-list-header">
                    <span className="product-count">총 {filteredProducts.length}개</span>
                    <div className="sort-select-wrapper">
                        <select
                            className="sort-select"
                            value={selectedFilters.sort}
                            onChange={handleSortChange}
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <CommonProductCard key={product.id} product={product} toggleHeart={toggleHeart} onClick={onProductClick} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ShoppingHome;
