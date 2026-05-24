'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Obtenemos el token (puede ser 'token' o 'jwt' dependiendo de la implementación)
        const token = localStorage.getItem('token') || localStorage.getItem('jwt');
        
        if (!token) {
            router.push('/');
        } else {
            setIsAuthenticated(true);
        }
    }, [router, pathname]);

    // Estado de carga mientras verifica
    if (!isAuthenticated) {
        return (
            <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-800 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">
                        Verificando sesión...
                    </p>
                </div>
            </div>
        );
    }

    // Una vez autenticado, renderiza las páginas o el layout hijo
    return children;
}
