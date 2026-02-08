import { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useConfig } from '../context/ConfigContext';
import './Market.css';

export default function Market() {
    const { t, isEnglish } = useLanguage();
    const { config, getDefaultColor } = useConfig();
    const defaultColor = getDefaultColor();

    const [items, setItems] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [openComments, setOpenComments] = useState({}); // { itemId: boolean }
    const [openForm, setOpenForm] = useState({}); // { itemId: boolean }
    const [localComments, setLocalComments] = useState({}); // { itemTitle: [comments] }

    // URLs from config or fallback to mocks
    const ITEMS_CSV_URL = config.market?.itemsCsvUrl || '/mock_items.csv';
    const COMMENTS_CSV_URL = config.market?.commentsCsvUrl || '/mock_comments.csv';
    const POST_ITEM_FORM_URL = config.market?.postItemUrl || '#';
    const POST_COMMENT_FORM_URL = config.market?.postCommentUrl || '#';

    // Config for inline form
    const COMMENT_FORM_ACTION = config.market?.commentForm?.actionUrl;
    const FIELD_ITEM_ID = config.market?.commentForm?.itemIdField;
    const FIELD_NICKNAME = config.market?.commentForm?.nicknameField;
    const FIELD_MESSAGE = config.market?.commentForm?.messageField;

    // Entry IDs for pre-filling comment form (Replace with actual)
    // This might also need to be in config if generic
    const PREFILL_ITEM_NAME_ENTRY_ID = 'entry.123456789';

    const toggleForm = (index) => {
        setOpenForm(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleCommentSubmit = async (e, index, itemTitle) => {
        e.preventDefault();

        if (!COMMENT_FORM_ACTION || !FIELD_ITEM_ID || !FIELD_NICKNAME || !FIELD_MESSAGE) {
            alert("댓글 폼 설정이 완료되지 않았습니다. 관리자에게 문의하세요.");
            return;
        }

        const formData = new FormData(e.target);
        const nickname = formData.get('nickname');
        const message = formData.get('message');

        // Prepare Google Form Data
        const googleFormData = new FormData();
        googleFormData.append(FIELD_ITEM_ID, itemTitle);
        googleFormData.append(FIELD_NICKNAME, nickname);
        googleFormData.append(FIELD_MESSAGE, message);

        try {
            // "no-cors" mode to bypass CORS (opaque response)
            await fetch(COMMENT_FORM_ACTION, {
                method: 'POST',
                mode: 'no-cors',
                body: googleFormData
            });

            // Optimistic Update
            const newComment = {
                TargetItemTitle: itemTitle,
                Nickname: nickname,
                Message: message,
                Timestamp: new Date().toISOString()
            };

            setLocalComments(prev => ({
                ...prev,
                [itemTitle]: [newComment, ...(prev[itemTitle] || [])]
            }));

            // Close form and open comments
            setOpenForm(prev => ({ ...prev, [index]: false }));
            setOpenComments(prev => ({ ...prev, [index]: true }));

            e.target.reset();

        } catch (error) {
            console.error("Error submitting comment:", error);
            alert("댓글 전송 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        const header = document.querySelector('.market-header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const parseCSV = (csvText) => {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        return lines.slice(1).map(line => {
            // Simple split, ideally use a CSV parser library for production
            // Handling simple cases where comma is delimiter
            const values = line.split(',');
            const entry = {};
            headers.forEach((header, index) => {
                entry[header] = values[index] ? values[index].trim() : '';
            });
            return entry;
        });
    };

    const normalizeItem = (item) => {
        return {
            Title: item['Title'] || item['물품명'] || '',
            Description: item['Description'] || item['설명'] || '',
            Type: item['Type'] || item['거래 유형'] || '나눔',
            Status: item['Status'] || item['거래 상태'] || '거래가능',
            Category: item['Category'] || item['카테고리'] || '기타',
            ImageURL: item['ImageURL'] || item['사진 URL'] || item['이미지'] || '',
            Timestamp: item['Timestamp'] || item['타임스탬프'] || '',
        };
    };

    const normalizeComment = (comment) => {
        return {
            TargetItemTitle: comment['TargetItemTitle'] || comment['대상 물품'] || '',
            Nickname: comment['Nickname'] || comment['닉네임'] || '익명',
            Message: comment['Message'] || comment['메시지'] || '',
            Timestamp: comment['Timestamp'] || comment['타임스탬프'] || '',
        };
    };

    const fetchData = async () => {
        try {
            const [itemsResponse, commentsResponse] = await Promise.all([
                fetch(ITEMS_CSV_URL),
                fetch(COMMENTS_CSV_URL)
            ]);

            const itemsText = await itemsResponse.text();
            const commentsText = await commentsResponse.text();

            const parsedItems = parseCSV(itemsText).map(normalizeItem);
            const parsedComments = parseCSV(commentsText).map(normalizeComment);

            // Sort items by date desc (if timestamp exists)
            // Assuming Timestamp format is YYYY-MM-DD HH:MM:SS
            parsedItems.sort((a, b) => {
                return new Date(b.Timestamp) - new Date(a.Timestamp);
            });

            setItems(parsedItems);
            setComments(parsedComments);
        } catch (error) {
            console.error('Error loading market data:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleComments = (itemId) => {
        setOpenComments(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const getCommentsForItem = (itemTitle) => {
        return comments.filter(c => c.TargetItemTitle === itemTitle);
    };

    if (loading) {
        return (
            <div className="market-page loading-state">
                <div className="loading-spinner" style={{ borderTopColor: defaultColor }}></div>
                <p>{t('market.loading')}</p>
            </div>
        );
    }

    return (
        <div className="market-page" style={{ paddingTop: headerHeight + 10 }}>
            <header className="market-header">
                <div className="header-content">
                    <h1>{t('market.title')} 🛍️</h1>
                    <a href={POST_ITEM_FORM_URL} target="_blank" rel="noopener noreferrer" className="post-btn" style={{ backgroundColor: defaultColor }}>
                        {t('market.postItem')}
                    </a>
                </div>
            </header>

            <div className="market-feed">
                {items.length === 0 ? (
                    <div className="no-items">
                        <AlertCircle size={48} color="#ccc" />
                        <p>{t('market.noItems')}</p>
                    </div>
                ) : (
                    items.map((item, index) => {
                        const itemComments = getCommentsForItem(item.Title);
                        const isCompleted = item.Status === '완료';
                        // Determine badge type based on Korean value in CSV
                        // If CSV uses '나눔', map to i18n key or just use text if robust translation needed
                        // Here assuming CSV values '나눔'/'교환' directly map to keys or we verify
                        const isGiveaway = item.Type === '나눔';

                        // Comment URL with Prefill
                        const commentUrl = `${POST_COMMENT_FORM_URL}?${PREFILL_ITEM_NAME_ENTRY_ID}=${encodeURIComponent(item.Title)}`;

                        return (
                            <div key={index} className="market-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                {item.ImageURL && item.ImageURL.startsWith('http') && (
                                    <div className="card-image">
                                        <img src={item.ImageURL} alt={item.Title} loading="lazy" />
                                    </div>
                                )}

                                <div className="card-content">
                                    <div className="card-header">
                                        <h3 className={`card-title ${item.Status === '완료' ? 'completed' : ''}`}>
                                            {item.Title}
                                        </h3>
                                        {item.Status === '완료' && (
                                            <span className="badge status-completed">
                                                {t('market.status.completed')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="card-meta">
                                        <span>{item.Category}</span>
                                        <span>•</span>
                                        <span>{item.Timestamp?.split(' ')[0]}</span>
                                    </div>

                                    <p className="card-desc">{item.Description}</p>
                                </div>

                                <div className="card-actions">
                                    <button
                                        className="comment-toggle-btn"
                                        onClick={() => toggleComments(index)}
                                    >
                                        <MessageCircle size={18} />
                                        {t('market.comments')} {itemComments.length}
                                    </button>
                                    {openForm[index] ? (
                                        <form
                                            className="inline-comment-form"
                                            onSubmit={(e) => handleCommentSubmit(e, index, item.Title)}
                                        >
                                            <input
                                                type="text"
                                                placeholder={t('market.commentPlaceholderNickname')} // Ensure this translation key exists
                                                required
                                                className="comment-input"
                                                name="nickname"
                                            />
                                            <textarea
                                                placeholder={t('market.commentPlaceholderMessage')} // Ensure this translation key exists
                                                required
                                                className="comment-textarea"
                                                name="message"
                                                rows="2"
                                            ></textarea>
                                            <div className="form-actions">
                                                <button
                                                    type="button"
                                                    className="cancel-btn"
                                                    onClick={() => toggleForm(index)}
                                                >
                                                    {t('common.cancel')}
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="submit-btn"
                                                    style={{ backgroundColor: defaultColor }}
                                                >
                                                    {t('market.reply')}
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button
                                            className="reply-btn"
                                            onClick={() => toggleForm(index)}
                                            style={{ backgroundColor: defaultColor }}
                                        >
                                            {t('market.reply')}
                                        </button>
                                    )}
                                </div>

                                {openComments[index] && (
                                    <div className="comments-section open">
                                        {/* Optimistic Comments */}
                                        {localComments[item.Title]?.map((c, i) => (
                                            <div key={`local-${i}`} className="comment-item local fade-in">
                                                <div className="comment-author">{c.Nickname}</div>
                                                <p className="comment-text">{c.Message}</p>
                                            </div>
                                        ))}

                                        {comments.filter(c => c.TargetItemTitle === item.Title).map((c, i) => (
                                            <div key={i} className="comment-item">
                                                <div className="comment-author">{c.Nickname}</div>
                                                <p className="comment-text">{c.Message}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
