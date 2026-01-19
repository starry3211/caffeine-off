import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import './WikiSection.css';

const WikiSection: React.FC = () => {
    const contents = [
        { title: '디카페인 커피는 정말 카페인이 0일까?' },
        { title: '카페인 분해를 돕는 의외의 음식 3가지' },
    ];

    return (
        <section className="wiki-section">
            <h2 className="section-title" style={{ paddingLeft: 'var(--safe-area-padding)' }}>
                카페인 위키
            </h2>
            <div className="wiki-list">
                {contents.map((item, index) => (
                    <button key={index} className="wiki-item">
                        <span className="wiki-title">{item.title}</span>
                        <span className="wiki-link">자세히 보기 <BiChevronRight /></span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default WikiSection;
