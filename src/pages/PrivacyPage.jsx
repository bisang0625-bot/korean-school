import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './PrivacyPage.css';

export default function PrivacyPage() {
    const navigate = useNavigate();

    return (
        <div className="privacy-page">
            <header className="privacy-header">
                <button className="back-btn" onClick={() => navigate('/settings')}>
                    <ChevronLeft size={24} />
                </button>
                <h1>개인정보 처리방침</h1>
            </header>

            <div className="privacy-content">
                <section className="privacy-section">
                    <h2>1. 개인정보 수집 항목</h2>
                    <p>
                        암스테르담 한글학교는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
                    </p>
                    <ul>
                        <li>학부모 성명, 이메일, 연락처</li>
                        <li>자녀 성명, 학년, 반</li>
                        <li>결석 신고 시 사유 정보</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>2. 개인정보 이용 목적</h2>
                    <p>수집된 개인정보는 다음의 목적으로 이용됩니다:</p>
                    <ul>
                        <li>학사 일정 및 공지사항 전달</li>
                        <li>출결 관리</li>
                        <li>학부모-학교 간 소통</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>3. 개인정보 보유 기간</h2>
                    <p>
                        개인정보는 학생 재학 기간 동안 보유하며,
                        졸업 또는 자퇴 후 1년간 보관 후 파기합니다.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>4. 개인정보의 제3자 제공</h2>
                    <p>
                        암스테르담 한글학교는 원칙적으로 이용자의 개인정보를
                        외부에 제공하지 않습니다. 다만, 법령에 의거하거나
                        이용자의 동의가 있는 경우에는 예외로 합니다.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>5. 연락처</h2>
                    <p>
                        개인정보 관련 문의사항은 아래로 연락주시기 바랍니다:
                    </p>
                    <p className="contact-info">
                        📧 privacy@koreanschool.nl<br />
                        📞 +31 20 123 4567
                    </p>
                </section>

                <div className="last-updated">
                    최종 업데이트: 2026년 1월 1일
                </div>
            </div>
        </div>
    );
}
