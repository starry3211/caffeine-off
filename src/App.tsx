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
import ShoppingHome from './components/submain_shop/ShoppingHome';
import ProductDetailPage from './components/submain_shop/ProductDetailPage';
import { Product } from './components/main/CommerceSection';
import './index.css';

function App() {
    const [activeMode, setActiveMode] = useState<'cafe' | 'home'>('cafe');
    const [currentTab, setCurrentTab] = useState('home');
    const [shopInitialTab, setShopInitialTab] = useState('🌙 디카페인');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [isCoffeeOnly, setIsCoffeeOnly] = useState(false);

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

    const renderContent = () => {
        if (currentTab === 'cafe') {
            return <DecafCafeListScreen />;
        }

        if (currentTab === 'product-detail' && selectedProduct) {
            return (
                <ProductDetailPage
                    product={selectedProduct}
                    onBack={() => {
                        // Logic: go back to previous context (shop or home)
                        // If we have previousTab state, use it.
                        // But wait, the user might want "Back" to just go back to list.
                        // And "Home" to go to Home tab.
                        setCurrentTab(previousTab);
                        setSelectedProduct(null);
                    }}
                    onGoHome={() => {
                        setCurrentTab('home');
                        setSelectedProduct(null);
                        setShopInitialTab('🌙 디카페인'); // Optional: reset shop tab? Maybe not.
                        setActiveMode('home'); // Ensure mode is Home?
                    }}
                />
            );
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
                <HeroSection />
                <QuickCuration onNavigateToShop={handleNavigateToShop} />
                <ServiceToggle
                    activeMode={activeMode}
                    onToggle={setActiveMode}
                    isCoffeeOnly={isCoffeeOnly}
                    onCoffeeOnlyToggle={setIsCoffeeOnly}
                />

                {/* Show CafeRanking only in 'cafe' mode (inside Home Tab toggles) */}
                {activeMode === 'cafe' && <CafeRanking />}

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
                <BottomNavigation activeTab={currentTab} onTabChange={setCurrentTab} />
            )}
        </div>
    );
}

export default App;
