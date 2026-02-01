import React, { useState } from 'react';

interface EditRecordModalProps {
    record: {
        id: string;
        date: Date;
        caffeine: number;
        menu: string;
    };
    onClose: () => void;
    onSave: (id: string, newDate: Date, newCaffeine: number) => void;
}

const EditRecordModal: React.FC<EditRecordModalProps> = ({ record, onClose, onSave }) => {
    // Local state for editing fields
    const [caffeine, setCaffeine] = useState(record.caffeine);
    // Date/Time handling - simplifying to just Time for this MVP or full Date?
    // Let's allow changing Time (hours/mins) as that's most common fix.
    const [timeStr, setTimeStr] = useState(() => {
        const h = record.date.getHours().toString().padStart(2, '0');
        const m = record.date.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
    });

    const handleSave = () => {
        const [h, m] = timeStr.split(':').map(Number);
        const newDate = new Date(record.date);
        newDate.setHours(h);
        newDate.setMinutes(m);
        onSave(record.id, newDate, Number(caffeine));
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={onClose}>
            <div style={{
                background: '#fff', borderRadius: '16px', padding: '24px', width: '320px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }} onClick={e => e.stopPropagation()}>
                <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>기록 수정</h3>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>시간</label>
                    <input
                        type="time"
                        value={timeStr}
                        onChange={e => setTimeStr(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>카페인 함량 (mg)</label>
                    <input
                        type="number"
                        value={caffeine}
                        onChange={e => setCaffeine(Number(e.target.value))}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f5f5f5', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>취소</button>
                    <button onClick={handleSave} style={{ flex: 1, padding: '12px', background: '#10353A', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>저장</button>
                </div>
            </div>
        </div>
    );
};

export default EditRecordModal;
