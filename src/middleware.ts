// src/middleware.ts
export function middleware() {
  // פונקציה ריקה שלא עושה כלום
}

// אופציונלי - ניתן להגדיר אילו נתיבים לא יעברו דרך ה-middleware
export const config = {
  matcher: [], // מערך ריק אומר שלא יופעל על שום נתיב
};