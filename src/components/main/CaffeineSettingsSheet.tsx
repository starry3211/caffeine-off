import React, { useState, useEffect } from 'react';
import './CaffeineSettingsSheet.css';
import { BiCheck } from 'react-icons/bi';

interface CaffeineSettingsSheetProps {
    isOpen: boolean;
    onClose: () => void;
    currentMax: number;
    onApply: (newMax: number) => void;
}

const CaffeineSettingsSheet: React.FC<CaffeineSettingsSheetProps> = ({
    isOpen,
    onClose,
    currentMax,
    onApply
}) => {
    const [selectedOption, setSelectedOption] = useState<number | 'custom'>(currentMax);
    const [customValue, setCustomValue] = useState<string>('');

    // Sleep Time State
    const [sleepTimeAmPm, setSleepTimeAmPm] = useState<'AM' | 'PM'>('PM');
    const [sleepTimeValue, setSleepTimeValue] = useState<string>('11');

    // Sync state when opening
    useEffect(() => {
        if (isOpen) {
            if (currentMax === 400 || currentMax === 300) {
                setSelectedOption(currentMax);
                setCustomValue('');
            } else {
                setSelectedOption('custom');
                setCustomValue(currentMax.toString());
            }
        }
    }, [isOpen, currentMax]);

    const handleApply = () => {
        let finalValue = currentMax;
        if (selectedOption === 'custom') {
            const parsed = parseInt(customValue, 10);
            if (!isNaN(parsed) && parsed > 0) {
                finalValue = parsed;
            }
        } else {
            finalValue = selectedOption;
        }
        onApply(finalValue);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="sheet-overlay" onClick={onClose}>
            <div className="sheet-content" onClick={e => e.stopPropagation()}>
                <div className="sheet-header">
                    <h2 className="sheet-title">하루 카페인 섭취량 정하기</h2>
                </div>

                <div className="sheet-body">
                    <label className={`sheet-option ${selectedOption === 400 ? 'selected' : ''}`}>
                        <div className="option-row">
                            <input
                                type="radio"
                                name="caffeine-goal"
                                checked={selectedOption === 400}
                                onChange={() => setSelectedOption(400)}
                            />
                            <div className="option-text">
                                <span className="option-value">400mg</span>
                                <span className="option-desc">성인 카페인 1일 권장 최대 섭취량이에요</span>
                            </div>
                        </div>
                        {selectedOption === 400 && <BiCheck size={24} className="check-icon" />}
                    </label>

                    <label className={`sheet-option ${selectedOption === 300 ? 'selected' : ''}`}>
                        <div className="option-row">
                            <input
                                type="radio"
                                name="caffeine-goal"
                                checked={selectedOption === 300}
                                onChange={() => setSelectedOption(300)}
                            />
                            <div className="option-text">
                                <span className="option-value">300mg</span>
                                <span className="option-desc">임산부 카페인 1일 권장 최대 섭취량이에요</span>
                            </div>
                        </div>
                        {selectedOption === 300 && <BiCheck size={24} className="check-icon" />}
                    </label>

                    <label className={`sheet-option ${selectedOption === 'custom' ? 'selected' : ''}`}>
                        <div className="option-row">
                            <input
                                type="radio"
                                name="caffeine-goal"
                                checked={selectedOption === 'custom'}
                                onChange={() => setSelectedOption('custom')}
                            />
                            <div className="option-text">
                                <span className="option-value">직접 정하기</span>
                                <span className="option-desc">원하는 하루 카페인 섭취량을 직접 정해보세요</span>
                            </div>
                        </div>
                        {selectedOption === 'custom' && <BiCheck size={24} className="check-icon" />}
                    </label>

                    {selectedOption === 'custom' && (
                        <div className="custom-input-wrapper">
                            <input
                                type="number"
                                className="custom-input"
                                value={customValue}
                                onChange={(e) => setCustomValue(e.target.value)}
                                placeholder="예: 200"
                            />
                            <span className="unit-text">mg</span>
                        </div>
                    )}
                </div>

                <div className="section-divider"></div>

                <div className="sheet-body">
                    <h3 className="setting-section-title">잠 드는 시간</h3>
                    <div className="sleep-time-controls">
                        <div className="ampm-toggle">
                            <button
                                className={`ampm-btn ${sleepTimeAmPm === 'AM' ? 'active' : ''}`}
                                onClick={() => setSleepTimeAmPm('AM')}
                            >
                                오전
                            </button>
                            <button
                                className={`ampm-btn ${sleepTimeAmPm === 'PM' ? 'active' : ''}`}
                                onClick={() => setSleepTimeAmPm('PM')}
                            >
                                오후
                            </button>
                        </div>
                        <div className="time-input-container">
                            <input
                                type="number"
                                inputMode="numeric"
                                className="time-input"
                                value={sleepTimeValue}
                                onChange={(e) => setSleepTimeValue(e.target.value)}
                                placeholder="11"
                            />
                            <span className="time-unit">시</span>
                        </div>
                    </div>
                </div>

                <button className="sheet-submit-btn" onClick={handleApply}>
                    완료
                </button>
            </div>
        </div>
    );
};

export default CaffeineSettingsSheet;
