import React from 'react';
import './ServiceToggle.css';

interface ServiceToggleProps {
    activeMode: 'cafe' | 'home';
    onToggle: (mode: 'cafe' | 'home') => void;
    isCoffeeOnly: boolean;
    onCoffeeOnlyToggle: (value: boolean) => void;
}

const ServiceToggle: React.FC<ServiceToggleProps> = ({
    activeMode,
    onToggle,
    isCoffeeOnly,
    onCoffeeOnlyToggle
}) => {
    return (
        <section className="service-toggle-section">
            <div className="toggle-container">
                <button
                    className={`toggle-btn ${activeMode === 'cafe' ? 'active' : ''}`}
                    onClick={() => onToggle('cafe')}
                >
                    <span className="toggle-title">지금 밖에서</span>
                </button>

                <button
                    className={`toggle-btn ${activeMode === 'home' ? 'active' : ''}`}
                    onClick={() => onToggle('home')}
                >
                    <span className="toggle-title">집/사무실에서</span>
                </button>
            </div>

            {activeMode === 'cafe' && (
                <div className="sub-toggle-container">
                    <span className="sub-toggle-label">Coffee only</span>
                    <button
                        className={`sub-toggle-switch ${isCoffeeOnly ? 'active' : ''}`}
                        onClick={() => onCoffeeOnlyToggle(!isCoffeeOnly)}
                    >
                        <div className="sub-toggle-knob"></div>
                    </button>
                </div>
            )}
        </section>
    );
};

export default ServiceToggle;
