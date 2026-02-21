import React, { useState, useEffect } from 'react';
import { IoSearchOutline, IoPersonOutline, IoHeartOutline, IoChatbubbleOutline, IoEllipsisHorizontal, IoShareSocialOutline } from 'react-icons/io5';
import CommunityPostDetail from './CommunityPostDetail';
import './CommunityScreen.css';

export interface Post {
    id: string;
    category: string;
    title: string;
    content: string;
    comments: number;
    likes: number;
    time: string;
    author: string;
    image?: string;
}

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        category: '후기',
        title: '스타벅스 이번 시즌 디카페인 원두...',
        content: '산미가 적고 고소해서 저녁에 마셔도 부담이 없네요. 추천합니다!',
        comments: 5,
        likes: 12,
        time: '3분 전',
        author: '커피러버',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: '2',
        category: '질문',
        title: '임신 초기인데 하루 한 잔 괜찮을까요?',
        content: '담당 의사 선생님은 괜찮다고 하시는데 그래도 걱정이 돼서요.',
        comments: 18,
        likes: 8,
        time: '10분 전',
        author: '예비맘'
    },
    {
        id: '3',
        category: '정보',
        title: '편의점별 로우카페인 음료 성분 정리.pdf',
        content: '제가 직접 조사한 편의점 디카페인/로우카페인 음료 리스트 공유합니다.',
        comments: 32,
        likes: 45,
        time: '30분 전',
        author: '정보요정'
    },
    {
        id: '4',
        category: '잡담',
        title: '오늘 커피 참기 3일차',
        content: '머리가 띵하지만 허브티로 버티고 있습니다. 다들 화이팅!',
        comments: 2,
        likes: 5,
        time: '1시간 전',
        author: '작심삼일'
    }
];

const CATEGORIES = ['#전체', '#디카페인후기', '#카페추천', '#슬립케어', '#질문'];

const CommunityScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('#전체');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isWriteBtnExpanded, setIsWriteBtnExpanded] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWriteBtnExpanded(false);
        }, 2000); // Collapse after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    // If a post is selected, show detail view
    if (selectedPost) {
        return (
            <CommunityPostDetail
                post={selectedPost}
                onBack={() => setSelectedPost(null)}
            />
        );
    }

    return (
        <div className="community-container">
            {/* 1. Header */}
            <header className="comm-header">
                <div className="comm-title">라운지</div>
                <div className="comm-actions">
                    <button className="icon-btn"><IoPersonOutline size={22} /></button>
                    <button className="icon-btn"><IoSearchOutline size={22} /></button>
                </div>
            </header>

            <div className="comm-scroll-content">


                {/* 3. Categories */}
                <section className="comm-categories">
                    <div className="cat-scroll-container">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`comm-cat-chip ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 4. Post List */}
                {/* 4. Post List (Feed Style) */}
                <section className="community-feed">
                    {MOCK_POSTS.map(post => (
                        <div key={post.id} className="feed-card" onClick={() => setSelectedPost(post)}>
                            {/* Feed Header: Author info */}
                            <div className="feed-header">
                                <div className="author-avatar">
                                    {post.author.charAt(0)}
                                </div>
                                <div className="author-info">
                                    <span className="author-name">{post.author}</span>
                                    <span className="post-time">{post.time}</span>
                                </div>
                                <button className="more-options" onClick={(e) => e.stopPropagation()}>
                                    <IoEllipsisHorizontal size={20} />
                                </button>
                            </div>

                            {/* Feed Content */}
                            <div className="feed-content">
                                <h3 className="feed-title">
                                    <span className={`post-badge ${post.category === '질문' ? 'qna' : post.category === '정보' ? 'info' : ''}`}>[{post.category}]</span> {post.title}
                                </h3>
                                <p className="feed-body">{post.content}</p>
                                {post.image && (
                                    <div className="feed-image-container">
                                        <img src={post.image} alt="post" className="feed-image" />
                                    </div>
                                )}
                            </div>

                            {/* Feed Actions */}
                            <div className="feed-actions">
                                <button className="action-btn" onClick={(e) => { e.stopPropagation(); /* Like logic */ }}>
                                    <IoHeartOutline size={20} />
                                    <span>{post.likes}</span>
                                </button>
                                <button className="action-btn">
                                    <IoChatbubbleOutline size={20} />
                                    <span>{post.comments}</span>
                                </button>
                                <div className="spacer"></div>
                                <button className="action-btn">
                                    <IoShareSocialOutline size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Bottom Padding for Nav */}
                <div style={{ height: '80px' }}></div>
            </div>

            {/* 5. Floating Write Button */}
            {/* 5. Floating Write Button */}
            <div className="fab-write-wrapper">
                <button
                    className={`fab-write ${isWriteBtnExpanded ? 'expanded' : ''}`}
                    onClick={() => {/* Add write logic later */ }}
                >
                    <div className="btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.44 5.78L4.198 16.02a2 2 0 0 0-.565 1.125l-.553 3.774l3.775-.553A2 2 0 0 0 7.98 19.8L18.22 9.56m-3.78-3.78l2.229-2.23a1.6 1.6 0 0 1 2.263 0l1.518 1.518a1.6 1.6 0 0 1 0 2.263l-2.23 2.23M14.44 5.78l3.78 3.78" />
                        </svg>
                    </div>
                    <span className="btn-text">글쓰기</span>
                </button>
            </div>
        </div>
    );
};

export default CommunityScreen;
