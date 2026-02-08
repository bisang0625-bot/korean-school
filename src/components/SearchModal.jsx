import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { groups, newsPosts } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import './SearchModal.css';

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const filteredGroups = groups.filter(g =>
        g.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredPosts = newsPosts.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.content.toLowerCase().includes(query.toLowerCase())
    );

    const handleGroupClick = (groupId) => {
        onClose();
        navigate(`/group/${groupId}`);
    };

    const handlePostClick = () => {
        onClose();
        navigate('/news');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="search-modal slide-up" onClick={e => e.stopPropagation()}>
                <div className="search-header">
                    <div className="search-input-wrapper">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {query && (
                    <div className="search-results">
                        {filteredGroups.length > 0 && (
                            <div className="result-section">
                                <h3>그룹</h3>
                                {filteredGroups.map(group => (
                                    <button
                                        key={group.id}
                                        className="result-item"
                                        onClick={() => handleGroupClick(group.id)}
                                    >
                                        <div className="result-indicator" style={{ backgroundColor: group.color }}></div>
                                        <span>{group.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {filteredPosts.length > 0 && (
                            <div className="result-section">
                                <h3>소식</h3>
                                {filteredPosts.map(post => (
                                    <button
                                        key={post.id}
                                        className="result-item"
                                        onClick={handlePostClick}
                                    >
                                        <div className="result-post">
                                            <span className="result-title">{post.title}</span>
                                            <span className="result-category">{post.category}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {filteredGroups.length === 0 && filteredPosts.length === 0 && (
                            <div className="no-results">
                                <p>검색 결과가 없습니다</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
