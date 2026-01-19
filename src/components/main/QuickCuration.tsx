import React from 'react';
import './QuickCuration.css';
import decafImg from '../../assets/images/quick_decaf.png';
import teaImg from '../../assets/images/quick_tea.png';
import energyImg from '../../assets/images/quick_energy.png';

const QuickCuration: React.FC = () => {
    const curios = [
        { emoji: '🌙', text: '딥나잇\n디카페인', image: decafImg },
        { emoji: '⚡', text: '가벼운\nLow 카페인', image: energyImg },
        { emoji: '🤰', text: '편안하게\n릴렉스 티', image: teaImg },
    ];

    return (
        <section className="curation-section">
            <h2 className="section-title">Product Category</h2>
            <div className="curation-grid">
                {curios.map((item, index) => (
                    <button key={index} className="quick-curation-item">
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
