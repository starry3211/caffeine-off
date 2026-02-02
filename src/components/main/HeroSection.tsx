import React, { useMemo, useEffect, useState } from 'react';
import './HeroSection.css';
import orbTopOrange from '../../assets/images/orb_top_cloud.png';
import orbBottomGreen from '../../assets/images/orb_bottom_cloud.png';
import CaffeineStatusCard from '../common/CaffeineStatusCard';
import CaffeineSettingsSheet from './CaffeineSettingsSheet';

interface HeroSectionProps {
    currentIntake: number;
    maxIntake: number;
    setMaxIntake: (val: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentIntake, maxIntake, setMaxIntake }) => {
    // Settings Sheet State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSaveSettings = (newMax: number) => {
        setMaxIntake(newMax);
    };

    // Typing effect logic
    const [placeholder, setPlaceholder] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);

    const phrases = useMemo(() => [
        "집에서 혼자 밤에 힐링할 수 있는 티를 추천해줘",
        "연남동에 산미 적은 디카페인 커피 카페 찾아줘"
    ], []);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setPlaceholder(isDeleting
                ? fullText.substring(0, placeholder.length - 1)
                : fullText.substring(0, placeholder.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 100);

            if (!isDeleting && placeholder === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
            } else if (isDeleting && placeholder === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [placeholder, isDeleting, loopNum, typingSpeed, phrases]);

    return (
        <section className="hero-section">
            <div className="hero-wave-bg">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#00D1B2" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>
            <h1 className="hero-greeting">다혜님,<br />커피 <span style={{ color: '#FFE082' }}>1.5잔</span> 정도는 더 마셔도 돼요 🌿</h1>

            <div className="hero-decoration-wrapper">
                <img src={orbTopOrange} alt="" className="hero-orb orb-1" />
                <img src={orbBottomGreen} alt="" className="hero-orb orb-2" />
                <img src={orbTopOrange} alt="" className="hero-orb orb-3" />

                <CaffeineStatusCard
                    currentIntake={currentIntake}
                    maxIntake={maxIntake}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                />

                <div className="hero-search-container">
                    <h3 className="hero-search-title">원하는 카페나 제품을 검색해 보세요</h3>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            className="hero-search-input"
                            placeholder={placeholder}
                            aria-label="Ask AI about caffeine-free options"
                        />
                        <button className="hero-search-btn" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <CaffeineSettingsSheet
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                currentMax={maxIntake}
                onApply={handleSaveSettings}
            />
        </section>
    );
};

export default HeroSection;
