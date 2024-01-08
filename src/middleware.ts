import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path === '/') {
        return NextResponse.next();
    }

    const session = await getToken({
        req,
        secret: process.env.AUTH_SECRET
    });

    const protectedPaths = ['/profile', '/categories', '/menu-items', '/users'];

    const isProtected = !!protectedPaths.find(
        (protectedPath) => protectedPath === path
    );

    if (!session && isProtected) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
