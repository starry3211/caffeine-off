import { useState } from 'react';
import GlobalNavigation from './components/GlobalNavigation';
import HeroSection from './components/HeroSection';
import ServiceToggle from './components/ServiceToggle';
import QuickCuration from './components/QuickCuration';
import CafeRanking from './components/CafeRanking';
import CommerceSection from './components/CommerceSection';
import WikiSection from './components/WikiSection';
import BottomNavigation from './components/BottomNavigation';
import './index.css';

function App() {
    const [activeMode, setActiveMode] = useState<'cafe' | 'home'>('cafe');

    return (
        <div className="app-container">
            <GlobalNavigation />
            <HeroSection />
            <QuickCuration />
            <ServiceToggle activeMode={activeMode} onToggle={setActiveMode} />

            {/* Show CafeRanking only in 'cafe' mode */}
            {activeMode === 'cafe' && <CafeRanking />}

            {/* Show CommerceSection only in 'home' mode */}
            {activeMode === 'home' && <CommerceSection />}

            <WikiSection />
            <BottomNavigation />
        </div>
    );
}

export default App;
