import React from 'react';
import './CafeRanking.css';

const CafeRanking: React.FC = () => {
    const rankings = [
        { rank: 1, brand: '스타벅스', menu: '디카페인 아메리카노', caffeine: 5 },
        { rank: 2, brand: '투썸플레이스', menu: 'SWP 디카페인 라떼', caffeine: 0 },
        { rank: 3, brand: '폴바셋', menu: '디카페인 룽고', caffeine: 10 },
    ];

    return (
        <section className="ranking-section">
            <h2 className="section-title" style={{ paddingLeft: 'var(--safe-area-padding)' }}>
                실시간 인기 디카페인 카페
            </h2>

            <ul className="ranking-list">
                {rankings.map((item) => (
                    <li key={item.rank} className="ranking-item">
                        <span className="rank-number">{item.rank}</span>
                        <div className="rank-info">
                            <div className="rank-brand-row">
                                <span className="rank-brand">{item.brand}</span>
                                <span className="location-badge">내주변</span>
                            </div>
                            <div className="rank-menu">
                                {item.menu} <span className="rank-caffeine">({item.caffeine}mg)</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <button className="more-link-btn">
                {'>'} 더 많은 카페 메뉴 비교하기
            </button>
        </section>
    );
};

export default CafeRanking;
