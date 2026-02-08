import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, LogOut, ChevronRight, Globe, Shield, HelpCircle, Users, RefreshCw } from 'lucide-react';
import { user } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useConfig } from '../context/ConfigContext';
import ProfileModal from '../components/ProfileModal';
import TeacherPasswordModal from '../components/TeacherPasswordModal';
import ClassSelectModal from '../components/ClassSelectModal';
import './Settings.css';

export default function Settings() {
    const navigate = useNavigate();
    const { role, user: authUser, selectedClass, switchToTeacher, switchToParent, changeClass, updateUser } = useAuth();
    const { language, switchLanguage, t, isEnglish } = useLanguage();
    const { getDefaultColor } = useConfig();
    const [notifications, setNotifications] = useState(true);

    const defaultColor = getDefaultColor();

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isClassSelectOpen, setIsClassSelectOpen] = useState(false);
    const [userData, setUserData] = useState({ ...user, ...authUser });

    useEffect(() => {
        setUserData(prev => ({ ...prev, ...authUser }));
    }, [authUser]);

    const handleLogout = () => {
        const confirmMsg = isEnglish ? 'Are you sure you want to logout?' : '정말 로그아웃 하시겠습니까?';
        const logoutMsg = isEnglish ? 'Logged out successfully.' : '로그아웃 되었습니다.';
        if (confirm(confirmMsg)) {
            alert(logoutMsg);
        }
    };

    const handleProfileSave = (updatedProfile) => {
        setUserData(prev => ({ ...prev, ...updatedProfile }));
        updateUser(updatedProfile);
        const msg = isEnglish ? 'Profile saved!' : '프로필이 저장되었습니다!';
        alert(msg);
    };

    const handleRoleSwitchClick = () => {
        if (role === 'teacher') {
            switchToParent();
            navigate('/');
        } else {
            setIsPasswordModalOpen(true);
        }
    };

    const handlePasswordSuccess = () => {
        setIsPasswordModalOpen(false);
        setIsClassSelectOpen(true);
    };

    const handleClassSelect = (classInfo) => {
        switchToTeacher(classInfo);
        navigate('/teacher');
    };

    const handleChangeClass = () => {
        setIsClassSelectOpen(true);
    };

    const handleLanguageChange = (lang) => {
        switchLanguage(lang);
    };

    // Get display name based on language
    const getDisplayName = () => {
        if (isEnglish && userData.nameEn?.firstName && userData.nameEn?.lastName) {
            return `${userData.nameEn.firstName} ${userData.nameEn.lastName}`;
        }
        return userData.name || '김민지';
    };

    return (
        <div className="settings-page">
            {/* Header */}
            <header className="settings-header">
                <h1>{t('settings.title')}</h1>
                <span className={`role-badge ${role}`}>
                    {role === 'teacher' ? t('common.teacher') : t('common.parent')}
                </span>
            </header>

            {/* Profile Section */}
            <section className="profile-section" onClick={() => setIsProfileModalOpen(true)}>
                <div className="profile-avatar">
                    {role === 'teacher' ? <Users size={32} /> : <User size={32} />}
                </div>
                <div className="profile-info">
                    <h2>{getDisplayName()}</h2>
                    <p>{userData.email}</p>
                </div>
                <ChevronRight size={20} className="profile-arrow" />
            </section>

            {/* Role Switch */}
            <section className="section">
                <h3 className="section-title">{t('settings.roleSwitch')}</h3>
                <button className="role-switch-btn" onClick={handleRoleSwitchClick}>
                    <div className="setting-icon">
                        <RefreshCw size={20} />
                    </div>
                    <span className="setting-label">
                        {role === 'teacher' ? t('settings.switchToParent') : t('settings.switchToTeacher')}
                    </span>
                    <ChevronRight size={18} className="setting-arrow" />
                </button>
            </section>

            {/* Teacher: Class Selection */}
            {role === 'teacher' && selectedClass && (
                <section className="section">
                    <h3 className="section-title">{t('settings.myClass')}</h3>
                    <button className="class-info-card" onClick={handleChangeClass}>
                        <div className="class-avatar" style={{ background: `linear-gradient(135deg, ${defaultColor} 0%, ${defaultColor}CC 100%)` }}>
                            <span>🎒</span>
                        </div>
                        <div className="class-details">
                            <span className="class-name">{selectedClass.name}</span>
                            <span className="class-count">{selectedClass.studentCount} {t('teacher.students')}</span>
                        </div>
                        <ChevronRight size={20} style={{ color: 'var(--color-gray-400)' }} />
                    </button>
                </section>
            )}

            {/* Children Info - only for parents */}
            {role === 'parent' && userData.children && (
                <section className="section">
                    <h3 className="section-title">{isEnglish ? 'Children' : '자녀 정보'}</h3>
                    <div className="children-list">
                        {userData.children.map(child => (
                            <div key={child.id} className="child-item">
                                <div className="child-avatar">
                                    <span>{child.name.charAt(0)}</span>
                                </div>
                                <div className="child-info">
                                    <span className="child-name">{child.name}</span>
                                    <span className="child-class">{child.class}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Settings Section */}
            <section className="section">
                <h3 className="section-title">{isEnglish ? 'App Settings' : '앱 설정'}</h3>
                <div className="settings-list">
                    <div className="setting-item">
                        <div className="setting-icon">
                            <Bell size={20} />
                        </div>
                        <span className="setting-label">{t('settings.notifications')}</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>



                    {/* Language Selection */}
                    <div className="setting-item language-selector">
                        <div className="setting-icon">
                            <Globe size={20} />
                        </div>
                        <span className="setting-label">{t('settings.language')}</span>
                        <div className="language-buttons">
                            <button
                                className={`lang-btn ${language === 'ko' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('ko')}
                            >
                                한국어
                            </button>
                            <button
                                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('en')}
                            >
                                English
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="section">
                <h3 className="section-title">{isEnglish ? 'Support' : '지원'}</h3>
                <div className="settings-list">
                    <button className="setting-item clickable" onClick={() => navigate('/help')}>
                        <div className="setting-icon">
                            <HelpCircle size={20} />
                        </div>
                        <span className="setting-label">{isEnglish ? 'Help' : '도움말'}</span>
                        <ChevronRight size={18} className="setting-arrow" />
                    </button>

                    <button className="setting-item clickable" onClick={() => navigate('/privacy')}>
                        <div className="setting-icon">
                            <Shield size={20} />
                        </div>
                        <span className="setting-label">{t('settings.privacyPolicy')}</span>
                        <ChevronRight size={18} className="setting-arrow" />
                    </button>
                </div>
            </section>

            {/* Logout Button */}
            <section className="section">
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>{t('settings.logout')}</span>
                </button>
            </section>

            {/* Version */}
            <div className="version-info">
                <p>{t('home.schoolName')}</p>
                <p>{t('settings.version')} 1.0.0</p>
            </div>

            {/* Modals */}
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                user={userData}
                onSave={handleProfileSave}
            />
            <TeacherPasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSuccess={handlePasswordSuccess}
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
