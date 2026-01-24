import React from 'react';
import './QuickCuration.css';
import decafImg from '../../assets/images/quick_decaf.png';
import teaImg from '../../assets/images/quick_tea.png';
import energyImg from '../../assets/images/quick_energy.png';

interface QuickCurationProps {
    onNavigateToShop: (tab: string) => void;
}

const QuickCuration: React.FC<QuickCurationProps> = ({ onNavigateToShop }) => {
    const curios = [
        { emoji: '🌙', text: '딥나잇\n디카페인', image: decafImg, targetTab: '🌙 디카페인' },
        { emoji: '⚡', text: '가벼운\nLow 카페인', image: energyImg, targetTab: '🫧 Low 카페인' }, // Intentionally fixed space
        { emoji: '🤰', text: '편안하게\n릴렉스 티', image: teaImg, targetTab: '🌿 릴렉스 티' },
    ];

    return (
        <section className="curation-section">
            <h2 className="section-title">Product Category</h2>
            <div className="curation-grid">
                {curios.map((item, index) => (
                    <button
                        key={index}
                        className="quick-curation-item"
                        onClick={() => onNavigateToShop(item.targetTab)}
                    >
                        <div className="qc-icon-wrapper">
                            {item.image ? (
                                <img src={item.image} alt={item.text} className="qc-icon-image" />
                            ) : (
                                <span className="qc-emoji">{item.emoji}</span>
                            )}
                        </div>
                        <span className="qc-label">{item.text}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default QuickCuration;
