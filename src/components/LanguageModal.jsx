import { X, Check } from 'lucide-react';
import './LanguageModal.css';

const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
];

export default function LanguageModal({ isOpen, onClose, currentLanguage, onSelect }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="language-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="language-header">
                    <h2>언어 선택</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="language-list">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`language-item ${currentLanguage === lang.code ? 'selected' : ''}`}
                            onClick={() => {
                                onSelect(lang.code);
                                onClose();
                            }}
                        >
                            <span className="language-flag">{lang.flag}</span>
                            <span className="language-name">{lang.name}</span>
                            {currentLanguage === lang.code && (
                                <Check size={20} className="language-check" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
