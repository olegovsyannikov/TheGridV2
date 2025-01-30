import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in/(.*)',
    '/sign-up/(.*)',
    '/api/trpc/(.*)',
    '/api/graphql'
  ],
  ignoredRoutes: ['/api/graphql']
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
