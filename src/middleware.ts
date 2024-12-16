import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'mysecretkey';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const publicPaths = ['/login', '/api/auth/login'];

    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    if (pathname.startsWith('/admin')) {
        const token = req.cookies.get('auth-token')?.value;

        if (!token) {
            const url = req.nextUrl.clone();
            url.pathname = '/login';
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }

        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), {
                algorithms: ['HS256'],
            });
            console.log('Token válido', payload);
            return NextResponse.next();
        } catch (error) {
            console.error('Token inválido:', error);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
