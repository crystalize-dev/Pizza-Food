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

    const authPaths = [
        '/profile',
        '/categories',
        '/menu-items',
        '/users',
        '/orders',
        '/payment'
    ];

    const adminPaths = ['/categories', '/menu-items', '/users'];

    const isProtected = !!authPaths.find((authPath) => authPath.includes(path));

    const adminProtected = !!adminPaths.find((adminPath) =>
        adminPath.includes(path)
    );

    if (!session && isProtected) {
        return NextResponse.redirect(new URL('/login', req.url));
    } else {
        if (!session?.admin && adminProtected) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}
