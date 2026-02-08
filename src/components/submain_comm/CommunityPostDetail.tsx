import React from 'react';
import { IoChevronBack, IoShareSocialOutline, IoAlertCircleOutline } from 'react-icons/io5';
import './CommunityPostDetail.css';

interface Post {
    id: string;
    category: string;
    title: string;
    content: string;
    comments: number;
    likes: number;
    time: string;
}

interface CommunityPostDetailProps {
    post: Post;
    onBack: () => void;
}

const CommunityPostDetail: React.FC<CommunityPostDetailProps> = ({ post, onBack }) => {
    return (
        <div className="comm-detail-container">
            {/* Header */}
            <header className="comm-detail-header">
                <button className="icon-btn" onClick={onBack}>
                    <IoChevronBack size={24} />
                </button>
                <div className="header-title">게시글</div>
                <div className="header-actions">
                    <button className="icon-btn"><IoShareSocialOutline size={22} /></button>
                    <button className="icon-btn"><IoAlertCircleOutline size={22} color="#EB5757" /></button>
                </div>
            </header>

            <div className="comm-detail-content">
                {/* Author Info */}
                <section className="author-section">
                    <div className="author-avatar-placeholder"></div>
                    <div className="author-info">
                        <div className="author-name">디카페인 7일차</div>
                        <div className="post-date">2026.02.03</div>
                    </div>
                </section>

                {/* Content */}
                <section className="post-body">
                    <h2 className="detail-title">{post.title}</h2>
                    <p className="detail-text">
                        "디카페인 커피로 바꾸고 나서 밤에 잠드는 시간이
                        30분이나 빨라졌어요! 확실히 효과가 있네요."
                        <br /><br />
                        {post.content}
                    </p>

                    {/* Mock Image Area (Conditional based on mock logic or always showing for demo) */}
                    <div className="post-images">
                        <div className="post-img-placeholder">☕️ 디카페인 커피 사진</div>
                    </div>
                </section>

                {/* Reactions */}
                <section className="reaction-section">
                    <div className="reaction-title">따뜻한 공감을 남겨주세요!</div>
                    <div className="reaction-buttons">
                        <button className="reaction-btn">
                            <span className="emoji">👍</span>
                            <span>칭찬해요</span>
                        </button>
                        <button className="reaction-btn">
                            <span className="emoji">❤️</span>
                            <span>공감해요</span>
                        </button>
                        <button className="reaction-btn">
                            <span className="emoji">👏</span>
                            <span>응원해요</span>
                        </button>
                    </div>
                </section>

                {/* Comments */}
                <section className="comment-section">
                    <div className="section-title">댓글 {post.comments}</div>
                    <div className="comment-list">
                        <div className="comment-item">
                            <div className="comment-user">사용자A</div>
                            <div className="comment-text">저도요! 처음 사흘은 힘들었는데 지금은 대만족이에요.</div>
                            <div className="comment-time">방금 전</div>
                        </div>
                        <div className="comment-item">
                            <div className="comment-user">사용자B</div>
                            <div className="comment-text">어떤 브랜드 드시는지 궁금해요!</div>
                            <div className="comment-time">10분 전</div>
                        </div>
                        {/* More mock comments */}
                        <div className="comment-item">
                            <div className="comment-user">커피러버</div>
                            <div className="comment-text">디카페인도 맛있는 곳 많더라고요 ㅎㅎ</div>
                            <div className="comment-time">30분 전</div>
                        </div>
                    </div>
                </section>

                {/* Disclaimer */}
                <section className="disclaimer-box">
                    <IoAlertCircleOutline size={20} className="disclaimer-icon" />
                    <p>
                        본 커뮤니티의 내용은 사용자의 개인적인 경험이며,
                        의학적 전문 상담을 대신할 수 없습니다.
                    </p>
                </section>

                {/* Bottom Padding */}
                <div style={{ height: '40px' }}></div>
            </div>
        </div>
    );
};

export default CommunityPostDetail;
