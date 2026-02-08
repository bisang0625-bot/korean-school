import { X, Calendar, Clock, MapPin } from 'lucide-react';
import './EventModal.css';

export default function EventModal({ event, isOpen, onClose }) {
    if (!isOpen || !event) return null;

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="event-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="event-modal-header" style={{ borderLeftColor: event.color }}>
                    <h2>{event.title}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="event-modal-body">
                    <div className="event-detail">
                        <Calendar size={20} />
                        <span>{formattedDate}</span>
                    </div>

                    <div className="event-detail">
                        <Clock size={20} />
                        <span>{event.time}</span>
                    </div>

                    <div className="event-detail">
                        <MapPin size={20} />
                        <span>암스테르담 한글학교</span>
                    </div>

                    <div className="event-description">
                        <h3>일정 상세</h3>
                        <p>
                            {event.title}에 대한 상세 정보입니다.
                            해당 일정에 참여하시려면 미리 신청해 주세요.
                        </p>
                    </div>

                    <div className="event-actions">
                        <button className="btn btn-primary" onClick={onClose}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
