import React from 'react';
import './CommerceSection.css';
// Note: These images need to be in src/assets
import capsuleImg from '../../assets/decaf_capsule.png';
import teaImg from '../../assets/rooibos_tea.png';

const CommerceSection: React.FC = () => {
    return (
        <section className="commerce-section">
            <h2 className="section-title" style={{ paddingLeft: 'var(--safe-area-padding)' }}>
                Weekly Best Picks
            </h2>

            <div className="product-grid">
                <div className="product-card">
                    <div className="product-image-container">
                        <img src={capsuleImg} alt="Kanu Decaf Capsule" className="product-image" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">카누 디카페인 캡슐</h3>
                        <p className="product-price">15,900원 <span className="price-tag">(최저가)</span></p>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image-container">
                        <img src={teaImg} alt="Rooibos Tea Set" className="product-image" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">루이보스 티백 세트</h3>
                        <p className="product-price">12,000원 <span className="price-tag">(핫딜)</span></p>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image-container">
                        <img src={capsuleImg} alt="Decaf Blend" className="product-image" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">일리 디카페인 블렌드</h3>
                        <p className="product-price">18,500원</p>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image-container">
                        <img src={teaImg} alt="Chamomile Tea" className="product-image" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">유기농 캐모마일 티</h3>
                        <p className="product-price">9,800원</p>
                    </div>
                </div>
            </div>

            <button className="see-more-btn">
                더 많은 제품보기
            </button>
        </section>
    );
};

export default CommerceSection;
