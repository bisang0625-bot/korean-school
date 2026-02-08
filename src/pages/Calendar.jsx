import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { calendarEvents as initialEvents } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import EventModal from '../components/EventModal';
import CreateEventModal from '../components/CreateEventModal';
import './Calendar.css';

export default function Calendar() {
    const { role } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 7)); // Feb 7, 2026
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 7));
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
    const [events, setEvents] = useState(initialEvents);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

    // Get days of the week containing selectedDate
    const weekDays = useMemo(() => {
        const days = [];
        const firstDayOfWeek = new Date(selectedDate);
        const dayOfWeek = selectedDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        firstDayOfWeek.setDate(selectedDate.getDate() + diff);

        for (let i = 0; i < 7; i++) {
            const day = new Date(firstDayOfWeek);
            day.setDate(firstDayOfWeek.getDate() + i);
            days.push(day);
        }
        return days;
    }, [selectedDate]);

    // Get week range string
    const getWeekRange = () => {
        const start = weekDays[0];
        const end = weekDays[6];
        const startMonth = start.getMonth() + 1;
        const endMonth = end.getMonth() + 1;
        return `${startMonth}월 ${start.getDate()}일 - ${endMonth}월 ${end.getDate()}일`;
    };

    // Filter events for selected date and upcoming
    const upcomingEvents = useMemo(() => {
        const today = new Date(selectedDate);
        today.setHours(0, 0, 0, 0);

        return events
            .filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate >= today;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 6);
    }, [selectedDate, events]);

    // Get events for selected date
    const selectedDateEvents = useMemo(() => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        return events.filter(event => event.date === dateStr);
    }, [selectedDate, events]);

    const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return {
            dayName: days[date.getDay()],
            dayNum: date.getDate()
        };
    };

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const hasEvent = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return events.some(event => event.date === dateStr);
    };

    const goToPrevMonth = () => {
        const newDate = new Date(year, month - 1, 1);
        setCurrentDate(newDate);
        setSelectedDate(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(year, month + 1, 1);
        setCurrentDate(newDate);
        setSelectedDate(newDate);
    };

    const goToToday = () => {
        const today = new Date(2026, 1, 7); // Feb 7, 2026 for demo
        setCurrentDate(today);
        setSelectedDate(today);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleCreateEvent = (newEvent) => {
        const event = {
            id: Date.now(),
            ...newEvent,
            color: '#E91E63'
        };
        setEvents([...events, event]);
    };

    return (
        <div className="calendar-page">
            {/* Header */}
            <header className="calendar-header">
                <div className="header-content">
                    <h1>일정</h1>
                    <p>암스테르담 한글학교</p>
                </div>
                <button className="today-btn" onClick={goToToday}>
                    <CalendarIcon size={20} />
                </button>
            </header>

            {/* Month Navigation */}
            <div className="month-nav">
                <button onClick={goToPrevMonth}>
                    <ChevronLeft size={20} />
                </button>
                <span className="month-title">{monthNames[month]}</span>
                <button onClick={goToNextMonth}>
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Week View */}
            <div className="week-view">
                <div className="day-headers">
                    {dayNames.map((day, i) => (
                        <div key={day} className={`day-header ${i === 5 ? 'saturday' : i === 6 ? 'sunday' : ''}`}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className="day-cells">
                    {weekDays.map((day, i) => (
                        <button
                            key={i}
                            className={`day-cell ${isSameDay(day, selectedDate) ? 'selected' : ''} ${hasEvent(day) ? 'has-event' : ''}`}
                            onClick={() => setSelectedDate(day)}
                        >
                            {day.getDate()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Month Pill */}
            <div className="month-pill">
                <span>{monthNames[month]}</span>
            </div>

            {/* Teacher: Create Event Button */}
            {role === 'teacher' && (
                <button className="fab-create" onClick={() => setIsCreateEventOpen(true)}>
                    <Plus size={24} />
                </button>
            )}

            {/* Events Section */}
            <div className="events-section">
                {/* Selected Date Events */}
                <div className="week-section">
                    <h3 className="week-label">Week {Math.ceil(selectedDate.getDate() / 7)}, {getWeekRange()}</h3>

                    {/* Today indicator */}
                    <div className="today-indicator">
                        <div className="today-date">
                            <span className="day-abbr">{['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]}</span>
                            <span className="day-number">{selectedDate.getDate()}</span>
                        </div>
                        <div className="today-line"></div>
                        {selectedDateEvents.length > 0 ? (
                            <div className="today-events">
                                {selectedDateEvents.map(event => (
                                    <button
                                        key={event.id}
                                        className="today-event-pill"
                                        style={{ backgroundColor: event.color }}
                                        onClick={() => handleEventClick(event)}
                                    >
                                        {event.title}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <span className="no-events">오늘 일정이 없습니다</span>
                        )}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="events-list">
                    {upcomingEvents.map((event, index) => {
                        const { dayName, dayNum } = formatEventDate(event.date);
                        return (
                            <button
                                key={event.id}
                                className="event-row fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handleEventClick(event)}
                            >
                                <div className="event-date-col">
                                    <span className="event-day-name">{dayName}</span>
                                    <span className="event-day-num">{dayNum}</span>
                                </div>
                                <div className="event-card" style={{ borderLeftColor: event.color }}>
                                    <h4 className="event-title">{event.title}</h4>
                                    <span className="event-time">{event.time}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Modals */}
            <EventModal
                event={selectedEvent}
                isOpen={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
            />
            <CreateEventModal
                isOpen={isCreateEventOpen}
                onClose={() => setIsCreateEventOpen(false)}
                onSubmit={handleCreateEvent}
            />
        </div>
    );
}
