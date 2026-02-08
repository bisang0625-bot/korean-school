# 암스테르담 한글학교 앱 관리자 가이드

## 📋 목차
1. [설정 파일 편집하기](#설정-파일-편집하기)
2. [학기 초 설정 변경하기](#학기-초-설정-변경하기)
3. [앱 배포하기](#앱-배포하기)

---

## 설정 파일 편집하기

모든 학기별 설정은 `public/config.json` 파일에서 관리됩니다.

### 파일 위치
```
Korean School/
├── public/
│   └── config.json  ← 이 파일을 편집하세요!
```

### 설정 항목

```json
{
  "schoolName": {
    "ko": "암스테르담 한글학교",     // 한국어 학교명
    "en": "Amsterdam Korean School"  // 영어 학교명
  },
  "academicYear": "2025/2026",       // 학년도
  "teacherPassword": "2026spring",   // 선생님 모드 비밀번호
  "defaultColor": "#E91E63",         // 앱 테마 색상 (모든 반에 적용)
  "classes": [                       // 반 목록
    { "id": 1, "name": "유치반", "nameEn": "Kindergarten" },
    { "id": 2, "name": "1학년", "nameEn": "Grade 1" },
    { "id": 3, "name": "2학년", "nameEn": "Grade 2" }
  ],
  "groups": [...],                   // 홈 화면 그룹
  "teacherEmail": "teacher@koreanschool.nl"  // 선생님 연락 이메일
}
```

---

## 학기 초 설정 변경하기

매 학기 초에 다음 항목들을 업데이트하세요:

### 1. 비밀번호 변경
```json
"teacherPassword": "2026fall"  // 새 학기 비밀번호로 변경
```
> 💡 **팁**: 학년도+학기 형식 추천 (예: `2026spring`, `2026fall`)

### 2. 반 추가/삭제
```json
"classes": [
  { "id": 1, "name": "유치반", "nameEn": "Kindergarten" },
  { "id": 2, "name": "1-A반", "nameEn": "Grade 1-A" },
  { "id": 3, "name": "1-B반", "nameEn": "Grade 1-B" },
  { "id": 4, "name": "2학년", "nameEn": "Grade 2" }
]
```
> ⚠️ **주의**: 각 반의 `id`는 고유해야 합니다!

### 3. 테마 색상 변경 (선택사항)
모든 반과 그룹에 적용될 기본 색상을 변경할 수 있습니다.
```json
"defaultColor": "#2196F3"
```

### 3. 학년도 업데이트
```json
"academicYear": "2026/2027"
```

---

## 앱 배포하기

### Vercel 사용 (추천)

1. **GitHub에 변경사항 푸시**
   ```bash
   git add .
   git commit -m "Update semester settings"
   git push
   ```

2. **Vercel에서 자동 배포**
   - GitHub에 푸시하면 Vercel이 자동으로 새 버전을 배포합니다
   - 약 1-2분 후 변경사항이 반영됩니다

### 처음 배포하기

1. [vercel.com](https://vercel.com) 에서 GitHub 계정으로 로그인
2. "Import Project" 클릭
3. Korean School 저장소 선택
4. "Deploy" 클릭
5. 완료! 무료 도메인이 제공됩니다 (예: `korean-school.vercel.app`)

---

## 도움말

### 자주 묻는 질문

**Q: 비밀번호를 잊어버렸어요**
A: `public/config.json` 파일에서 `teacherPassword` 값을 확인하세요.

**Q: 앱이 안 열려요**
A: `config.json` 파일의 JSON 형식이 올바른지 확인하세요. 쉼표나 따옴표가 빠지면 오류가 발생합니다.



---

## 아나바다 장터 설정하기 (구글 시트 연동)

아나바다 장터는 **구글 폼(입력)**과 **구글 스프레드시트(저장)**를 사용하여 작동합니다. 서버 없이 무료로 운영할 수 있습니다.

### 1. 구글 스프레드시트 및 폼 준비
1. 새 구글 스프레드시트를 만듭니다 (예: `KoreanSchool_Market_DB`).
2. **물품 등록용 폼**을 만듭니다. 질문 제목을 정확히 입력하세요:
   - `물품명` (단답형)
   - `카테고리` (객관식: 도서, 완구, 의류, 생활, 기타)
   - `설명` (장문형)
   - `사진` (**파일 업로드** - 아래 설정 참조)
3. **댓글 등록용 폼**을 만듭니다. 질문 제목을 정확히 입력하세요:
   - `대상 물품` (단답형)
   - `닉네임` (단답형)
   - `메시지` (장문형)
4. 두 폼의 응답이 위에서 만든 스프레드시트의 **서로 다른 시트(탭)**에 저장되도록 연결합니다. (예: `Items` 시트, `Comments` 시트)

### 📸 이미지 파일 업로드 설정 (권장)

사용자가 URL 대신 **직접 사진을 업로드**할 수 있도록 설정합니다.

#### Step 1: 구글 폼에서 파일 업로드 질문 추가
1. 물품 등록용 폼에서 **+ 질문 추가** 클릭
2. 질문 유형을 **'파일 업로드'** 로 선택
3. 질문 제목: `사진`
4. 설정:
   - 파일 유형: **이미지만** 선택
   - 최대 파일 개수: 1
   - 최대 파일 크기: 10MB
5. **필수 여부를 끄세요** (선택 사항으로 설정)

#### Step 2: Apps Script로 이미지 URL 자동 생성
업로드된 이미지를 웹에서 볼 수 있는 URL로 자동 변환합니다.

1. **스프레드시트 열기** (폼 응답이 저장되는 시트)
2. **확장 프로그램 > Apps Script** 클릭
3. 프로젝트의 `scripts/imageUrlScript.gs` 파일 내용을 전체 복사하여 붙여넣기
4. **CONFIG 섹션 수정**:
   ```javascript
   const CONFIG = {
     SHEET_NAME: "Items",        // 실제 시트 이름
     FILE_UPLOAD_COLUMN: 5,      // 파일 업로드 열 번호 (확인 필요)
     IMAGE_URL_COLUMN: 6,        // 이미지 URL 저장할 열 번호
   };
   ```
   > 💡 열 번호 확인: 스프레드시트에서 파일 업로드 데이터가 몇 번째 열에 있는지 확인하세요 (A=1, B=2...)

5. **트리거 설정**:
   - 함수 선택 드롭다운에서 `setupTrigger` 선택
   - ▷ 실행 버튼 클릭
   - 권한 요청이 뜨면 **허용** 클릭

6. **테스트**:
   - 폼에서 사진과 함께 테스트 물품 등록
   - 스프레드시트에 `ImageURL` 열에 URL이 자동 생성되는지 확인

> ⚠️ **중요**: 스프레드시트 헤더 행에 `ImageURL` 열을 미리 추가해두세요!

### 2. 데이터 웹에 게시 (CSV)
1. 스프레드시트에서 **파일 > 공유 > 웹에 게시**를 클릭합니다.
2. '전체 문서' 대신 **'Items' 시트**를 선택하고, '웹 페이지' 대신 **'쉼표로 구분된 값(.csv)'**을 선택합니다. -> **게시** 클릭 -> **링크 복사**.
3. **'Comments' 시트**도 동일하게 .csv 링크를 복사합니다.

### 3. config.json 설정 (댓글 바로 쓰기 기능)
댓글을 새 창이 아닌 **앱 내에서 바로 작성**하게 하려면 추가 설정이 필요합니다.

`public/config.json` 파일의 `market` 섹션을 다음과 같이 수정하세요:

```json
"market": {
  "itemsCsvUrl": "복사한_Items_CSV_링크",
  "commentsCsvUrl": "복사한_Comments_CSV_링크",
  "postItemUrl": "물품_등록_구글폼_주소(viewform)",
  "commentForm": {
    "actionUrl": "https://docs.google.com/forms/u/0/d/e/[FORM_ID]/formResponse",
    "itemIdField": "entry.123456789",
    "nicknameField": "entry.234567890",
    "messageField": "entry.345678901"
  }
}
```

#### 🛠️ 필수 정보 찾는 법

**1. `actionUrl` (전송 주소) 찾기**
- 댓글용 구글 폼의 '미리보기' 주소(`.../viewform`)에서 `viewform`을 **`formResponse`**로 바꾸면 됩니다.

**2. `entry.XXX` (필드 ID) 찾기**
1. 댓글용 구글 폼 편집 화면에서 **더보기(⋮) > '미리 채워진 링크 가져오기'**를 선택합니다.
2. 각 항목에 구별하기 쉬운 값을 입력합니다. (예: `아이템명`, `닉네임`, `메시지`)
3. **'링크 가져오기'**를 누르고 링크를 복사합니다.
4. 메모장에 붙여넣으면 다음과 같은 부분이 보입니다:
   `&entry.12345=아이템명&entry.67890=닉네임&entry.11111=메시지`
5. 각 항목에 해당하는 `entry.숫자`를 복사하여 `config.json`에 넣으세요.

> **참고**: `itemIdField`는 '대상 물품명', `nicknameField`는 '닉네임', `messageField`는 '메시지' 항목의 ID입니다.

> 💡 **주의**: CSV 링크는 `docs.google.com/.../pub?output=csv` 형식이어야 합니다.

---

## 연락처

기술 문의: [개발자 이메일]
