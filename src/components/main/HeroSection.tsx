import React from 'react';
import './HeroSection.css';
import orbTopOrange from '../../assets/images/orb_top_cloud.png';
import orbBottomGreen from '../../assets/images/orb_bottom_cloud.png';
import cloudCharacterImg from '../../assets/images/cloud_character.png';

import { BiCog } from 'react-icons/bi';

import CaffeineSettingsSheet from './CaffeineSettingsSheet';

const HeroSection: React.FC = () => {
    // State
    const [currentIntake] = React.useState(45); // Mock current
    const [maxIntake, setMaxIntake] = React.useState(300);

    // Settings Sheet State
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

    const progressPercentage = Math.min((currentIntake / maxIntake) * 100, 100);

    const handleSaveSettings = (newMax: number) => {
        setMaxIntake(newMax);
    };

    // Typing effect logic
    const [placeholder, setPlaceholder] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [loopNum, setLoopNum] = React.useState(0);
    const [typingSpeed, setTypingSpeed] = React.useState(100);

    const phrases = React.useMemo(() => [
        "집에서 혼자 밤에 힐링할 수 있는 티를 추천해줘",
        "연남동에 산미 적은 디카페인 커피 카페 찾아줘"
    ], []);

    React.useEffect(() => {
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

                <div className="caffeine-status-card">
                    <button
                        className="card-settings-btn"
                        aria-label="Settings"
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <BiCog size={20} />
                    </button>
                    <img src={cloudCharacterImg} alt="Caffeine Off Mascot" className="hero-character-mascot" />
                    <p className="caffeine-info-text">
                        오늘 섭취한 카페인은 지금까지 <br />
                        <span className="sc-value">{currentIntake}mg</span>
                        <span className="sc-divider"> / </span>
                        <span className="sc-max">{maxIntake}mg</span> 이에요
                    </p>

                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>

                    <div className="status-indicator">
                        <div className="status-badge">
                            <span className="status-dot"></span>
                            안심
                        </div>
                        <span className="status-message">잠드는 시간까지 8시간 남았어요!</span>
                    </div>
                </div>

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
