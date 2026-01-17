interface ServiceToggleProps {
    activeMode: 'cafe' | 'home';
    onToggle: (mode: 'cafe' | 'home') => void;
}

const ServiceToggle: React.FC<ServiceToggleProps> = ({ activeMode, onToggle }) => {
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
        </section>
    );
};

export default ServiceToggle;
