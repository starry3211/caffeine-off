import React from 'react';
import './HeroSection.css';
import orbTopOrange from '../assets/images/orb_top_orange.png';
import orbBottomGreen from '../assets/images/orb_bottom_green.png';

const HeroSection: React.FC = () => {
    // Mock data
    const currentIntake = 45;
    const maxIntake = 300;
    const progressPercentage = (currentIntake / maxIntake) * 100;

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
            <h1 className="hero-greeting">다혜님,<br />오늘도 같이 카페인 Off 해요 🌿</h1>

            <div className="hero-decoration-wrapper">
                <img src={orbTopOrange} alt="" className="hero-orb orb-1" />
                <img src={orbBottomGreen} alt="" className="hero-orb orb-2" />

                <div className="caffeine-status-card">
                    <p className="caffeine-info-text">
                        오늘 섭취한 카페인은 현재 <br />
                        <span className="sc-value">{currentIntake}mg</span>
                        <span className="sc-divider"> / </span>
                        <span className="sc-max">{maxIntake}mg</span> 입니다.
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
                        <span className="status-message">숙면까지 8시간 남았어요!</span>
                    </div>
                </div>

                <div className="hero-search-container">
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
        </section>
    );
};

export default HeroSection;
