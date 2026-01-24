import React from 'react';
import '../main/CommerceSection.css'; // Reuse existing CSS for now or refactor later
import { Product } from '../main/CommerceSection';

export const getGaugeStatus = (amount: number) => {
    if (amount <= 5) return { label: 'Safe', colorClass: 'safe', max: 5 };
    if (amount <= 30) return { label: 'Mild', colorClass: 'mild', max: 30 };
    return { label: 'Check', colorClass: 'check', max: 100 };
};

interface CommonProductCardProps {
    product: Product;
    toggleHeart: (id: number) => void;
}

const CommonProductCard: React.FC<CommonProductCardProps> = ({ product, toggleHeart }) => {
    const status = getGaugeStatus(product.caffeineAmount);

    let widthPercent = 10;
    if (product.caffeineAmount <= 5) {
        widthPercent = Math.max(5, (product.caffeineAmount / 5) * 20); // 0-5mg -> 5-20%
    } else if (product.caffeineAmount <= 30) {
        widthPercent = 20 + ((product.caffeineAmount - 5) / 25) * 40; // 6-30mg -> 20-60%
    } else {
        widthPercent = 60 + Math.min(40, ((product.caffeineAmount - 30) / 70) * 40); // 30+ -> 60-100%
    }

    return (
        <div className="product-card">
            {/* (A) Vital Mint Badge */}
            <div className="card-badge-overlay">
                <span className="vital-badge">{product.caffeineAmount}mg</span>
            </div>

            {/* (B) Product Image */}
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="image-description-overlay">
                    <p className="image-description-text">{product.description}</p>
                </div>
            </div>

            {/* (C) Caffeine Gauge */}
            <div className="caffeine-gauge-section">
                <div className="gauge-header">
                    <span className={`gauge-label ${status.colorClass}`}>{status.label}</span>
                    <span className="gauge-max">Caution</span>
                </div>
                <div className="gauge-track">
                    <div
                        className={`gauge-bar ${status.colorClass}`}
                        style={{ width: `${widthPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* (D) Trust Tags */}
            <div className="trust-tags">
                {product.tags.map((tag, i) => (
                    <span key={i} className="trust-tag">{tag}</span>
                ))}
            </div>

            {/* (E) Brand & Product Name */}
            <div className="product-info-footer">
                <p className="product-brand">{product.brand}</p>
                <h3 className="product-name-large">{product.name}</h3>
                <div className="price-row">
                    <span className="product-price-large">{product.price}</span>
                    <button
                        className="wishlist-btn"
                        aria-label={product.isHearted ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={() => toggleHeart(product.id)}
                    >
                        {product.isHearted ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#FF4B4B" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.41 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" fill="#999999" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommonProductCard;
