import { useState } from 'react';
import { X, CalendarDays, User, FileText } from 'lucide-react';
import { user, absenceReasons } from '../data/mockData';
import './AbsenceModal.css';

export default function AbsenceModal({ isOpen, onClose }) {
    const [selectedChild, setSelectedChild] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset and close after success
        setTimeout(() => {
            setIsSubmitted(false);
            setSelectedChild('');
            setSelectedDate('');
            setSelectedReason('');
            setOtherReason('');
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content slide-up" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>결석 신고하기</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {isSubmitted ? (
                    <div className="modal-success">
                        <div className="success-icon">✓</div>
                        <h3>결석 신고 완료!</h3>
                        <p>담임 선생님께 전달되었습니다.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="absence-form">
                        <div className="form-group">
                            <label>
                                <User size={18} />
                                자녀 선택
                            </label>
                            <select
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(e.target.value)}
                                required
                            >
                                <option value="">자녀를 선택하세요</option>
                                {user.children.map(child => (
                                    <option key={child.id} value={child.id}>
                                        {child.name} ({child.class})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                <CalendarDays size={18} />
                                결석 날짜
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <FileText size={18} />
                                결석 사유
                            </label>
                            <div className="reason-buttons">
                                {absenceReasons.map(reason => (
                                    <button
                                        key={reason.id}
                                        type="button"
                                        className={`reason-btn ${selectedReason === reason.id ? 'active' : ''}`}
                                        onClick={() => setSelectedReason(reason.id)}
                                    >
                                        {reason.labelKo}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedReason === 'other' && (
                            <div className="form-group">
                                <textarea
                                    placeholder="사유를 입력하세요..."
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            disabled={!selectedChild || !selectedDate || !selectedReason || isSubmitting}
                        >
                            {isSubmitting ? '전송 중...' : '결석 신고 제출'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
