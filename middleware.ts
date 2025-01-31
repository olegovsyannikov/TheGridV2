import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in/(.*)', '/sign-up/(.*)', '/api/graphql'],
  ignoredRoutes: ['/api/graphql']
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico)(?!.*\\.).*)',
    '/api/upload',
    '/(api|trpc)(.*)'
  ]
};
