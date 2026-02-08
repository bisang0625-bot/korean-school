/**
 * 물품 등록 폼 - 이미지 URL 자동 생성 스크립트
 * 
 * 이 스크립트는 구글 폼에서 업로드된 파일을 공개 URL로 변환하여
 * 스프레드시트에 자동으로 기록합니다.
 * 
 * 설정 방법:
 * 1. 구글 스프레드시트 열기 (폼 응답이 저장되는 시트)
 * 2. 확장 프로그램 > Apps Script 클릭
 * 3. 이 코드 전체를 붙여넣기
 * 4. 아래 CONFIG 섹션의 값들을 실제 시트에 맞게 수정
 * 5. 트리거 설정 (아래 setupTrigger 함수 참조)
 */

// ==================== 설정 (CONFIG) ====================
const CONFIG = {
  // 시트 이름 (폼 응답이 저장되는 시트)
  SHEET_NAME: "Items",  // 실제 시트 이름으로 변경하세요
  
  // 파일 업로드 열 번호 (A=1, B=2, ...)
  // 구글 폼에서 파일 업로드 질문이 몇 번째 열에 저장되는지 확인하세요
  FILE_UPLOAD_COLUMN: 5,  // 예: 5번째 열
  
  // 이미지 URL을 저장할 열 번호 (보통 파일 업로드 열 바로 옆)
  IMAGE_URL_COLUMN: 6,    // 예: 6번째 열
};

// ==================== 메인 함수 ====================

/**
 * 폼 제출 시 자동 실행되는 함수
 * 업로드된 파일을 공개 URL로 변환합니다.
 */
function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    // 파일 업로드 셀 값 가져오기
    const fileCell = sheet.getRange(lastRow, CONFIG.FILE_UPLOAD_COLUMN).getValue();
    
    if (!fileCell || fileCell === "") {
      console.log("파일 업로드 없음. 스킵합니다.");
      return;
    }
    
    // 파일 ID 추출 (구글 드라이브 URL에서)
    const fileId = extractFileId(fileCell);
    
    if (fileId) {
      // 파일을 공개로 설정
      const file = DriveApp.getFileById(fileId);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      // 직접 접근 가능한 이미지 URL 생성
      const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      
      // URL을 지정된 열에 저장
      sheet.getRange(lastRow, CONFIG.IMAGE_URL_COLUMN).setValue(imageUrl);
      
      console.log(`이미지 URL 생성 완료: ${imageUrl}`);
    }
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

/**
 * 구글 드라이브 URL에서 파일 ID 추출
 */
function extractFileId(url) {
  if (!url) return null;
  
  // 다양한 드라이브 URL 형식 처리
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,           // /d/FILE_ID/
    /id=([a-zA-Z0-9_-]+)/,             // id=FILE_ID
    /open\?id=([a-zA-Z0-9_-]+)/        // open?id=FILE_ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

// ==================== 트리거 설정 ====================

/**
 * 이 함수를 한 번 실행하여 트리거를 설정합니다.
 * 메뉴에서 이 함수를 선택하고 ▷ 실행 버튼을 클릭하세요.
 */
function setupTrigger() {
  // 기존 트리거 제거
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // 새 트리거 생성
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
  
  console.log("✅ 트리거가 설정되었습니다!");
  SpreadsheetApp.getUi().alert("✅ 트리거 설정 완료!\n\n이제 폼에서 파일을 업로드하면 자동으로 이미지 URL이 생성됩니다.");
}

/**
 * 기존 데이터에 대해 이미지 URL을 일괄 생성합니다.
 * 이미 데이터가 있는 경우 이 함수를 실행하세요.
 */
function processExistingData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  let processed = 0;
  
  for (let row = 2; row <= lastRow; row++) { // 2부터 시작 (헤더 제외)
    const fileCell = sheet.getRange(row, CONFIG.FILE_UPLOAD_COLUMN).getValue();
    const existingUrl = sheet.getRange(row, CONFIG.IMAGE_URL_COLUMN).getValue();
    
    if (fileCell && !existingUrl) {
      const fileId = extractFileId(fileCell);
      if (fileId) {
        try {
          const file = DriveApp.getFileById(fileId);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
          sheet.getRange(row, CONFIG.IMAGE_URL_COLUMN).setValue(imageUrl);
          processed++;
        } catch (e) {
          console.error(`Row ${row} 처리 실패:`, e);
        }
      }
    }
  }
  
  SpreadsheetApp.getUi().alert(`✅ ${processed}개의 이미지 URL이 생성되었습니다.`);
}
