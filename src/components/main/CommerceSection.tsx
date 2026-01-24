import React from 'react';
import './CommerceSection.css';
// Note: These images need to be in src/assets
import capsuleImg from '../../assets/decaf_capsule.png';
import teaImg from '../../assets/rooibos_tea.png';
import CommonProductCard from '../common/CommonProductCard';

export interface Product {
    id: number;
    brand: string;
    name: string;
    price: string;
    description: string;
    caffeineAmount: number; // mg
    image: string;
    tags: string[];
    isHearted?: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        brand: '카누',
        name: '디카페인 캡슐',
        price: '15,900원',
        description: '"마셔도 숙면할 수 있어요"',
        caffeineAmount: 4,
        image: capsuleImg,
        tags: ['SWP 공법', '임산부 안심'],
        isHearted: false
    },
    {
        id: 2,
        brand: '오설록',
        name: '루이보스 티백 세트',
        price: '12,000원',
        description: '"카페인 없이 향긋한 향을 즐겨요"',
        caffeineAmount: 0,
        image: teaImg,
        tags: ['무카페인', '유기농'],
        isHearted: true
    },
    {
        id: 3,
        brand: '일리',
        name: '디카페인 블렌드',
        price: '18,500원',
        description: '"민감하다면 샷 조절을 권장해요"',
        caffeineAmount: 12,
        image: capsuleImg,
        tags: ['마일드', '로스팅'],
        isHearted: false
    },
    {
        id: 4,
        brand: '트와이닝',
        name: '유기농 캐모마일 티',
        price: '9,800원',
        description: '"따뜻하게 긴장을 풀어줄거예요"',
        caffeineAmount: 0,
        image: teaImg,
        tags: ['심신안정', '허브 100%'],
        isHearted: false
    }
];

interface CommerceSectionProps {
    onNavigateToShop?: () => void;
}

const CommerceSection: React.FC<CommerceSectionProps> = ({ onNavigateToShop }) => {
    const [products, setProducts] = React.useState<Product[]>(PRODUCTS);

    const toggleHeart = (id: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, isHearted: !product.isHearted } : product
            )
        );
    };

    return (
        <section className="commerce-section">
            <h2 className="section-title" style={{ paddingLeft: 'var(--safe-area-padding)' }}>
                Weekly Best Picks
            </h2>

            <div className="product-grid">
                {products.map((product) => (
                    <CommonProductCard key={product.id} product={product} toggleHeart={toggleHeart} />
                ))}
            </div>

            <button className="see-more-btn" onClick={onNavigateToShop}>
                더 많은 제품보기
            </button>
        </section>
    );
};

export default CommerceSection;
