import React from 'react';

interface DeleteConfirmModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose, onConfirm }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={onClose}>
            <div style={{
                background: '#fff', borderRadius: '16px', padding: '24px', width: '300px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)', textAlign: 'center'
            }} onClick={e => e.stopPropagation()}>
                <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>기록 삭제</h3>
                <p style={{ marginBottom: '24px', fontSize: '15px', color: '#666', lineHeight: '1.4' }}>
                    정말 삭제하시겠습니까?<br />삭제된 기록은 복구할 수 없습니다.
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={onClose} style={{
                        flex: 1, padding: '12px', background: '#f5f5f5', color: '#666',
                        borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '15px'
                    }}>
                        취소
                    </button>
                    <button onClick={onConfirm} style={{
                        flex: 1, padding: '12px', background: '#10353A', color: '#fff',
                        borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '15px'
                    }}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
