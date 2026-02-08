import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, Mail, Phone, Book, Calendar, Users } from 'lucide-react';
import './HelpPage.css';

const faqItems = [
    {
        id: 1,
        question: '결석 신고는 어떻게 하나요?',
        answer: '홈 화면에서 "결석 신고하기" 버튼을 누르신 후, 자녀와 날짜, 사유를 선택하여 제출하시면 됩니다.'
    },
    {
        id: 2,
        question: '학급 배정은 어떻게 확인하나요?',
        answer: '홈 화면의 Groups 섹션에서 자녀가 속한 학급을 확인하실 수 있습니다.'
    },
    {
        id: 3,
        question: '알림을 끄고 싶어요',
        answer: '설정 탭에서 "알림 설정" 토글을 꺼주시면 됩니다.'
    },
    {
        id: 4,
        question: '선생님께 연락하고 싶어요',
        answer: '각 그룹 페이지에서 담임 선생님의 연락처를 확인하시거나, 학교 대표 이메일로 문의해 주세요.'
    }
];

const contactItems = [
    { icon: Mail, label: '이메일', value: 'info@koreanschool.nl' },
    { icon: Phone, label: '전화', value: '+31 20 123 4567' }
];

export default function HelpPage() {
    const navigate = useNavigate();

    return (
        <div className="help-page">
            <header className="help-header">
                <button className="back-btn" onClick={() => navigate('/settings')}>
                    <ChevronLeft size={24} />
                </button>
                <h1>도움말</h1>
            </header>

            {/* Quick Links */}
            <section className="help-section">
                <h2>빠른 안내</h2>
                <div className="quick-links">
                    <button className="quick-link">
                        <Book size={24} />
                        <span>이용 가이드</span>
                    </button>
                    <button className="quick-link">
                        <Calendar size={24} />
                        <span>학사 일정</span>
                    </button>
                    <button className="quick-link">
                        <Users size={24} />
                        <span>학교 소개</span>
                    </button>
                    <button className="quick-link">
                        <MessageCircle size={24} />
                        <span>문의하기</span>
                    </button>
                </div>
            </section>

            {/* FAQ */}
            <section className="help-section">
                <h2>자주 묻는 질문</h2>
                <div className="faq-list">
                    {faqItems.map(item => (
                        <details key={item.id} className="faq-item">
                            <summary>
                                <span>{item.question}</span>
                                <ChevronRight size={20} className="faq-arrow" />
                            </summary>
                            <p>{item.answer}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section className="help-section">
                <h2>연락처</h2>
                <div className="contact-list">
                    {contactItems.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="contact-item">
                            <Icon size={20} />
                            <div className="contact-info">
                                <span className="contact-label">{label}</span>
                                <span className="contact-value">{value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
