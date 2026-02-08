import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Mail, Bell, Globe } from 'lucide-react';
import { user, teacher } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useConfig } from '../context/ConfigContext';
import SearchModal from '../components/SearchModal';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const { t, isEnglish, switchLanguage, language } = useLanguage();
    const { getGroups, getTeacherEmail, getSchoolName, getAcademicYear, getDefaultColor } = useConfig();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const groups = getGroups();
    const defaultColor = getDefaultColor();

    // If teacher, redirect to teacher home
    useEffect(() => {
        if (role === 'teacher') {
            navigate('/teacher');
        }
    }, [role, navigate]);

    if (role === 'teacher') {
        return null;
    }

    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}`);
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const handleNewsClick = () => {
        navigate('/news');
    };

    const handleContactTeacher = () => {
        const subject = isEnglish
            ? '[Amsterdam Korean School] Inquiry'
            : '[암스테르담 한글학교] 문의드립니다';
        window.location.href = `mailto:${teacher.email}?subject=${encodeURIComponent(subject)}`;
    };

    const handleLanguageToggle = () => {
        switchLanguage(language === 'ko' ? 'en' : 'ko');
    };

    // Only translate "전체 공지" to "All Announcements"
    // Class names will be set in English by admin directly
    const translateGroupName = (name) => {
        if (isEnglish && name === '전체 공지') {
            return 'All Announcements';
        }
        return name;
    };

    return (
        <div className="home-page">
            {/* Header */}
            <header className="home-header">
                <div className="school-info">
                    <div className="school-logo">
                        <span>🏫</span>
                    </div>
                    <div className="school-text">
                        <h1 className="school-name">{getSchoolName(language)}</h1>
                        <p className="user-children">{user.children.map(c => c.name).join(' & ')}</p>
                    </div>
                </div>
                <div className="header-actions">
                    {/* Language Toggle */}
                    <button
                        className="lang-toggle-btn"
                        onClick={handleLanguageToggle}
                        title={isEnglish ? 'Switch to Korean' : '영어로 전환'}
                    >
                        <Globe size={18} />
                        <span>{language === 'ko' ? 'EN' : '한'}</span>
                    </button>
                    <button className="header-search" onClick={() => setIsSearchModalOpen(true)}>
                        <Search size={22} />
                    </button>
                </div>
            </header>

            {/* Groups Section */}
            <section className="section">
                <div className="section-header">
                    <h2>{t('home.groups')}</h2>
                    <span className="school-year">{getAcademicYear()}</span>
                </div>

                <div className="groups-list">
                    {groups.map((group, index) => (
                        <button
                            key={group.id}
                            className="group-item fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => handleGroupClick(group.id)}
                        >
                            <div className="group-indicator" style={{ backgroundColor: defaultColor }}></div>
                            <div className="group-info">
                                <span className="group-name">{isEnglish && group.nameEn ? group.nameEn : group.name}</span>
                            </div>
                            {group.image && (
                                <div className="group-avatar">
                                    <img src={group.image} alt={group.name} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Quick Actions */}
            <section className="section">
                <div className="quick-actions">
                    <button
                        className="action-item contact-btn"
                        onClick={handleContactTeacher}
                    >
                        <Mail size={22} />
                        <span>{t('home.contactTeacher')}</span>
                    </button>

                    <button className="action-item" onClick={handleSettingsClick}>
                        <Bell size={22} />
                        <span>{t('home.notificationSettings')}</span>
                    </button>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* News Preview */}
            <section className="section">
                <button className="news-link" onClick={handleNewsClick}>
                    <span className="news-icon">📰</span>
                    <span>{t('home.schoolNews')}</span>
                    <ChevronRight size={20} />
                </button>
            </section>

            {/* Modals */}
            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </div>
    );
}
