import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPubliRoute=createRouteMatcher([
    '/sign-in',
    '/sign-up',
    '/',
    '/home',
])

const isPublicAPIRoute=createRouteMatcher([
    '/api/videos'
])


export default clerkMiddleware((auth,req)=>{
    const {userId}:any=auth();
    const CurrentURL=new URL(req.url);
    const isHomePage=CurrentURL.pathname==='/home';
     const isAPIRequest=CurrentURL.pathname.startsWith('/api');
   if(userId && isPubliRoute(req) && !isHomePage ){
   return NextResponse.redirect(new URL('/home', req.url));
   }

   // not loggdin
   if(isAPIRequest && !isPublicAPIRoute(req)){
    return NextResponse.redirect(new URL('/sign-in', req.url));

   }
   if(isAPIRequest && !isPublicAPIRoute(req)){
    return NextResponse.redirect(new URL('/sign-in', req.url));

   }
   return NextResponse.next();
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]

}