import { useState } from 'react';
import GlobalNavigation from './components/main/GlobalNavigation';
import HeroSection from './components/main/HeroSection';
import ServiceToggle from './components/main/ServiceToggle';
import QuickCuration from './components/main/QuickCuration';
import CafeRanking from './components/main/CafeRanking';
import CommerceSection from './components/main/CommerceSection';
import WikiSection from './components/main/WikiSection';
import BottomNavigation from './components/main/BottomNavigation';
import DecafCafeListScreen from './components/submain_cafe/DecafCafeListScreen';
import CommunityScreen from './components/submain_comm/CommunityScreen';
import ShoppingHome from './components/submain_shop/ShoppingHome';
import ProductDetailPage from './components/submain_shop/ProductDetailPage';
import { Product } from './components/main/CommerceSection';
import FloatingRecordBtn from './components/common/FloatingRecordBtn';
import CaffeineLogScreen, { CaffeineRecord } from './components/submain_log/CaffeineLogScreen';
import CaffeineRecordPopup from './components/popup/CaffeineRecordPopup';
import './index.css';

function App() {
    const [activeMode, setActiveMode] = useState<'cafe' | 'home'>('cafe');
    const [currentTab, setCurrentTab] = useState('home');
    const [shopInitialTab, setShopInitialTab] = useState('🌙 디카페인');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isRecordPopupOpen, setIsRecordPopupOpen] = useState(false);
    const [caffeineRecords, setCaffeineRecords] = useState<CaffeineRecord[]>([]);
    const [editingRecord, setEditingRecord] = useState<CaffeineRecord | null>(null);

    const [isCoffeeOnly, setIsCoffeeOnly] = useState(false);

    // Shared State for Caffeine Status
    const [maxIntake, setMaxIntake] = useState(300);

    // Calculate Today's Caffeine Intake
    const todayCaffeineIntake = caffeineRecords
        .filter(record => {
            const d = new Date(record.date);
            const now = new Date();
            return d.getFullYear() === now.getFullYear() &&
                d.getMonth() === now.getMonth() &&
                d.getDate() === now.getDate();
        })
        .reduce((sum, record) => sum + record.caffeine, 0);

    const handleNavigateToShop = (tabName?: string) => {
        if (tabName) setShopInitialTab(tabName);
        setCurrentTab('shop');
        setSelectedProduct(null); // Clear selected product when switching tabs
    };

    // Better back navigation:
    const [previousTab, setPreviousTab] = useState('home');

    const openProductDetail = (product: Product) => {
        setPreviousTab(currentTab);
        setSelectedProduct(product);
        setCurrentTab('product-detail');
    };

    const handleRecordComplete = (data: any) => {
        // If data has an ID (passed from edit flow), update existing
        if (data.id) {
            setCaffeineRecords(prev => prev.map(r =>
                r.id === data.id ? {
                    ...r,
                    brand: data.brand,
                    menu: data.menu,
                    size: data.size,
                    caffeine: data.caffeine,
                    isDecaf: data.isDecaf,
                    // keep original date if not passed, or update if user wants to change time (currently popup sets `date: new Date()`)
                    // The popup sets `date: new Date()` currently which resets time to NOW. 
                    // Ideally we might want to keep original time if just editing info?
                    // But for now let's respect the popup's return (which includes date).
                    date: data.date
                } : r
            ));
            setEditingRecord(null);
        } else {
            // Create new record
            const newRecord: CaffeineRecord = {
                id: Date.now().toString(),
                brand: data.brand || 'Unknown',
                menu: data.menu || 'Unknown Menu',
                size: data.size || 'Standard',
                caffeine: data.caffeine || 0,
                date: data.date || new Date(),
                isDecaf: data.isDecaf || false
            };
            setCaffeineRecords(prev => [newRecord, ...prev]);
            setIsRecordPopupOpen(false);
        }
    };

    const handleDeleteRecord = (id: string) => {
        setCaffeineRecords(prev => prev.filter(r => r.id !== id));
    };

    // Update record after editing (handlded by popup now)

    const renderContent = () => {
        if (currentTab === 'cafe') {
            return <DecafCafeListScreen />;
        }

        if (currentTab === 'log') {
            return (
                <CaffeineLogScreen
                    records={caffeineRecords}
                    onDelete={handleDeleteRecord}
                    onEdit={setEditingRecord}
                    maxIntake={maxIntake}
                />
            );
        }

        if (currentTab === 'product-detail' && selectedProduct) {
            return (
                <ProductDetailPage
                    product={selectedProduct}
                    onBack={() => {
                        setCurrentTab(previousTab);
                        setSelectedProduct(null);
                    }}
                    onGoHome={() => {
                        setCurrentTab('home');
                        setSelectedProduct(null);
                        setShopInitialTab('🌙 디카페인');
                        setActiveMode('home');
                    }}
                />
            );
        }

        if (currentTab === 'comm') {
            return <CommunityScreen />;
        }

        if (currentTab === 'shop') {
            return (
                <ShoppingHome
                    initialTab={shopInitialTab}
                    onProductClick={openProductDetail}
                />
            );
        }

        // Home Tab Content
        return (
            <>
                <GlobalNavigation />
                <HeroSection
                    currentIntake={todayCaffeineIntake}
                    maxIntake={maxIntake}
                    setMaxIntake={setMaxIntake}
                />
                <QuickCuration onNavigateToShop={handleNavigateToShop} />
                <ServiceToggle
                    activeMode={activeMode}
                    onToggle={setActiveMode}
                    isCoffeeOnly={isCoffeeOnly}
                    onCoffeeOnlyToggle={setIsCoffeeOnly}
                />

                {/* Show CafeRanking only in 'cafe' mode (inside Home Tab toggles) */}
                {activeMode === 'cafe' && <CafeRanking onMoreClick={() => setCurrentTab('cafe')} />}

                {/* Show CommerceSection only in 'home' mode (inside Home Tab toggles) */}
                {activeMode === 'home' && (
                    <CommerceSection
                        onNavigateToShop={() => handleNavigateToShop()}
                        onProductClick={openProductDetail}
                    />
                )}

                <WikiSection />
            </>
        );
    };

    return (
        <div className="app-container">
            {renderContent()}
            {currentTab !== 'product-detail' && (
                <>
                    {currentTab !== 'comm' && <FloatingRecordBtn onClick={() => setIsRecordPopupOpen(true)} />}
                    <BottomNavigation activeTab={currentTab} onTabChange={setCurrentTab} />
                </>
            )}

            {/* Global Popup Layer (Create) */}
            {isRecordPopupOpen && (
                <CaffeineRecordPopup
                    onClose={() => setIsRecordPopupOpen(false)}
                    onComplete={handleRecordComplete}
                />
            )}

            {/* Edit Popup Layer (Edit) */}
            {editingRecord && (
                <CaffeineRecordPopup
                    initialRecord={editingRecord}
                    onClose={() => setEditingRecord(null)}
                    onComplete={(data) => handleRecordComplete({
                        ...data,
                        id: editingRecord.id,
                        date: editingRecord.date // Keep original date/time
                    })}
                />
            )}
        </div>
    );
}

export default App;
