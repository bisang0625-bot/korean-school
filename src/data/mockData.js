// Mock data for Amsterdam Korean School App

export const user = {
  name: "김민지",
  email: "minji.kim@email.com",
  children: [
    { id: 1, name: "김준우", class: "1학년 가반" },
    { id: 2, name: "김서연", class: "2학년 나반" }
  ]
};

export const teacher = {
  name: "이민준 선생님",
  email: "lee.teacher@koreanschool.nl",
};

export const groups = [
  { id: 1, name: "전체 공지", color: "#E91E63", icon: "📢" },
  { id: 2, name: "1학년 가반", color: "#FF9800", icon: "🎒", image: "/school-kids-1.jpg" },
  { id: 3, name: "2학년 나반", color: "#4CAF50", icon: "📚", image: "/school-kids-2.jpg" },
];

// 담당 가능한 반 목록
export const classes = [
  { id: 2, name: "1학년 가반", color: "#FF9800", studentCount: 8 },
  { id: 3, name: "2학년 나반", color: "#4CAF50", studentCount: 6 },
  { id: 4, name: "유치반", color: "#9C27B0", studentCount: 10 },
];

// 학생 데이터 (classId로 반 구분, 이메일 최대 2개)
export const students = [
  { id: 1, name: "김준우", emails: ["minji.kim@email.com", "junwoo.dad@email.com"], classId: 2, attendance: "present" },
  { id: 2, name: "박서준", emails: ["park.yh@email.com"], classId: 2, attendance: "present" },
  { id: 3, name: "이지우", emails: ["lee.cs@email.com", "lee.mom@email.com"], classId: 2, attendance: "absent" },
  { id: 4, name: "최민서", emails: ["choi.hj@email.com"], classId: 2, attendance: "present" },
  { id: 5, name: "정하준", emails: ["jung.my@email.com"], classId: 2, attendance: "present" },
  { id: 6, name: "한예린", emails: ["han.sh@email.com"], classId: 2, attendance: "present" },
  { id: 7, name: "오수아", emails: ["oh.jh@email.com", "oh.dad@email.com"], classId: 2, attendance: "absent" },
  { id: 8, name: "유서영", emails: ["yoo.js@email.com"], classId: 2, attendance: "present" },
  // 2학년 나반 학생
  { id: 9, name: "김서연", emails: ["minji.kim@email.com"], classId: 3, attendance: "present" },
  { id: 10, name: "이민준", emails: ["lee.family@email.com"], classId: 3, attendance: "present" },
  { id: 11, name: "박지아", emails: ["park.jia@email.com"], classId: 3, attendance: "present" },
  { id: 12, name: "최도윤", emails: ["choi.dy@email.com"], classId: 3, attendance: "absent" },
  { id: 13, name: "정시우", emails: ["jung.sw@email.com"], classId: 3, attendance: "present" },
  { id: 14, name: "강하은", emails: ["kang.he@email.com"], classId: 3, attendance: "present" },
  // 유치반 학생
  { id: 15, name: "김태오", emails: ["kim.taeoh@email.com"], classId: 4, attendance: "present" },
  { id: 16, name: "이소율", emails: ["lee.soyul@email.com"], classId: 4, attendance: "present" },
  { id: 17, name: "박하린", emails: ["park.harin@email.com"], classId: 4, attendance: "present" },
  { id: 18, name: "최이준", emails: ["choi.ejun@email.com"], classId: 4, attendance: "present" },
  { id: 19, name: "정서아", emails: ["jung.seoa@email.com"], classId: 4, attendance: "absent" },
  { id: 20, name: "강민성", emails: ["kang.ms@email.com"], classId: 4, attendance: "present" },
  { id: 21, name: "윤예나", emails: ["yoon.yena@email.com"], classId: 4, attendance: "present" },
  { id: 22, name: "조시온", emails: ["cho.sion@email.com"], classId: 4, attendance: "present" },
  { id: 23, name: "임하율", emails: ["lim.hayul@email.com"], classId: 4, attendance: "present" },
  { id: 24, name: "송민아", emails: ["song.mina@email.com"], classId: 4, attendance: "present" },
];

export const newsPosts = [
  {
    id: 1,
    author: "박지민 선생님",
    authorInitials: "박",
    date: "2026-02-07",
    time: "09:30",
    title: "2월 7일 설날 잔치 안내",
    content: "사랑하는 학부모님께,\n\n오늘 설날 잔치가 예정되어 있습니다. 아이들과 함께 즐거운 시간을 보낼 예정이니 많은 참여 부탁드립니다.\n\n- 시간: 오전 10시 ~ 오후 1시\n- 장소: 학교 강당\n- 준비물: 한복 (선택사항)",
    category: "전체 공지",
    image: null
  },
  {
    id: 2,
    author: "이민준 선생님",
    authorInitials: "이",
    date: "2026-02-05",
    time: "14:20",
    title: "1학년 가반 수업 알림장",
    content: "오늘 수업에서는 한글 자음과 모음을 배웠습니다. 아이들이 열심히 참여했어요! 집에서 복습 부탁드립니다.\n\n숙제: 받아쓰기 연습 (가~하)",
    category: "1학년 가반",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
  },
  {
    id: 3,
    author: "김영희 교장선생님",
    authorInitials: "김",
    date: "2026-02-01",
    time: "10:00",
    title: "2월 학사 일정 안내",
    content: "학부모님 안녕하세요,\n\n2월 학사 일정을 안내드립니다.\n\n• 2월 7일: 설날 잔치\n• 2월 14일: 겨울 방학 시작\n• 2월 28일: 봄학기 시작\n\n문의사항은 언제든 연락주세요!",
    category: "전체 공지",
    image: null
  },
  {
    id: 4,
    author: "최현수 선생님",
    authorInitials: "최",
    date: "2026-01-29",
    time: "16:00",
    title: "2학년 나반 활동 사진",
    content: "지난주 미술 시간에 태극기 그리기 활동을 했습니다. 아이들의 작품을 공유합니다!",
    category: "2학년 나반",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400"
  }
];

export const calendarEvents = [
  { id: 1, date: "2026-02-07", title: "설날 잔치", time: "10:00 - 13:00", color: "#E91E63" },
  { id: 2, date: "2026-02-10", title: "학부모 상담 주간", time: "14:00 - 18:00", color: "#FF9800" },
  { id: 3, date: "2026-02-11", title: "1학년 발표회", time: "11:00 - 12:00", color: "#FF9800" },
  { id: 4, date: "2026-02-12", title: "1학년 가반 학부모 상담", time: "15:00 - 16:30", color: "#4CAF50" },
  { id: 5, date: "2026-02-14", title: "겨울 방학 시작", time: "종일", color: "#E91E63" },
  { id: 6, date: "2026-02-28", title: "봄학기 시작", time: "09:00", color: "#E91E63" }
];

export const absenceReasons = [
  { id: "illness", label: "질병", labelKo: "질병" },
  { id: "family", label: "가족 행사", labelKo: "가족 행사" },
  { id: "travel", label: "여행", labelKo: "여행" },
  { id: "other", label: "기타", labelKo: "기타" }
];

// 이메일로 학생 매칭 함수
export function findStudentByEmail(email) {
  return students.filter(student =>
    student.emails.some(e => e.toLowerCase() === email.toLowerCase())
  );
}

// 클래스 ID로 학생 필터링
export function getStudentsByClassId(classId) {
  return students.filter(student => student.classId === classId);
}
