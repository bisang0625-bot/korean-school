import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Settings, ThumbsUp, MoreHorizontal, Plus } from 'lucide-react';
import { newsPosts as initialPosts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SearchModal from '../components/SearchModal';
import CreatePostModal from '../components/CreatePostModal';
import './News.css';

export default function News() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const { t, isEnglish } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [likedPosts, setLikedPosts] = useState({});
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [posts, setPosts] = useState(initialPosts);

    // Category translation mapping
    const translateCategory = (category) => {
        const categoryMap = {
            '전체 공지': isEnglish ? 'All Announcements' : '전체 공지',
            '1학년 가반': isEnglish ? 'Grade 1 Class A' : '1학년 가반',
            '2학년 나반': isEnglish ? 'Grade 2 Class B' : '2학년 나반',
            '유치반': isEnglish ? 'Kindergarten' : '유치반',
        };
        return categoryMap[category] || category;
    };

    // Translate author (선생님 → Teacher)
    const translateAuthor = (author) => {
        if (isEnglish && author && author.includes('선생님')) {
            // "박지민 선생님" -> "Park Ji-min (Teacher)" or just use a simpler format
            const namePart = author.replace(' 선생님', '');
            return `${namePart} (${t('common.teacher')})`;
        }
        return author;
    };

    const filteredPosts = activeTab === 'all'
        ? posts
        : posts.filter(post => post.category !== '전체 공지');

    const formatDate = (dateString, timeString) => {
        const date = new Date(dateString);
        if (isEnglish) {
            const options = { month: 'short', day: 'numeric' };
            return `${date.toLocaleDateString('en-US', options)} - ${timeString}`;
        }
        const day = date.getDate();
        const month = date.toLocaleDateString('ko-KR', { month: 'long' });
        return `${day} ${month.replace('월', '')}월 - ${timeString}`;
    };

    const toggleExpand = (postId) => {
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const toggleLike = (postId) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const toggleMenu = (postId) => {
        setMenuOpenId(menuOpenId === postId ? null : postId);
    };

    const handleShare = (post) => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.content.substring(0, 100) + '...',
            });
        } else {
            alert(t('news.linkCopied'));
        }
        setMenuOpenId(null);
    };

    const handleCreatePost = (newPost) => {
        const post = {
            id: Date.now(),
            ...newPost,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            authorInitials: newPost.author?.charAt(0) || '선',
        };
        setPosts([post, ...posts]);
    };

    return (
        <div className="news-page">
            {/* Header */}
            <header className="news-header">
                <div className="header-top">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className="header-title">
                        <h1>{t('news.title')}</h1>
                        <p>{t('home.schoolName')}</p>
                    </div>
                    <div className="header-actions">
                        <button onClick={() => setIsSearchOpen(true)}><Search size={20} /></button>
                        <button onClick={() => navigate('/settings')}><Settings size={20} /></button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="news-tabs">
                    <button
                        className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        {t('news.all')}
                    </button>
                    <button
                        className={`tab ${activeTab === 'class' ? 'active' : ''}`}
                        onClick={() => setActiveTab('class')}
                    >
                        {t('news.classNews')}
                    </button>
                </div>
            </header>

            {/* Teacher: Create Post Button */}
            {role === 'teacher' && (
                <button className="fab-create" onClick={() => setIsCreatePostOpen(true)}>
                    <Plus size={24} />
                </button>
            )}

            {/* Feed */}
            <div className="news-feed">
                {filteredPosts.map((post, index) => (
                    <article
                        key={post.id}
                        className="post-card fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="post-header">
                            <div className="author-avatar">
                                <span>{post.authorInitials}</span>
                            </div>
                            <div className="author-info">
                                <span className="author-name">{translateAuthor(post.author)}</span>
                                <span className="post-date">{formatDate(post.date, post.time)}</span>
                            </div>
                            <div className="post-menu-wrapper">
                                <button className="post-menu" onClick={() => toggleMenu(post.id)}>
                                    <MoreHorizontal size={20} />
                                </button>
                                {menuOpenId === post.id && (
                                    <div className="post-dropdown">
                                        <button onClick={() => handleShare(post)}>{t('news.share')}</button>
                                        <button onClick={() => setMenuOpenId(null)}>{t('common.close')}</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="post-content">
                            <h3 className="post-title">{post.title}</h3>
                            <p className={`post-text ${expandedPosts[post.id] ? 'expanded' : ''}`}>
                                {expandedPosts[post.id] ? post.content : post.content.substring(0, 150)}
                            </p>
                            {post.content.length > 150 && (
                                <button className="show-more" onClick={() => toggleExpand(post.id)}>
                                    {expandedPosts[post.id] ? t('news.showLess') : t('news.showMore')}
                                </button>
                            )}
                        </div>

                        {post.image && (
                            <div className="post-image">
                                <img src={post.image} alt="" />
                            </div>
                        )}

                        <div className="post-actions">
                            <button
                                className={`like-btn ${likedPosts[post.id] ? 'liked' : ''}`}
                                onClick={() => toggleLike(post.id)}
                            >
                                <ThumbsUp size={18} />
                                {likedPosts[post.id] && <span className="like-count">1</span>}
                            </button>
                            <span className="post-category">{translateCategory(post.category)}</span>
                        </div>

                        <div className="post-divider"></div>
                    </article>
                ))}
            </div>

            {/* Modals */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
            <CreatePostModal
                isOpen={isCreatePostOpen}
                onClose={() => setIsCreatePostOpen(false)}
                onSubmit={handleCreatePost}
            />
        </div>
    );
}
