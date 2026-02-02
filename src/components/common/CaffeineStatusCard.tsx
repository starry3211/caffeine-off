import React from 'react';
import './CaffeineStatusCard.css';
import { BiCog } from 'react-icons/bi';
import cloudCharacterImg from '../../assets/images/cloud_character.png';

interface CaffeineStatusCardProps {
    currentIntake: number;
    maxIntake: number;
    onSettingsClick?: () => void;
    showSettingsBtn?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const CaffeineStatusCard: React.FC<CaffeineStatusCardProps> = ({
    currentIntake,
    maxIntake,
    onSettingsClick,
    showSettingsBtn = true,
    style,
    className = ''
}) => {
    const progressPercentage = Math.min((currentIntake / maxIntake) * 100, 100);

    return (
        <div className={`caffeine-status-card ${className}`} style={style}>
            {showSettingsBtn && (
                <button
                    className="card-settings-btn"
                    aria-label="Settings"
                    onClick={onSettingsClick}
                >
                    <BiCog size={20} />
                </button>
            )}

            <img src={cloudCharacterImg} alt="Caffeine Cloud Mascot" className="card-character-mascot" />

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
    );
};

export default CaffeineStatusCard;
