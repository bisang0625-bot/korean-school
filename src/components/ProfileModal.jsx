import { useState, useEffect } from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ProfileModal.css';

export default function ProfileModal({ isOpen, onClose, user, onSave }) {
    const { t, isEnglish } = useLanguage();
    const [name, setName] = useState(user?.name || '');
    const [firstName, setFirstName] = useState(user?.nameEn?.firstName || '');
    const [lastName, setLastName] = useState(user?.nameEn?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setFirstName(user.nameEn?.firstName || '');
            setLastName(user.nameEn?.lastName || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));

        onSave({
            name,
            nameEn: { firstName, lastName },
            email,
            phone
        });
        setIsSaving(false);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="profile-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="profile-modal-header">
                    <h2>{t('profile.title')}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="profile-avatar-edit">
                        <div className="avatar-circle">
                            <User size={40} />
                        </div>
                        <button type="button" className="change-avatar">
                            {t('profile.changePhoto')}
                        </button>
                    </div>

                    {/* Korean Name */}
                    <div className="form-group">
                        <label>
                            <User size={18} />
                            {t('profile.name')}
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('profile.namePlaceholder')}
                        />
                    </div>

                    {/* English Name Fields */}
                    <div className="form-group english-name-group">
                        <label>
                            <User size={18} />
                            {t('profile.nameEnglish')}
                        </label>
                        <div className="name-fields">
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={t('profile.firstNamePlaceholder')}
                                className="name-input"
                            />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder={t('profile.lastNamePlaceholder')}
                                className="name-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            <Mail size={18} />
                            {t('profile.email')}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('profile.emailPlaceholder')}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Phone size={18} />
                            {t('profile.phone')}
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t('profile.phonePlaceholder')}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary save-btn"
                        disabled={isSaving}
                    >
                        {isSaving ? (isEnglish ? 'Saving...' : '저장 중...') : t('common.save')}
                    </button>
                </form>
            </div>
        </div>
    );
}
