import { NextRequest, NextResponse } from 'next/server';
import { languages, defaultLanguage } from './app/i18n/client';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a language prefix
  const pathnameHasLanguage = languages.some(
    (language) => pathname.startsWith(`/${language}/`) || pathname === `/${language}`
  );
  
  if (pathnameHasLanguage) return NextResponse.next();
  
  // Redirect to the default language if no language is specified
  const newUrl = new URL(`/${defaultLanguage}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!_next|api|favicon.ico|images|.*\\..*|$).*)',
  ],
};
