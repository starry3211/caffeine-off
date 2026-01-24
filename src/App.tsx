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
import './index.css';

function App() {
    const [activeMode, setActiveMode] = useState<'cafe' | 'home'>('cafe');
    const [currentTab, setCurrentTab] = useState('home');
    const [shopInitialTab, setShopInitialTab] = useState('🌙 디카페인');

    const [isCoffeeOnly, setIsCoffeeOnly] = useState(false);

    const handleNavigateToShop = (tabName?: string) => {
        if (tabName) setShopInitialTab(tabName);
        setCurrentTab('shop');
    };

    const renderContent = () => {
        if (currentTab === 'cafe') {
            return <DecafCafeListScreen />;
        }

        if (currentTab === 'shop') {
            return <ShoppingHome initialTab={shopInitialTab} />;
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
                    <CommerceSection onNavigateToShop={() => handleNavigateToShop()} />
                )}

                <WikiSection />
            </>
        );
    };

    return (
        <div className="app-container">
            {renderContent()}
            <BottomNavigation activeTab={currentTab} onTabChange={setCurrentTab} />
        </div>
    );
}

export default App;
