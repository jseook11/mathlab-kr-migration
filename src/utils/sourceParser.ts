/**
 * Parse Korean academic test source codes into readable format
 * 
 * Examples:
 * - "202611" → "2026학년도 대학수학능력시험"
 * - "202609" → "2026학년도 9월 모의평가"
 * - "202606" → "2026학년도 6월 모의평가"
 * - "202503" → "2025학년도 3월 학력평가"
 * - "2024교육청06" → "2024년 6월 교육청 학력평가"
 * - "2024수학경시" → "2024년 수학 경시대회"
 */
export function parseSource(code: string): string {
  if (!code) return "";

  // Handle custom format like "2024교육청06"
  if (code.includes("교육청")) {
    const match = code.match(/^(\d{4})교육청(\d{2})$/);
    if (match) {
      const year = match[1];
      const month = match[2];
      return `${year}년 ${parseInt(month)}월 교육청 학력평가`;
    }
  }

  // Handle other custom formats
  if (!/^\d{6}$/.test(code)) {
    // For custom strings like "2024수학경시", just return with "년" added
    if (/^\d{4}/.test(code)) {
      return code.replace(/^(\d{4})/, "$1년 ");
    }
    return code;
  }

  // Parse YYYYMM format
  const year = code.substring(0, 4);
  const month = code.substring(4, 6);

  switch (month) {
    case "11":
      return `${year}학년도 대학수학능력시험`;
    case "09":
      return `${year}학년도 9월 모의평가`;
    case "06":
      return `${year}학년도 6월 모의평가`;
    case "03":
      return `${year}학년도 3월 학력평가`;
    default:
      return `${year}학년도 ${parseInt(month)}월 평가`;
  }
}
