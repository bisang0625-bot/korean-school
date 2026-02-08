import { useState } from 'react';
import { X, Image, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './CreatePostModal.css';

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('1학년 가반');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        onSubmit({
            title,
            content,
            category,
            author: `${user.name} 선생님`,
        });

        setTitle('');
        setContent('');
        setIsSubmitting(false);
        onClose();
    };

    const categories = [
        { value: '전체 공지', label: '전체 공지' },
        { value: '1학년 가반', label: '1학년 가반' },
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="create-post-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>새 공지 작성</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="post-form">
                    <div className="form-group">
                        <label>카테고리</label>
                        <div className="category-select">
                            {categories.map(cat => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    className={`category-btn ${category === cat.value ? 'active' : ''}`}
                                    onClick={() => setCategory(cat.value)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="공지 제목을 입력하세요"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요..."
                            rows={6}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="attach-btn">
                            <Image size={20} />
                            <span>사진 첨부</span>
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting || !title.trim() || !content.trim()}
                        >
                            {isSubmitting ? '게시 중...' : (
                                <>
                                    <Send size={18} />
                                    <span>게시</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
