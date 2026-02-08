import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Calendar, Bell, ChevronRight, Settings, Plus, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useConfig } from '../context/ConfigContext';
import { getStudentsByClassId } from '../data/mockData';
import CreatePostModal from '../components/CreatePostModal';
import CreateEventModal from '../components/CreateEventModal';
import ProfileModal from '../components/ProfileModal';
import ClassSelectModal from '../components/ClassSelectModal';
import './TeacherHome.css';

export default function TeacherHome() {
    const navigate = useNavigate();
    const { role, selectedClass, changeClass } = useAuth();
    const { t, isEnglish } = useLanguage();
    const { getClasses, getDefaultColor } = useConfig();
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    const defaultColor = getDefaultColor();
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
    const [isClassSelectOpen, setIsClassSelectOpen] = useState(false);

    // Redirect parents to regular home
    useEffect(() => {
        if (role !== 'teacher') {
            navigate('/');
        }
    }, [role, navigate]);

    // Show class selection if no class selected
    useEffect(() => {
        if (role === 'teacher' && !selectedClass) {
            setIsClassSelectOpen(true);
        }
    }, [role, selectedClass]);

    if (role !== 'teacher') {
        return null;
    }

    // 선택된 반의 학생들
    const students = selectedClass ? getStudentsByClassId(selectedClass.id) : [];

    const quickActions = [
        { icon: FileText, label: t('teacher.createPost'), color: '#E91E63', action: () => setIsCreatePostOpen(true) },
        { icon: Calendar, label: t('teacher.createEvent'), color: '#9C27B0', action: () => setIsCreateEventOpen(true) },
        { icon: Users, label: t('teacher.studentManagement'), color: '#2196F3', action: () => navigate('/teacher/students') },
    ];

    const handleClassSelect = (classInfo) => {
        changeClass(classInfo);
    };

    // Class names will be set directly in admin settings

    return (
        <div className="teacher-home">
            {/* Header */}
            <header className="teacher-header">
                <div className="teacher-info">
                    <div className="teacher-avatar">
                        <span>👩‍🏫</span>
                    </div>
                    <div className="teacher-text">
                        <h1>{t('teacher.hello')}</h1>
                        <p>{t('home.schoolName')}</p>
                    </div>
                </div>
                <button className="settings-btn" onClick={() => navigate('/settings')}>
                    <Settings size={22} />
                </button>
            </header>

            {/* My Class */}
            {selectedClass ? (
                <section className="section">
                    <h2 className="section-title">{t('teacher.myClass')}</h2>
                    <button
                        className="class-card"
                        onClick={() => navigate('/teacher/students')}
                    >
                        <div className="class-icon" style={{ backgroundColor: defaultColor }}>
                            <Users size={24} />
                        </div>
                        <div className="class-info">
                            <h3>{selectedClass.name}</h3>
                            <p>{students.length} {t('teacher.students')}</p>
                        </div>
                        <ChevronRight size={20} className="arrow" />
                    </button>

                    {/* Change Class Button */}
                    <button className="change-class-btn" onClick={() => setIsClassSelectOpen(true)}>
                        {t('settings.changeClass')}
                    </button>
                </section>
            ) : (
                <section className="section">
                    <div className="no-class-message">
                        <p>{t('teacher.selectClassPrompt')}</p>
                        <button className="select-class-btn" onClick={() => setIsClassSelectOpen(true)}>
                            {t('teacher.selectClass')}
                        </button>
                    </div>
                </section>
            )}

            {/* Quick Actions */}
            <section className="section">
                <h2 className="section-title">{t('teacher.quickActions')}</h2>
                <div className="quick-actions-grid">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            className="quick-action-card"
                            onClick={action.action}
                        >
                            <div className="action-icon" style={{ backgroundColor: action.color }}>
                                <action.icon size={24} />
                            </div>
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Recent Activity */}
            <section className="section">
                <h2 className="section-title">{t('teacher.recentActivity')}</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-dot" style={{ backgroundColor: '#4CAF50' }}></div>
                        <div className="activity-content">
                            <p>
                                {isEnglish
                                    ? `${selectedClass?.name || 'Class'} class notes posted`
                                    : `${selectedClass?.name || '반'} 수업 알림장 작성`}
                            </p>
                            <span>{isEnglish ? 'Today 14:20' : '오늘 14:20'}</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-dot" style={{ backgroundColor: '#2196F3' }}></div>
                        <div className="activity-content">
                            <p>{isEnglish ? 'New student registered' : '새 학생 등록'}</p>
                            <span>{isEnglish ? 'Today 09:15' : '오늘 09:15'}</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-dot" style={{ backgroundColor: '#FF9800' }}></div>
                        <div className="activity-content">
                            <p>{isEnglish ? 'Spring picnic scheduled' : '봄 소풍 일정 등록'}</p>
                            <span>{isEnglish ? 'Yesterday 16:30' : '어제 16:30'}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modals */}
            <CreatePostModal
                isOpen={isCreatePostOpen}
                onClose={() => setIsCreatePostOpen(false)}
                onSubmit={(post) => {
                    console.log('New post:', post);
                    setIsCreatePostOpen(false);
                }}
            />
            <CreateEventModal
                isOpen={isCreateEventOpen}
                onClose={() => setIsCreateEventOpen(false)}
                onSubmit={(event) => {
                    console.log('New event:', event);
                    setIsCreateEventOpen(false);
                }}
            />
            <ClassSelectModal
                isOpen={isClassSelectOpen}
                onClose={() => setIsClassSelectOpen(false)}
                onSelect={handleClassSelect}
                selectedClass={selectedClass}
            />
        </div>
    );
}
