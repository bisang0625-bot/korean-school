import { useState } from 'react';
import { X, Calendar, Clock, Send } from 'lucide-react';
import './CreateEventModal.css';

export default function CreateEventModal({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !date) return;

        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        onSubmit({
            title,
            date,
            time: time || '종일',
            description,
        });

        setTitle('');
        setDate('');
        setTime('');
        setDescription('');
        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="create-event-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>새 일정 등록</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="event-form">
                    <div className="form-group">
                        <label>
                            <Calendar size={18} />
                            일정 제목
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="일정 제목을 입력하세요"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                <Calendar size={18} />
                                날짜
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Clock size={18} />
                                시간
                            </label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>상세 내용 (선택)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="일정에 대한 추가 정보..."
                            rows={3}
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting || !title.trim() || !date}
                    >
                        {isSubmitting ? '등록 중...' : (
                            <>
                                <Send size={18} />
                                <span>일정 등록</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
