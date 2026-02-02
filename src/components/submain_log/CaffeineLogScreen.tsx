import React, { useState } from 'react';
import { IoChevronBack, IoChevronForward, IoPencil, IoTrashOutline } from 'react-icons/io5';
import './CaffeineLogScreen.css';
import DeleteConfirmModal from '../popup/DeleteConfirmModal';
import CaffeineStatusCard from '../common/CaffeineStatusCard';

export interface CaffeineRecord {
    id: string;
    brand: string;
    menu: string;
    size: string;
    caffeine: number;
    date: Date;
    isDecaf: boolean;
}

interface CaffeineLogScreenProps {
    records: CaffeineRecord[];
    onDelete: (id: string) => void;
    onEdit: (record: CaffeineRecord) => void;
    maxIntake?: number;
}

const CaffeineLogScreen: React.FC<CaffeineLogScreenProps> = ({ records, onDelete, onEdit, maxIntake = 400 }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    // Helper to format date: "2024년 5월 22일 (수)"
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        };
        return date.toLocaleDateString('ko-KR', options);
    };

    // Helper to check if same day
    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    // Filter records for selected date
    const dailyRecords = records.filter(r => isSameDay(r.date, selectedDate));

    // Sort by time descending (latest first)
    dailyRecords.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Calculate metrics
    const totalCaffeine = dailyRecords.reduce((sum, r) => sum + r.caffeine, 0);
    // const maxCaffeine = 400; // Daily recommended limit - Replaced by prop
    // const progressPercent = Math.min((totalCaffeine / maxCaffeine) * 100, 100); - Handled by Card

    // Date Navigation
    const changeDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const handleDeleteConfirm = () => {
        if (deleteTargetId) {
            onDelete(deleteTargetId);
            setDeleteTargetId(null);
        }
    };

    return (
        <div className="log-screen-container">
            {/* Header: Date Controller */}
            <header className="log-header">
                <div className="date-controller">
                    <button className="date-btn" onClick={() => changeDate(-1)}>
                        <IoChevronBack size={18} />
                    </button>
                    <span className="date-display">{formatDate(selectedDate)}</span>
                    <button className="date-btn" onClick={() => changeDate(1)} disabled={isSameDay(selectedDate, new Date())}>
                        <IoChevronForward size={18} color={isSameDay(selectedDate, new Date()) ? '#ddd' : '#333'} />
                    </button>
                </div>
            </header>

            {/* Section 1: Summary Dashboard */}
            <CaffeineStatusCard
                currentIntake={totalCaffeine}
                maxIntake={maxIntake}
                showSettingsBtn={false}
                className="log-summary-card"
            />
            {/* 
            <section className="summary-card">
                <div className="summary-title">오늘의 총 카페인 섭취량</div>
                <div className="caffeine-score">
                    {totalCaffeine} <span className="max-caffeine">/ {maxCaffeine} mg</span>
                </div>

                <div className="caffeine-progress-container">
                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercent}%`, backgroundColor: totalCaffeine > maxCaffeine ? '#FF5C5C' : undefined }}
                        />
                    </div>
                </div>

                <div className="safety-message">
                    {totalCaffeine > maxCaffeine
                        ? "하루 권장량을 초과했어요! 😢"
                        : "오늘 수면 시간(11PM)까지 안전해요! 😊"
                    }
                </div>
            </section> 
            */}

            {/* Section 2: Timeline History */}
            <section className="timeline-section">
                {dailyRecords.length === 0 ? (
                    <div className="empty-day-state">
                        <p>기록된 카페인 섭취가 없습니다.</p>
                    </div>
                ) : (
                    dailyRecords.map(record => (
                        <div key={record.id} className="timeline-item">
                            <div className="time-badge">
                                {record.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </div>
                            <div className="timeline-content">
                                <div className="timeline-brand">{record.brand}</div>
                                <div className="timeline-menu">
                                    {record.menu} {record.isDecaf && '🌙'}
                                </div>
                                <div className="timeline-desc">
                                    {record.size}
                                </div>
                            </div>
                            <div className="timeline-caffeine">
                                {record.caffeine}mg
                            </div>

                            {/* Edit/Delete Actions */}
                            <div className="timeline-actions">
                                <button className="action-btn" onClick={() => onEdit(record)}>
                                    <IoPencil size={16} color="#888" />
                                </button>
                                <button className="action-btn" onClick={() => setDeleteTargetId(record.id)}>
                                    <IoTrashOutline size={16} color="#FF5C5C" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </section>

            {/* Delete Confirmation Modal */}
            {deleteTargetId && (
                <DeleteConfirmModal
                    onClose={() => setDeleteTargetId(null)}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default CaffeineLogScreen;
