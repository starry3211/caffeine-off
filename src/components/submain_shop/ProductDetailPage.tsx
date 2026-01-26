import React from 'react';
import { Product } from '../main/CommerceSection';
import './ProductDetailPage.css';
import { IoArrowBack, IoShareSocialOutline, IoHeartOutline, IoHomeOutline, IoSearchOutline } from "react-icons/io5";

interface ProductDetailPageProps {
    product: Product;
    onBack: () => void;
    onGoHome?: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onGoHome }) => {
    // Mock extended data since our basic Product type doesn't have everything
    // In a real app, this would come from an API based on product.id
    const extendedData = {
        swp: product.tags.some(t => t.includes('SWP')),
        sugarFree: true,
        pregnantSafe: product.tags.some(t => t.includes('임산부') || t.includes('유기농')),
        tasteNotes: '🍫 밀크 초콜릿, 🥜 고소한 견과류',
        process: '스위스 워터 프로세스(SWP) - 화학물 0%',
        recommendation: '핸드드립, 라떼 베이스',
        reviews: [
            { text: "저녁에 마셨는데 정말 꿀잠 잤어요!", rating: 5 },
            { text: "임신 중인데 안심하고 마십니다.", rating: 5 }
        ]
    };

    // Custom logic to match the request's gauge style more closely
    // 0-5mg = Safe (Green), >5 = Caution (Orangeish) - simplified for visual

    const isSafe = product.caffeineAmount <= 5;

    return (
        <div className="product-detail-container">
            {/* [Top Navigation] */}
            <nav className="top-nav">
                <div className="nav-left">
                    <button onClick={onBack} aria-label="Go back">
                        <IoArrowBack />
                    </button>
                    <button onClick={onGoHome} aria-label="Go home">
                        <IoHomeOutline />
                    </button>
                </div>
                <div className="nav-right">
                    <button aria-label="Search">
                        <IoSearchOutline />
                    </button>
                </div>
            </nav>

            {/* [Section 1: Main Visual] */}
            <header className="detail-section main-visual-section">
                <img src={product.image} alt={product.name} className="lifestyle-image" />
                <div className="caffeine-badge-floating">
                    <span>⚡ {product.caffeineAmount}mg</span>
                </div>
            </header>

            {/* [Section 2: Key Info & Tags] */}
            <section className="detail-section">
                <div className="brand-name">{product.brand}</div>
                <h1 className="product-title">{product.name}</h1>

                <div className="tags-row">
                    {extendedData.swp && <span className="detail-tag">🌱 SWP 공법</span>}
                    {extendedData.sugarFree && <span className="detail-tag">🚫 당류 0g</span>}
                    {extendedData.pregnantSafe && <span className="detail-tag">🤰 임산부 안심</span>}
                    {product.tags.map((tag, i) => (
                        <span key={i} className="detail-tag">{tag}</span>
                    ))}
                </div>

                <div className="price-info">
                    <span className="current-price">{product.price}</span>
                    <span className="discount-info">(첫구매 혜택가 적용 가능)</span>
                </div>
            </section>

            {/* [Section 3: Caffeine Analysis Report] */}
            <section className="detail-section">
                <h3 className="analysis-title">Caffeine Analysis</h3>

                <div className="gauge-container">
                    <div className="gauge-labels">
                        <span>Safe 🟢</span>
                        <span>Caution 🟠</span>
                    </div>
                    <div className="gauge-bar-bg">
                        <div
                            className="gauge-fill"
                            style={{
                                width: `${Math.max(5, (product.caffeineAmount / 30) * 100)}%`, // Custom scale for display
                                background: isSafe ? '#4CAF50' : '#FF9800'
                            }}
                        ></div>
                    </div>
                    <div className="gauge-value-text">
                        {Math.round((product.caffeineAmount / 150) * 100)}% ({product.caffeineAmount}mg)
                    </div>
                </div>

                <div className="analysis-quote">
                    <p><strong>"잠들기 3시간 전에도 괜찮아요."</strong></p>
                    <p>"두근거림 걱정 없이 부드러운 여유를 즐기세요."</p>
                </div>

                <p className="comparison-guide">*비교 가이드: 일반 아메리카노(150mg)의 약 1/{Math.round(150 / Math.max(1, product.caffeineAmount))} 수준!</p>
            </section>

            {/* [Section 4: Detailed Curation Info] */}
            <section className="detail-section">
                <ul className="curation-list">
                    <li className="curation-item">
                        <span className="curation-label">테이스트 노트</span>
                        <span className="curation-value">{extendedData.tasteNotes}</span>
                    </li>
                    <li className="curation-item">
                        <span className="curation-label">제거 공법</span>
                        <span className="curation-value">{extendedData.process}</span>
                    </li>
                    <li className="curation-item">
                        <span className="curation-label">추천 음용</span>
                        <span className="curation-value">{extendedData.recommendation}</span>
                    </li>
                </ul>
            </section>

            {/* [Section 5: Review] */}
            <section className="detail-section">
                <h3 className="analysis-title">안심 리뷰</h3>
                {extendedData.reviews.map((review, idx) => (
                    <div className="review-item" key={idx}>
                        <p className="review-text">"{review.text}"</p>
                        <div className="review-stars">{'⭐'.repeat(review.rating)}</div>
                    </div>
                ))}
            </section>

            {/* [Bottom Fixed Action Bar] */}
            <div className="bottom-action-bar">
                <div className="action-icon-group">
                    <button className="icon-action-btn" aria-label="Add to Wishlist">
                        <IoHeartOutline size={24} />
                        <span className="icon-label">찜하기</span>
                    </button>
                    <button className="icon-action-btn" aria-label="Share">
                        <IoShareSocialOutline size={24} />
                        <span className="icon-label">공유</span>
                    </button>
                </div>
                <button className="buy-btn">
                    쿠팡에서 구매하기
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
