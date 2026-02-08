import { X, Users } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { useLanguage } from '../context/LanguageContext';
import './ClassSelectModal.css';

export default function ClassSelectModal({ isOpen, onClose, onSelect, selectedClass }) {
    const { getClasses, getDefaultColor } = useConfig();
    const { t, isEnglish } = useLanguage();
    const classes = getClasses();
    const defaultColor = getDefaultColor();

    if (!isOpen) return null;

    const handleSelect = (classItem) => {
        onSelect(classItem);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="class-select-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{t('teacher.selectClass')}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <p className="select-description">
                        {t('teacher.selectClassPrompt')}
                    </p>

                    <div className="class-list">
                        {classes.map((classItem) => (
                            <button
                                key={classItem.id}
                                className={`class-option ${selectedClass?.id === classItem.id ? 'selected' : ''}`}
                                onClick={() => handleSelect(classItem)}
                            >
                                <div
                                    className="class-icon"
                                    style={{ backgroundColor: defaultColor }}
                                >
                                    <Users size={24} />
                                </div>
                                <div className="class-details">
                                    <span className="class-name">
                                        {isEnglish && classItem.nameEn ? classItem.nameEn : classItem.name}
                                    </span>
                                    <span className="class-students">
                                        {classItem.studentCount || 0} {t('teacher.students')}
                                    </span>
                                </div>
                                {selectedClass?.id === classItem.id && (
                                    <span className="selected-badge">
                                        {isEnglish ? 'Selected' : '선택됨'}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
