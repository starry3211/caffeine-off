import React, { useState, useEffect } from 'react';
import './CaffeineRecordPopup.css';
import { IoSearchOutline, IoHeart, IoHeartOutline } from 'react-icons/io5';

// Mock Category Data
const BRAND_CATEGORIES: Record<string, string[]> = {
    'starbucks': [
        '콜드브루', '브루드 커피', '에스프레소', '프라푸치노', '블렌디드',
        '스타벅스 리프레셔', '스타벅스 피지오', '티(티바나)',
        '기타 제조 음료', '스타벅스 주스(병음료)'
    ],
    'default': [
        '커피', '티/에이드', '스무디/프라페', '논커피 라떼', '주스/기타'
    ]
};

// Mock Menus per Category
// Mock Menus per Category with Caffeine
interface FranchiseMenu {
    name: string;
    caffeine: number;
}

const CATEGORY_MENUS: Record<string, FranchiseMenu[]> = {
    // Starbucks Specific
    '콜드브루': [
        { name: '나이트로 콜드 브루', caffeine: 245 },
        { name: '돌체 콜드 브루', caffeine: 150 },
        { name: '바닐라 크림 콜드 브루', caffeine: 155 },
        { name: '콜드 브루', caffeine: 150 },
        { name: '오트 콜드 브루', caffeine: 65 },
        { name: '제주 비자림 콜드 브루', caffeine: 105 }
    ],
    '브루드 커피': [
        { name: '오늘의 커피', caffeine: 260 },
        { name: '아이스 커피', caffeine: 140 }
    ],
    '에스프레소': [
        { name: '아메리카노', caffeine: 150 },
        { name: '카페 라떼', caffeine: 75 },
        { name: '카페 모카', caffeine: 95 },
        { name: '카푸치노', caffeine: 75 },
        { name: '카라멜 마키아또', caffeine: 75 },
        { name: '화이트 초콜릿 모카', caffeine: 75 },
        { name: '스타벅스 돌체 라떼', caffeine: 150 },
        { name: '바닐라 빈 라떼', caffeine: 75 },
        { name: '블론드 카페 라떼', caffeine: 85 }
    ],
    '프라푸치노': [
        { name: '자바 칩 프라푸치노', caffeine: 100 },
        { name: '더블 에스프레소 칩 프라푸치노', caffeine: 130 },
        { name: '카라멜 프라푸치노', caffeine: 85 },
        { name: '에스프레소 프라푸치노', caffeine: 120 },
        { name: '제주 말차 크림 프라푸치노', caffeine: 60 },
        { name: '초콜릿 크림 칩 프라푸치노', caffeine: 10 }
    ],
    '블렌디드': [
        { name: '망고 바나나 블렌디드', caffeine: 0 },
        { name: '딸기 딜라이트 요거트 블렌디드', caffeine: 0 },
        { name: '피치 & 레몬 블렌디드', caffeine: 0 }
    ],
    '스타벅스 리프레셔': [
        { name: '딸기 아사이 레모네이드 스타벅스 리프레셔', caffeine: 30 },
        { name: '망고 용과 레모네이드 스타벅스 리프레셔', caffeine: 35 }
    ],
    '스타벅스 피지오': [
        { name: '쿨 라임 피지오', caffeine: 110 },
        { name: '블랙 티 레모네이드 피지오', caffeine: 35 },
        { name: '패션 탱고 티 레모네이드 피지오', caffeine: 0 }
    ],
    '티(티바나)': [
        { name: '자몽 허니 블랙 티', caffeine: 70 },
        { name: '유자 민트 티', caffeine: 0 },
        { name: '제주 유기농 말차 꿀 라떼', caffeine: 60 },
        { name: '얼 그레이 티', caffeine: 50 },
        { name: '히비스커스 블렌드 티', caffeine: 0 }
    ],
    '기타 제조 음료': [
        { name: '시그니처 핫 초콜릿', caffeine: 15 },
        { name: '아이스 시그니처 초콜릿', caffeine: 15 },
        { name: '우유', caffeine: 0 },
        { name: '스팀 우유', caffeine: 0 }
    ],
    '스타벅스 주스(병음료)': [
        { name: '한라봉 가득 핸디 젤리', caffeine: 0 },
        { name: '딸기 가득 요거트', caffeine: 0 },
        { name: '블루베리 요거트', caffeine: 0 }
    ],

    // Default
    '커피': [
        { name: '아메리카노', caffeine: 150 },
        { name: '카페라떼', caffeine: 75 },
        { name: '바닐라 라떼', caffeine: 75 },
        { name: '카페모카', caffeine: 95 },
        { name: '카푸치노', caffeine: 75 },
        { name: '카라멜 마키아또', caffeine: 75 },
        { name: '연유 라떼', caffeine: 80 },
        { name: '콜드브루', caffeine: 180 },
        { name: '아인슈페너', caffeine: 120 }
    ],
    '티/에이드': [
        { name: '아이스티', caffeine: 20 },
        { name: '자몽 에이드', caffeine: 0 },
        { name: '레몬 에이드', caffeine: 0 },
        { name: '청포도 에이드', caffeine: 0 },
        { name: '얼그레이 티', caffeine: 50 },
        { name: '페퍼민트 티', caffeine: 0 },
        { name: '캐모마일 티', caffeine: 0 },
        { name: '유자차', caffeine: 0 }
    ],
    '스무디/프라페': [
        { name: '플레인 요거트 스무디', caffeine: 0 },
        { name: '블루베리 스무디', caffeine: 0 },
        { name: '망고 스무디', caffeine: 0 },
        { name: '딸기 스무디', caffeine: 0 },
        { name: '쿠키 앤 크림 프라페', caffeine: 10 },
        { name: '민트 초코 프라페', caffeine: 50 },
        { name: '녹차 프라페', caffeine: 60 }
    ],
    '논커피 라떼': [
        { name: '초코 라떼', caffeine: 5 },
        { name: '녹차 라떼', caffeine: 60 },
        { name: '고구마 라떼', caffeine: 0 },
        { name: '곡물 라떼', caffeine: 0 },
        { name: '밀크티', caffeine: 80 },
        { name: '토피넛 라떼', caffeine: 10 },
        { name: '딸기 라떼', caffeine: 0 }
    ],
    '주스/기타': [
        { name: '생과일 주스', caffeine: 0 },
        { name: '병음료', caffeine: 0 },
        { name: '스파클링 워터', caffeine: 0 },
        { name: '탄산수', caffeine: 0 }
    ]
};

interface CaffeineRecordPopupProps {
    onClose: () => void;
    onComplete: (data: any) => void;
}


// Mock Franchise Data
const FRANCHISES = [
    { id: 'starbucks', name: '스타벅스', color: '#00704A' },
    { id: 'twosome', name: '투썸플레이스', color: '#D6232E' },
    { id: 'hollys', name: '할리스', color: '#BA000C' },
    { id: 'mega', name: '메가커피', color: '#FFD700' },
    { id: 'compose', name: '컴포즈커피', color: '#FFC800' },
    { id: 'paik', name: '빽다방', color: '#FFE600' },
    { id: 'theventi', name: '더벤티', color: '#4B2E83' },
    { id: 'mammoth', name: '매머드커피', color: '#333333' },
    { id: 'oozy', name: '우지커피', color: '#1D2088' },
];

// Mock Personal Cafe Data
const PERSONAL_CAFES = [
    { id: 'seongsu_lab', name: '성수동 커피랩', address: '서울 성동구' },
    { id: 'blue_house', name: '청와옥 카페', address: '서울 종로구' },
];

interface PersonalMenuItem {
    name: string;
    isVerified: boolean;
    caffeine: number; // < 20 means safe
}

const PERSONAL_MENUS: Record<string, Record<string, PersonalMenuItem[]>> = {
    'seongsu_lab': {
        'Coffee': [
            { name: '디카페인 아메리카노', isVerified: true, caffeine: 5 },
            { name: '디카페인 카페라떼', isVerified: true, caffeine: 10 },
            { name: '아메리카노', isVerified: false, caffeine: 150 }, // For demo
        ],
        'Tea': [
            { name: '얼그레이 티', isVerified: false, caffeine: 40 }, // Unknown/High
            { name: '캐모마일 티', isVerified: true, caffeine: 0 },
        ],
        'Other': [
            { name: '말차 라떼', isVerified: false, caffeine: 60 },
            { name: '초코 라떼', isVerified: true, caffeine: 5 },
        ]
    },
    'blue_house': {
        'Coffee': [
            { name: '순대국리카노', isVerified: false, caffeine: 200 },
            { name: '모닝 커피', isVerified: true, caffeine: 120 },
        ],
        'Tea': [
            { name: '쌍화차', isVerified: true, caffeine: 0 },
        ],
        'Other': [
            { name: '식혜', isVerified: true, caffeine: 0 },
        ]
    }
};

const ITEMS_PER_PAGE = 6;

const CaffeineRecordPopup: React.FC<CaffeineRecordPopupProps> = ({ onClose, onComplete }) => {
    const [activeTab, setActiveTab] = useState('franchise');
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedSize, setSelectedSize] = useState('Tall');
    const [isDecaf, setIsDecaf] = useState(false);

    // New State for Category
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [menuPage, setMenuPage] = useState(0);

    // --- State for Search ---
    const [searchText, setSearchText] = useState('');
    const [franchisePage, setFranchisePage] = useState(0);

    // --- State for Personal Cafe Tab ---
    const [personalSearchText, setPersonalSearchText] = useState('');
    const [selectedPersonalShop, setSelectedPersonalShop] = useState<{ id: string, name: string, address: string } | null>(null);
    const [personalCategory, setPersonalCategory] = useState<'Coffee' | 'Tea' | 'Other'>('Coffee');
    const [selectedPersonalMenu, setSelectedPersonalMenu] = useState<PersonalMenuItem | null>(null);
    const [personalMenuPage, setPersonalMenuPage] = useState(0); // Added for Personal Pagination

    // --- State for Commercial Product Tab (Refactored) ---
    interface CommercialProduct {
        id: string;
        brand: string;
        name: string;
        caffeinePerUnit: number;
        unit: string; // 'stick', 'capsule', 'can', 'ml'
        volume: string; // '0.9g', '5.7g'
    }

    const MOCK_COMMERCIAL_PRODUCTS: CommercialProduct[] = [
        { id: 'cp1', brand: '동서식품', name: '카누 디카페인 아메리카노', caffeinePerUnit: 4, unit: '스틱', volume: '0.9g' },
        { id: 'cp2', brand: '네스프레소', name: '아르페지오 디카페나토', caffeinePerUnit: 2, unit: '캡슐', volume: '5.7g' },
        { id: 'cp3', brand: '스타벅스', name: '디카페인 캐모마일', caffeinePerUnit: 0, unit: '티백', volume: '1.5g' },
        { id: 'cp4', brand: '동서식품', name: '맥심 모카골드', caffeinePerUnit: 42, unit: '스틱', volume: '12g' },
        { id: 'cp5', brand: '몬스터음료', name: '몬스터 에너지', caffeinePerUnit: 100, unit: '캔', volume: '355ml' },
        { id: 'cp6', brand: '핫식스', name: '핫식스 오리지널', caffeinePerUnit: 60, unit: '캔', volume: '250ml' },
        { id: 'cp7', brand: '레드불', name: '레드불 에너지드링크', caffeinePerUnit: 62.5, unit: '캔', volume: '250ml' },
        { id: 'cp8', brand: '조지아', name: '조지아 크래프트 블랙', caffeinePerUnit: 180, unit: '페트병', volume: '470ml' },
        { id: 'cp9', brand: '칸타타', name: '칸타타 프리미엄 라떼', caffeinePerUnit: 110, unit: '캔', volume: '275ml' },
        { id: 'cp10', brand: '서울우유', name: '서울우유 커피포리', caffeinePerUnit: 65, unit: '팩', volume: '200ml' },
        { id: 'cp11', brand: '매일유업', name: '바리스타룰스 로어슈거', caffeinePerUnit: 125, unit: '컵', volume: '250ml' },
        { id: 'cp12', brand: '빙그레', name: '아카펠라 아메리카노', caffeinePerUnit: 105, unit: '페트병', volume: '350ml' },
        { id: 'cp13', brand: '스타벅스', name: '스타벅스 더블샷 에스프레소', caffeinePerUnit: 103, unit: '캔', volume: '200ml' },
        { id: 'cp14', brand: '투썸플레이스', name: '에이리스트 스틱커피', caffeinePerUnit: 60, unit: '스틱', volume: '10g' },
        { id: 'cp15', brand: '이디야', name: '비니스트 오리지널 아메리카노', caffeinePerUnit: 65, unit: '스틱', volume: '1g' },
        { id: 'cp16', brand: '루카스나인', name: '루카스나인 시그니처 더블샷', caffeinePerUnit: 80, unit: '스틱', volume: '14.9g' },
        { id: 'cp17', brand: '맥스웰하우스', name: '마스터 바닐라 블랙', caffeinePerUnit: 160, unit: '페트병', volume: '500ml' },
        { id: 'cp18', brand: 'G7', name: 'G7 블랙 커피', caffeinePerUnit: 60, unit: '스틱', volume: '2g' },
        { id: 'cp19', brand: '일리', name: '일리 스틱 원두커피', caffeinePerUnit: 55, unit: '스틱', volume: '1.6g' },
        { id: 'cp20', brand: '네스카페', name: '네스카페 수프리모', caffeinePerUnit: 50, unit: '스틱', volume: '1.1g' },
    ];

    const [commSearchText, setCommSearchText] = useState('');
    const [selectedCommProduct, setSelectedCommProduct] = useState<CommercialProduct | null>(null);
    const [commQuantity, setCommQuantity] = useState(1);
    const [visibleProductCount, setVisibleProductCount] = useState(10);

    // Filtered Products
    const filteredCommProducts = MOCK_COMMERCIAL_PRODUCTS.filter(p =>
        p.name.includes(commSearchText) || p.brand.includes(commSearchText)
    );

    useEffect(() => {
        setVisibleProductCount(10);
    }, [commSearchText]);

    // Store full object for rendering in Bookmark tab
    type FavoriteItem = {
        shopId: string;
        shopName: string;
        menuName: string;
        isVerified: boolean;
        caffeine: number;
    };
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    const toggleFavorite = () => {
        let newItem: FavoriteItem | null = null;

        if (activeTab === 'personal') {
            if (!selectedPersonalShop || !selectedPersonalMenu) return;
            newItem = {
                shopId: selectedPersonalShop.id,
                shopName: selectedPersonalShop.name,
                menuName: selectedPersonalMenu.name,
                isVerified: selectedPersonalMenu.isVerified,
                caffeine: selectedPersonalMenu.caffeine
            };
        } else if (activeTab === 'franchise') {
            if (!selectedBrand || !selectedMenu) return;
            const brandObj = FRANCHISES.find(f => f.name === selectedBrand);
            newItem = {
                shopId: brandObj?.id || selectedBrand,
                shopName: selectedBrand,
                menuName: selectedMenu,
                isVerified: true, // Default for franchise
                caffeine: 0
            };
        } else if (activeTab === 'product') {
            if (!selectedCommProduct) return;
            newItem = {
                shopId: selectedCommProduct.id,
                shopName: selectedCommProduct.brand,
                menuName: selectedCommProduct.name,
                isVerified: true,
                caffeine: selectedCommProduct.caffeinePerUnit * (commQuantity || 1) // Store total? No, maybe unit? Storing unit is better but for now let's store base
            };
            // Note: If we want to store the PREFERRED quantity, we might need to change FavoriteItem structure. 
            // For now, let's just favorite the "Menu Item" itself.
            newItem.caffeine = selectedCommProduct.caffeinePerUnit;
        }

        if (!newItem) return;

        setFavorites(prev => {
            // Check based on shopName/menuName explicitly if shopId usage varies, but shopId+menuName should be unique enough
            const exists = prev.some(item => (item.shopId === newItem!.shopId || item.shopName === newItem!.shopName) && item.menuName === newItem!.menuName);
            if (exists) {
                return prev.filter(item => !((item.shopId === newItem!.shopId || item.shopName === newItem!.shopName) && item.menuName === newItem!.menuName));
            } else {
                return [...prev, newItem];
            }
        });
    };

    const filteredFranchises = FRANCHISES.filter(brand =>
        brand.name.includes(searchText)
    );

    const FRANCHISE_ITEMS_PER_PAGE = 8;
    const totalFranchisePages = Math.ceil(filteredFranchises.length / FRANCHISE_ITEMS_PER_PAGE);
    const currentFranchisePageItems = filteredFranchises.slice(
        franchisePage * FRANCHISE_ITEMS_PER_PAGE,
        (franchisePage + 1) * FRANCHISE_ITEMS_PER_PAGE
    );

    // Filtered Personal Cafes
    const filteredPersonalCafes = PERSONAL_CAFES.filter(shop =>
        shop.name.includes(personalSearchText)
    );

    // Current Personal Menus
    const currentPersonalMenus = React.useMemo(() => {
        if (!selectedPersonalShop) return [];
        const allMenus = PERSONAL_MENUS[selectedPersonalShop.id]?.[personalCategory] || [];
        const start = personalMenuPage * ITEMS_PER_PAGE;
        return allMenus.slice(start, start + ITEMS_PER_PAGE);
    }, [selectedPersonalShop, personalCategory, personalMenuPage]);

    const totalPersonalMenuPages = React.useMemo(() => {
        if (!selectedPersonalShop) return 0;
        const allMenus = PERSONAL_MENUS[selectedPersonalShop.id]?.[personalCategory] || [];
        return Math.ceil(allMenus.length / ITEMS_PER_PAGE);
    }, [selectedPersonalShop, personalCategory]);

    // Reset personal page on category change
    useEffect(() => {
        setPersonalMenuPage(0);
    }, [personalCategory, selectedPersonalShop]);

    // Reset franchise page when search text changes
    React.useEffect(() => {
        setFranchisePage(0);
    }, [searchText]);

    // --- Swipe for Franchise Grid ---
    const franchiseSwipeStartX = React.useRef(0);

    const onFranchiseMouseDown = (e: React.MouseEvent) => {
        franchiseSwipeStartX.current = e.clientX;
    };

    const onFranchiseMouseUp = (e: React.MouseEvent) => {
        const endX = e.clientX;
        const diff = franchiseSwipeStartX.current - endX;
        const threshold = 50; // min distance for swipe

        if (diff > threshold) {
            // Swiped Left -> Next Page
            if (franchisePage < totalFranchisePages - 1) {
                setFranchisePage(prev => prev + 1);
            }
        } else if (diff < -threshold) {
            // Swiped Right -> Prev Page
            if (franchisePage > 0) {
                setFranchisePage(prev => prev - 1);
            }
        }
    };


    // Determine Categories for selected brand
    const currentCategories = React.useMemo(() => {
        if (!selectedBrand) return [];
        // Check if brand key exists in BRAND_CATEGORIES map based on id or name? 
        // Our FRANCHISES array has 'id' (e.g. 'starbucks'). 
        // selectedBrand is the NAME (e.g. '스타벅스'). We need to map name back to ID or use ID for selection.
        // Let's refactor `FRANCHISES` to helper map or just find it.
        const brandObj = FRANCHISES.find(f => f.name === selectedBrand);
        const brandKey = brandObj?.id || 'default';
        return BRAND_CATEGORIES[brandKey] || BRAND_CATEGORIES['default'];
    }, [selectedBrand]);

    // Effect to reset category when brand changes
    React.useEffect(() => {
        if (selectedBrand && currentCategories.length > 0) {
            setSelectedCategory(currentCategories[0]);
            setMenuPage(0);
        }
    }, [selectedBrand, currentCategories]);

    // Get Menus for current category
    const currentMenus = React.useMemo(() => {
        return CATEGORY_MENUS[selectedCategory] || [];
    }, [selectedCategory]);

    const totalMenuPages = Math.ceil(currentMenus.length / ITEMS_PER_PAGE);
    const currentMenuPageItems = currentMenus.slice(
        menuPage * ITEMS_PER_PAGE,
        (menuPage + 1) * ITEMS_PER_PAGE
    );

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setMenuPage(0);
    };

    // --- Drag to Scroll for Category Chips ---
    const categoryScrollRef = React.useRef<HTMLDivElement>(null);
    const isDraggingCat = React.useRef(false);
    const startXCat = React.useRef(0);
    const scrollLeftCat = React.useRef(0);

    const onCatMouseDown = (e: React.MouseEvent) => {
        if (!categoryScrollRef.current) return;
        isDraggingCat.current = true;
        startXCat.current = e.pageX - categoryScrollRef.current.offsetLeft;
        scrollLeftCat.current = categoryScrollRef.current.scrollLeft;
    };

    const onCatMouseLeave = () => {
        isDraggingCat.current = false;
    };

    const onCatMouseUp = () => {
        isDraggingCat.current = false;
    };

    const onCatMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingCat.current || !categoryScrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - categoryScrollRef.current.offsetLeft;
        const walk = (x - startXCat.current) * 2; // Scroll-fast
        categoryScrollRef.current.scrollLeft = scrollLeftCat.current - walk;
    };


    // --- Swipe for Menu Grid ---
    const swipeStartX = React.useRef(0);

    const onMenuMouseDown = (e: React.MouseEvent) => {
        swipeStartX.current = e.clientX;
    };

    const onMenuMouseUp = (e: React.MouseEvent) => {
        const endX = e.clientX;
        const diff = swipeStartX.current - endX;
        const threshold = 50; // min distance for swipe

        if (diff > threshold) {
            // Swiped Left -> Next Page
            if (menuPage < totalMenuPages - 1) {
                setMenuPage(prev => prev + 1);
            }
        } else if (diff < -threshold) {
            // Swiped Right -> Prev Page
            if (menuPage > 0) {
                setMenuPage(prev => prev - 1);
            }
        }
    };

    // --- Swipe for Personal Menu Grid ---
    const swipePersonalStartX = React.useRef(0);

    const onPersonalMenuMouseDown = (e: React.MouseEvent) => {
        swipePersonalStartX.current = e.clientX;
    };

    const onPersonalMenuMouseUp = (e: React.MouseEvent) => {
        const endX = e.clientX;
        const diff = swipePersonalStartX.current - endX;
        const threshold = 50;

        if (diff > threshold) {
            if (personalMenuPage < totalPersonalMenuPages - 1) {
                setPersonalMenuPage(prev => prev + 1);
            }
        } else if (diff < -threshold) {
            if (personalMenuPage > 0) {
                setPersonalMenuPage(prev => prev - 1);
            }
        }
    };

    // Mock completing
    const handleComplete = () => {
        if (!selectedBrand) {
            alert("브랜드를 선택해 주세요!");
            return;
        }
        onComplete({
            brand: selectedBrand,
            menu: selectedMenu,
            size: selectedSize,
            isDecaf,
            date: new Date()
        });
        onClose();
    };

    return (
        <div className="record-popup-overlay" onClick={onClose}>
            <div className="record-popup-container" onClick={(e) => e.stopPropagation()}>
                {/* 1. Header */}
                <header className="popup-header">
                    <h2 className="popup-title">카페인 기록하기</h2>
                    <p className="popup-subtitle">함께 기록하며 건강한 카페인 섭취를 실천해요</p>
                </header>

                {/* 2. Tabs */}
                <div className="popup-tabs">
                    <div
                        className={`popup-tab ${activeTab === 'franchise' ? 'active' : ''}`}
                        onClick={() => setActiveTab('franchise')}
                    >
                        프랜차이즈
                    </div>
                    <div
                        className={`popup-tab ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        개인 카페
                    </div>
                    <div
                        className={`popup-tab ${activeTab === 'product' ? 'active' : ''}`}
                        onClick={() => setActiveTab('product')}
                    >
                        제품
                    </div>
                    <div
                        className={`popup-tab ${activeTab === 'bookmark' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookmark')}
                    >
                        즐겨찾는 메뉴
                    </div>
                </div>

                {/* Main Content with padding for footer */}
                <div className="popup-content" style={{ paddingBottom: '140px' }}>

                    {/* --- Commercial Product Content --- */}
                    {activeTab === 'product' && (
                        <div className="product-content">

                            {!selectedCommProduct ? (
                                <>
                                    {/* 1. Search */}
                                    <div className="search-container" style={{ position: 'relative', marginBottom: '20px' }}>
                                        <input
                                            type="text"
                                            className="popup-search-box"
                                            placeholder="브랜드 또는 제품명을 입력하세요"
                                            value={commSearchText}
                                            onChange={(e) => setCommSearchText(e.target.value)}
                                        />
                                        <IoSearchOutline style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
                                    </div>


                                    {/* Product List (Filtered or All) - Paginated */}
                                    <div className="personal-menu-list" style={{ marginBottom: '20px' }}>
                                        {filteredCommProducts.slice(0, visibleProductCount).map(prod => (
                                            <div
                                                key={prod.id}
                                                className="p-menu-item"
                                                onClick={() => {
                                                    setSelectedCommProduct(prod);
                                                    setCommQuantity(1);
                                                }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '12px', color: '#888' }}>{prod.brand}</div>
                                                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{prod.name}</div>
                                                </div>
                                                <div style={{ fontSize: '13px', color: '#10353A', fontWeight: 500 }}>
                                                    {prod.caffeinePerUnit}mg <span style={{ fontSize: '11px', color: '#999' }}>/ {prod.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Load More Button */}
                                    {visibleProductCount < filteredCommProducts.length && (
                                        <button
                                            onClick={() => setVisibleProductCount(prev => prev + 10)}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                background: '#f9f9f9',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                color: '#666',
                                                fontSize: '13px',
                                                marginBottom: '10px'
                                            }}
                                        >
                                            더보기 ({visibleProductCount}/{filteredCommProducts.length})
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="selected-product-view">
                                    {/* Selected Product Header */}
                                    <div className="product-header-card" style={{ background: '#F4F8F8', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>{selectedCommProduct.brand}</div>
                                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#10353A' }}>{selectedCommProduct.name}</div>
                                                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{selectedCommProduct.volume} / {selectedCommProduct.unit}</div>

                                                {/* Caffeine Display Added */}
                                                <div style={{
                                                    marginTop: '12px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    background: '#E6F2F2',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    color: '#10353A',
                                                    fontWeight: '700',
                                                    fontSize: '14px'
                                                }}>
                                                    {selectedCommProduct.caffeinePerUnit}mg
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCommProduct(null)}
                                                style={{ padding: '4px 8px', fontSize: '12px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}
                                            >
                                                변경
                                            </button>
                                        </div>
                                    </div>

                                    {/* 3. Consumption Amount */}
                                    <div className="form-section">
                                        <div className="quantity-control-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #eee', padding: '12px 16px', borderRadius: '12px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 600 }}>수량</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <button
                                                    onClick={() => setCommQuantity(prev => Math.max(1, prev - 1))}
                                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', fontSize: '18px', cursor: 'pointer' }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                                                    {commQuantity} <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#888' }}>{selectedCommProduct.unit}</span>
                                                </span>
                                                <button
                                                    onClick={() => setCommQuantity(prev => prev + 1)}
                                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #10353A', background: '#10353A', color: '#fff', fontSize: '18px', cursor: 'pointer' }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. Live Calculation (REMOVED: Moved to Footer) */}

                                    {/* 5. Actions (Record Button REMOVED: Moved to Footer) */}
                                    <div className="action-buttons" style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {/* Record Button Removed */}

                                        <button
                                            className={`btn-save-favorite ${favorites.some(f => f.menuName === selectedCommProduct.name && f.shopId === selectedCommProduct.id) ? 'active' : ''
                                                }`}
                                            style={{ marginTop: 0, background: '#fff', color: '#333', border: '1px solid #ddd' }}
                                            onClick={toggleFavorite}
                                        >
                                            {favorites.some(f => f.menuName === selectedCommProduct.name && f.shopId === selectedCommProduct.id)
                                                ? <><IoHeart size={18} color="#E25C5C" style={{ marginRight: '6px' }} /> 즐겨찾기가 추가되었습니다</>
                                                : <><IoHeartOutline size={18} style={{ marginRight: '6px' }} /> 즐겨찾는 메뉴에 추가</>
                                            }
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* --- Franchise Tab Content --- */}
                    {activeTab === 'franchise' && (
                        <>
                            {/* Search (Moved to Top) */}
                            <div className="search-container" style={{ position: 'relative', marginBottom: '16px' }}>
                                <input
                                    type="text"
                                    className="popup-search-box"
                                    placeholder="브랜드를 입력하세요"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <IoSearchOutline style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
                            </div>

                            {/* Franchise Grid */}
                            <div
                                className="franchise-grid"
                                onMouseDown={onFranchiseMouseDown}
                                onMouseUp={onFranchiseMouseUp}
                            >
                                {Array.from({ length: FRANCHISE_ITEMS_PER_PAGE }).map((_, idx) => {
                                    const brand = currentFranchisePageItems[idx];
                                    if (!brand) {
                                        return <div key={`empty-${idx}`} className="franchise-item" style={{ visibility: 'hidden' }} />;
                                    }
                                    return (
                                        <div
                                            key={brand.id}
                                            className="franchise-item"
                                            onClick={() => setSelectedBrand(brand.name)}
                                        >
                                            <div className="franchise-logo" style={{ border: selectedBrand === brand.name ? '2px solid #10353A' : '1px solid #f0f0f0' }}>
                                                {/* Placeholder for Logo */}
                                                <div style={{ width: '100%', height: '100%', background: brand.color, opacity: 0.2 }}></div>
                                            </div>
                                            <span className="franchise-name" style={{ fontWeight: selectedBrand === brand.name ? 'bold' : 'normal' }}>{brand.name}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Franchise Pagination Dots */}
                            {totalFranchisePages > 1 && (
                                <div className="menu-pagination" style={{ marginTop: '16px' }}>
                                    {Array.from({ length: totalFranchisePages }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`pagination-dot ${franchisePage === idx ? 'active' : ''}`}
                                            onClick={() => setFranchisePage(idx)}
                                        />
                                    ))}
                                </div>
                            )}

                        </>
                    )}

                    {/* 4. Detailed Settings (Franchise) */}
                    {selectedBrand && activeTab === 'franchise' && (
                        <div className="record-settings">
                            {/* ... Franchise Settings ... */}
                        </div>
                    )}

                    {/* --- Personal Cafe Content --- */}
                    {activeTab === 'personal' && (
                        <div className="personal-content">
                            {/* 1. Shop Search / Selection */}
                            {!selectedPersonalShop ? (
                                <div className="personal-search-section">
                                    <div className="search-container" style={{ position: 'relative', marginBottom: '16px' }}>
                                        <input
                                            type="text"
                                            className="popup-search-box"
                                            placeholder="카페 이름을 입력하세요"
                                            value={personalSearchText}
                                            onChange={(e) => setPersonalSearchText(e.target.value)}
                                        />
                                        <IoSearchOutline style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
                                    </div>
                                    <div className="shop-list">
                                        {filteredPersonalCafes.map(shop => (
                                            <div
                                                key={shop.id}
                                                className="shop-list-item"
                                                onClick={() => setSelectedPersonalShop(shop)}
                                            >
                                                <div className="shop-icon">☕</div>
                                                <div className="shop-info">
                                                    <span className="shop-name">{shop.name}</span>
                                                    <span className="shop-addr">{shop.address}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="selected-shop-view">
                                    {/* Header with Change Button */}
                                    <div className="shop-header-row">
                                        <h3 className="selected-shop-title">{selectedPersonalShop.name}</h3>
                                        <button className="btn-change-shop" onClick={() => {
                                            setSelectedPersonalShop(null);
                                            setSelectedPersonalMenu(null);
                                        }}>매장 변경</button>
                                    </div>

                                    {/* 2. Drink Category Tabs */}
                                    <div className="personal-category-tabs">
                                        {(['Coffee', 'Tea', 'Other'] as const).map(cat => (
                                            <button
                                                key={cat}
                                                className={`p-cat-tab ${personalCategory === cat ? 'active' : ''}`}
                                                onClick={() => setPersonalCategory(cat)}
                                            >
                                                {cat === 'Other' ? '기타 음료' : (cat === 'Coffee' ? '커피' : '티')}
                                            </button>
                                        ))}
                                    </div>

                                    {/* 3. Menu List */}
                                    {/* 3. Menu List (Grid Style) */}
                                    <div
                                        className="menu-grid"
                                        onMouseDown={onPersonalMenuMouseDown}
                                        onMouseUp={onPersonalMenuMouseUp}
                                    >
                                        {currentPersonalMenus.map((menu, idx) => (
                                            <button
                                                key={idx}
                                                className={`menu-btn ${selectedPersonalMenu?.name === menu.name ? 'selected' : ''}`}
                                                onClick={() => setSelectedPersonalMenu(menu)}
                                            >
                                                <span className="menu-name">{menu.name}</span>
                                                <span className="menu-caffeine-badge">{menu.caffeine}mg</span>
                                            </button>
                                        ))}
                                    </div>
                                    {currentPersonalMenus.length === 0 && (
                                        <div className="empty-menu-msg">등록된 메뉴가 없습니다.</div>
                                    )}

                                    {/* Personal Pagination Dots */}
                                    {totalPersonalMenuPages > 1 && (
                                        <div className="menu-pagination">
                                            {Array.from({ length: totalPersonalMenuPages }).map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`pagination-dot ${personalMenuPage === idx ? 'active' : ''}`}
                                                    onClick={() => setPersonalMenuPage(idx)}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* 4. Verification Info (REMOVED) */}

                                    {/* 5. Favorites Button */}
                                    <button
                                        className={`btn-save-favorite ${selectedPersonalShop && selectedPersonalMenu &&
                                            favorites.some(f => f.shopId === selectedPersonalShop.id && f.menuName === selectedPersonalMenu.name)
                                            ? 'active'
                                            : ''
                                            }`}
                                        onClick={toggleFavorite}
                                        disabled={!selectedPersonalMenu}
                                        style={!selectedPersonalMenu ? { opacity: 0.5, cursor: 'not-allowed', background: '#ccc', marginTop: '24px' } : { marginTop: '24px' }}
                                    >
                                        {!selectedPersonalMenu
                                            ? '메뉴를 선택해주세요'
                                            : (favorites.some(f => f.shopId === selectedPersonalShop!.id && f.menuName === selectedPersonalMenu.name)
                                                ? <><IoHeart size={18} style={{ marginRight: '6px' }} /> 즐겨찾는 메뉴</>
                                                : <><IoHeartOutline size={18} style={{ marginRight: '6px' }} /> 즐겨찾는 메뉴</>)
                                        }
                                    </button>
                                </div>
                            )}
                        </div>
                    )}


                    {/* --- Personal Cafe Content --- */}

                    {/* --- Bookmark (Favorites) Tab Content --- */}
                    {activeTab === 'bookmark' && (
                        <div className="bookmark-content" style={{ padding: '0 20px 20px' }}>
                            {favorites.length === 0 ? (
                                <div className="empty-message" style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                                    <p>즐겨찾는 메뉴가 아직 없네요<br />즐겨찾는 메뉴를 등록해 보세요!</p>
                                </div>
                            ) : (
                                <div className="favorite-list">
                                    {favorites.map((fav, idx) => (
                                        <div key={`${fav.shopId}-${fav.menuName}-${idx}`} className="p-menu-item" style={{ cursor: 'default' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{fav.shopName}</div>
                                                <div className="p-menu-name" style={{ fontWeight: 600 }}>{fav.menuName}</div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                                <span className={`p-menu-badge ${fav.isVerified ? 'verified' : 'unverified'}`}>
                                                    {fav.isVerified ? '✅ 검증됨' : '⚠️ 미검증'}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        setFavorites(prev => prev.filter(item => !(item.shopId === fav.shopId && item.menuName === fav.menuName)));
                                                    }}
                                                    style={{ border: 'none', background: 'transparent', color: '#999', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer' }}
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 4. Detailed Settings (Shown when brand selected) */}
                    {selectedBrand && activeTab === 'franchise' && (
                        <div className="record-settings">
                            <div className="setting-row" style={{ display: 'block' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
                                    <span className="selected-brand-badge">{selectedBrand}</span>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>메뉴 선택</span>
                                </div>

                                {/* Category Chips */}
                                <div
                                    className="category-scroll-container"
                                    ref={categoryScrollRef}
                                    onMouseDown={onCatMouseDown}
                                    onMouseLeave={onCatMouseLeave}
                                    onMouseUp={onCatMouseUp}
                                    onMouseMove={onCatMouseMove}
                                >
                                    {currentCategories.map(category => (
                                        <button
                                            key={category}
                                            className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                                            onClick={() => {
                                                // Prevent click if we were dragging (simple heuristic: generic click is fine, 
                                                // but usually we want to distinguish. 
                                                // If we had a drag state exposed, we could check it.
                                                // For this simplified version, let's assume quick clicks.)
                                                handleCategoryChange(category);
                                            }}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                <div
                                    className="menu-grid"
                                    onMouseDown={onMenuMouseDown}
                                    onMouseUp={onMenuMouseUp}
                                >
                                    {currentMenuPageItems.map(menu => (
                                        <button
                                            key={menu.name}
                                            className={`menu-btn ${selectedMenu === menu.name ? 'selected' : ''}`}
                                            onClick={() => setSelectedMenu(menu.name)}
                                        >
                                            <span className="menu-name">{menu.name}</span>
                                            <span className="menu-caffeine-badge">{menu.caffeine}mg</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Pagination Dots */}
                                {totalMenuPages > 1 && (
                                    <div className="menu-pagination">
                                        {Array.from({ length: totalMenuPages }).map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`pagination-dot ${menuPage === idx ? 'active' : ''}`}
                                                onClick={() => setMenuPage(idx)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="setting-row">
                                <div className="size-options">
                                    {['Tall', 'Grande', 'Venti'].map(size => (
                                        <button
                                            key={size}
                                            className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="setting-row">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#333' }}>
                                    <input
                                        type="checkbox"
                                        checked={isDecaf}
                                        onChange={(e) => setIsDecaf(e.target.checked)}
                                        style={{ width: '18px', height: '18px', accentColor: '#10353A' }}
                                    />
                                    디카페인 변경
                                </label>
                                <span style={{ fontSize: '13px', color: '#888' }}>
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            {/* Favorites Button for Franchise */}
                            <button
                                className={`btn-save-favorite ${selectedBrand && selectedMenu &&
                                    favorites.some(f => (f.shopId === selectedBrand || f.shopName === selectedBrand) && f.menuName === selectedMenu)
                                    ? 'active'
                                    : ''
                                    }`}
                                onClick={toggleFavorite}
                                disabled={!selectedMenu}
                                style={!selectedMenu ? { opacity: 0.5, cursor: 'not-allowed', background: '#ccc' } : {}}
                            >
                                {!selectedMenu
                                    ? '메뉴를 선택해주세요'
                                    : (favorites.some(f => (f.shopId === selectedBrand || f.shopName === selectedBrand) && f.menuName === selectedMenu)
                                        ? <><IoHeart size={18} style={{ marginRight: '6px' }} /> 즐겨찾는 메뉴</>
                                        : <><IoHeartOutline size={18} style={{ marginRight: '6px' }} /> 즐겨찾는 메뉴</>)
                                }
                            </button>
                        </div>
                    )}
                </div>

                {/* Fixed Footer */}
                <div className="popup-fixed-footer">
                    <div className="caffeine-summary-row">
                        <span className="caffeine-summary-label">총 카페인 함량</span>
                        <div className="caffeine-summary-value">
                            {(() => {
                                let total = 0;
                                if (activeTab === 'franchise') {
                                    if (selectedBrand && selectedMenu) {
                                        // Search in all categories to find the match
                                        let found = null;
                                        for (const cat in CATEGORY_MENUS) {
                                            const match = CATEGORY_MENUS[cat].find(m => m.name === selectedMenu);
                                            if (match) {
                                                found = match;
                                                break;
                                            }
                                        }
                                        total = found ? found.caffeine : 0;
                                    }
                                } else if (activeTab === 'product' && selectedCommProduct) {
                                    total = selectedCommProduct.caffeinePerUnit * commQuantity;
                                } else if (activeTab === 'personal' && selectedPersonalMenu) {
                                    total = selectedPersonalMenu.caffeine;
                                }
                                return total;
                            })()}
                            <small> mg</small>
                        </div>
                    </div>

                    <div className="footer-btn-row">
                        <button className="footer-btn btn-cancel" onClick={onClose}>
                            취소
                        </button>
                        <button
                            className="footer-btn btn-record"
                            onClick={handleComplete}
                            disabled={
                                (activeTab === 'franchise' && (!selectedBrand || !selectedMenu)) ||
                                (activeTab === 'personal' && (!selectedPersonalShop || !selectedPersonalMenu)) ||
                                (activeTab === 'product' && !selectedCommProduct)
                            }
                        >
                            기록하기
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CaffeineRecordPopup;
