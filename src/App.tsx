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
import './index.css';

function App() {
    const [activeMode, setActiveMode] = useState<'cafe' | 'home'>('cafe');
    const [currentTab, setCurrentTab] = useState('home');

    const [isCoffeeOnly, setIsCoffeeOnly] = useState(false);

    const renderContent = () => {
        if (currentTab === 'cafe') {
            return <DecafCafeListScreen />;
        }

        // Home Tab Content
        return (
            <>
                <GlobalNavigation />
                <HeroSection />
                <QuickCuration />
                <ServiceToggle
                    activeMode={activeMode}
                    onToggle={setActiveMode}
                    isCoffeeOnly={isCoffeeOnly}
                    onCoffeeOnlyToggle={setIsCoffeeOnly}
                />

                {/* Show CafeRanking only in 'cafe' mode (inside Home Tab toggles) */}
                {activeMode === 'cafe' && <CafeRanking />}

                {/* Show CommerceSection only in 'home' mode (inside Home Tab toggles) */}
                {activeMode === 'home' && <CommerceSection />}

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
