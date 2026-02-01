import React, { useState, useEffect } from 'react';
import { IoPencil } from 'react-icons/io5';
import './FloatingRecordBtn.css';

interface FloatingRecordBtnProps {
    onClick: () => void;
}

const FloatingRecordBtn: React.FC<FloatingRecordBtnProps> = ({ onClick }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(false);
        }, 2000); // Collapse after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="floating-btn-wrapper">
            <button
                className={`floating-record-btn ${isExpanded ? 'expanded' : ''}`}
                onClick={onClick}
                aria-label="카페인 섭취량 기록하기"
            >
                <div className="btn-icon">
                    <IoPencil size={24} />
                </div>
                <span className="btn-text">카페인 섭취량 기록하기</span>
            </button>
        </div>
    );
};

export default FloatingRecordBtn;
