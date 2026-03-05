import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas estrictamente públicas
const publicRoutes = ['/login', '/register', '/setup'];

// Rutas estáticas de Next.js que no deben interceptarse
const staticPaths = ['/_next', '/api', '/favicon.ico'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Ignorar archivos estáticos
    if (staticPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Verificar existencia de Token
    const token = request.cookies.get('accessToken')?.value;
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    // Redirigir publicos al Dashboard si tienen sesión
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Proteger rutas privadas
    if (!isPublicRoute && !token && pathname !== '/') {
        // Redirigir al login preservando a donde quería ir (opcionalmente)
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
