import { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { useLanguage } from '../context/LanguageContext';
import './TeacherPasswordModal.css';

export default function TeacherPasswordModal({ isOpen, onClose, onSuccess }) {
    const { getTeacherPassword } = useConfig();
    const { t, isEnglish } = useLanguage();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (password === getTeacherPassword()) {
            setPassword('');
            onSuccess();
        } else {
            setError(t('password.incorrect'));
        }
        setIsLoading(false);
    };

    const handleClose = () => {
        setPassword('');
        setError('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="password-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{t('password.title')}</h2>
                    <button className="modal-close" onClick={handleClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="lock-icon">
                        <Lock size={48} />
                    </div>
                    <p className="modal-description">
                        {t('password.description')}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                placeholder={t('password.placeholder')}
                                autoFocus
                            />
                            <button
                                type="button"
                                className="toggle-visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={!password.trim() || isLoading}
                        >
                            {isLoading ? t('password.verifying') : t('password.submit')}
                        </button>
                    </form>

                    <p className="hint-text">
                        {isEnglish
                            ? 'The password is shared with teachers at the beginning of each semester.'
                            : '비밀번호는 학기 초에 선생님들에게 공유됩니다.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
