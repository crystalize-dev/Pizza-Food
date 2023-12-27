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

    const isProtected = path.includes('/profile');

    if (!session && isProtected) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}
