import React, { useState } from 'react';
import './CafeRanking.css';
import { BiTargetLock, BiChevronDown } from 'react-icons/bi';

const CafeRanking: React.FC = () => {
    const [sortMode, setSortMode] = useState<'popular' | 'distance'>('popular');

    const rankings = [
        { rank: 1, brand: '스타벅스', menu: '디카페인 아메리카노', caffeine: 5 },
        { rank: 2, brand: '투썸플레이스', menu: 'SWP 디카페인 라떼', caffeine: 0 },
        { rank: 3, brand: '폴바셋', menu: '디카페인 룽고', caffeine: 10 },
        { rank: 4, brand: '이디야커피', menu: '디카페인 콜드브루', caffeine: 9 },
        { rank: 5, brand: '메가커피', menu: '디카페인 아메리카노', caffeine: 7 },
    ];

    return (
        <section className="ranking-section">
            <div className="ranking-controls">
                <div className="location-row">
                    <button className="location-btn current">
                        <BiTargetLock size={16} />
                        현위치
                    </button>
                    <span className="location-divider">|</span>
                    <button className="location-btn region">
                        연남동 <BiChevronDown size={16} />
                    </button>
                </div>

                <div className="sort-row">
                    <button
                        className={`sort-btn ${sortMode === 'popular' ? 'active' : ''}`}
                        onClick={() => setSortMode('popular')}
                    >
                        인기순
                    </button>
                    <button
                        className={`sort-btn ${sortMode === 'distance' ? 'active' : ''}`}
                        onClick={() => setSortMode('distance')}
                    >
                        거리순
                    </button>
                </div>
            </div>

            <ul className="ranking-list">
                {rankings.map((item) => (
                    <li key={item.rank} className="ranking-item">
                        <div className="item-icon">
                            <div className="brand-logo-placeholder">
                                {item.brand[0]}
                            </div>
                        </div>
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
                더 많은 카페 보기
            </button>
        </section>
    );
};

export default CafeRanking;
