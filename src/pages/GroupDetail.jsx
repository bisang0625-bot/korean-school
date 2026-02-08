import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Settings } from 'lucide-react';
import { newsPosts } from '../data/mockData';
import { useConfig } from '../context/ConfigContext';
import './GroupDetail.css';

export default function GroupDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getGroups, getDefaultColor } = useConfig();
    const groups = getGroups();
    const defaultColor = getDefaultColor();

    const group = groups.find(g => g.id === parseInt(id));
    const groupPosts = newsPosts.filter(post => post.category === group?.name);

    if (!group) {
        return (
            <div className="group-detail-page">
                <p>그룹을 찾을 수 없습니다</p>
                <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
            </div>
        );
    }

    const formatDate = (dateString, timeString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('ko-KR', { month: 'long' });
        return `${day} ${month.replace('월', '')}월 - ${timeString}`;
    };

    return (
        <div className="group-detail-page">
            <header className="group-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <ChevronLeft size={24} />
                </button>
                <div className="group-title">
                    <h1>{group.name}</h1>
                    <p>암스테르담 한글학교</p>
                </div>
                <div className="header-actions">
                    <button><Search size={20} /></button>
                    <button><Settings size={20} /></button>
                </div>
            </header>

            <div className="group-banner" style={{ backgroundColor: defaultColor + '20' }}>
                <div className="group-icon" style={{ backgroundColor: defaultColor }}>
                    <span>{group.icon || '📚'}</span>
                </div>
                <h2>{group.name}</h2>
                <p>{groupPosts.length}개의 게시물</p>
            </div>

            <div className="group-feed">
                {groupPosts.length > 0 ? (
                    groupPosts.map((post, index) => (
                        <article key={post.id} className="post-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="post-header">
                                <div className="author-avatar">
                                    <span>{post.authorInitials}</span>
                                </div>
                                <div className="author-info">
                                    <span className="author-name">{post.author}</span>
                                    <span className="post-date">{formatDate(post.date, post.time)}</span>
                                </div>
                            </div>
                            <div className="post-content">
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-text">{post.content}</p>
                            </div>
                            {post.image && (
                                <div className="post-image">
                                    <img src={post.image} alt="" />
                                </div>
                            )}
                        </article>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>아직 게시물이 없습니다</p>
                    </div>
                )}
            </div>
        </div>
    );
}
