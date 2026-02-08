// Korean translations
const ko = {
    // Common
    common: {
        save: '저장',
        cancel: '취소',
        confirm: '확인',
        close: '닫기',
        edit: '수정',
        delete: '삭제',
        search: '검색',
        loading: '로딩 중...',
        teacher: '선생님',
        parent: '학부모',
    },

    // Navigation
    nav: {
        home: '홈',
        news: '소식',
        calendar: '일정',
        market: '장터',
        settings: '설정',
    },

    // Home
    home: {
        schoolName: '암스테르담 한글학교',
        groups: 'Groups',
        schoolYear: '2025/2026 학년도',
        contactTeacher: '선생님께 연락',
        notificationSettings: '알림 설정',
        schoolNews: '한글학교 소식',
    },

    // Settings
    settings: {
        title: '설정',
        profile: '프로필',
        editProfile: '프로필 편집',
        roleSwitch: '역할 전환',
        switchToTeacher: '선생님 모드로 전환',
        switchToParent: '학부모 모드로 전환',
        language: '언어',
        selectLanguage: '언어 선택',
        notifications: '알림 설정',
        pushNotifications: '푸시 알림',
        emailNotifications: '이메일 알림',
        about: '앱 정보',
        version: '버전',
        termsOfService: '이용약관',
        privacyPolicy: '개인정보 처리방침',
        logout: '로그아웃',
        myClass: '담당 학급',
        changeClass: '다른 반 선택',
    },

    // Profile
    profile: {
        title: '프로필 편집',
        changePhoto: '사진 변경',
        name: '이름',
        namePlaceholder: '이름을 입력하세요',
        nameEnglish: '영어 이름',
        firstName: 'First Name',
        lastName: 'Last Name',
        firstNamePlaceholder: 'First name',
        lastNamePlaceholder: 'Last name',
        email: '이메일',
        emailPlaceholder: '이메일을 입력하세요',
        phone: '전화번호',
        phonePlaceholder: '전화번호를 입력하세요',
    },

    // Teacher
    teacher: {
        hello: '안녕하세요, 선생님!',
        myClass: '담당 학급',
        students: '명의 학생',
        quickActions: '빠른 액션',
        createPost: '공지 작성',
        createEvent: '일정 등록',
        studentManagement: '학생 관리',
        recentActivity: '최근 활동',
        selectClass: '반 선택',
        selectClassPrompt: '담당하실 반을 선택해주세요',
    },

    // Student Management
    studentMgmt: {
        title: '학생 관리',
        totalStudents: '전체 학생',
        searchPlaceholder: '이름 또는 이메일 검색...',
        addStudent: '학생 추가',
        editStudent: '학생 정보 수정',
        studentName: '학생 이름',
        email1: '이메일 1 (필수)',
        email2: '이메일 2 (선택)',
        emailHint: '학부모가 이 이메일로 가입하면 자녀가 이 반에 배정됩니다.',
        noStudents: '학생이 없습니다.',
        addStudentBtn: '학생 추가하기',
        confirmDelete: '정말 이 학생을 삭제하시겠습니까?',
    },

    // Password Modal
    password: {
        title: '선생님 인증',
        description: '선생님 모드에 접근하려면 학기 비밀번호를 입력하세요.',
        placeholder: '비밀번호 입력',
        submit: '확인',
        verifying: '확인 중...',
        incorrect: '비밀번호가 올바르지 않습니다.',
    },

    // Create Post
    createPost: {
        title: '새 공지 작성',
        category: '카테고리',
        postTitle: '제목',
        postTitlePlaceholder: '공지 제목을 입력하세요',
        content: '내용',
        contentPlaceholder: '내용을 입력하세요...',
        attachPhoto: '사진 첨부',
        publish: '게시',
        publishing: '게시 중...',
    },

    // Calendar
    calendar: {
        title: '일정',
        today: '오늘',
        noEvents: '일정이 없습니다.',
    },

    // News
    news: {
        title: '소식',
        all: '전체 공지',
        classNews: '학급 소식',
        noPosts: '아직 게시물이 없습니다.',
        share: '공유하기',
        showMore: '...더보기',
        showLess: '접기',
        linkCopied: '공유 링크가 복사되었습니다!',
    },

    // Categories
    categories: {
        allNotice: '전체 공지',
        grade1A: '1학년 가반',
        grade2B: '2학년 나반',
        kindergarten: '유치반',
    },

    // Group Detail
    groupDetail: {
        posts: '개의 게시물',
        noPosts: '아직 게시물이 없습니다',
        backToHome: '홈으로 돌아가기',
        groupNotFound: '그룹을 찾을 수 없습니다',
    },

    // Market
    market: {
        title: '한글학교 나눔 광장',
        postItem: '물품 등록',
        loading: '로딩 중...',
        noItems: '등록된 물품이 없습니다',
        comments: '댓글',
        reply: '댓글 달기 (문의하기)',
        commentPlaceholderNickname: '닉네임 (예: 1학년 김철수 학부모)',
        commentPlaceholderMessage: '내용을 입력하세요...',
        type: {
            giveaway: '나눔',
            exchange: '교환',
        },
        status: {
            completed: '거래완료',
        },
        contact: '문의하기',
    },
};

export default ko;
