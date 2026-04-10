// components/layout/Layout.jsx
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Layout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const [userData, setUserData] = useState({
        username: 'Cargando...',
        role: 'ADMINISTRADOR'
    });

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('userRole');
        if (storedUsername) {
            setUserData({
                username: storedUsername,
                role: storedRole || 'ADMINISTRADOR'
            });
        }
    }, []);

    const avatarLetter = userData.username.charAt(0).toUpperCase();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { path: '/entradas', label: 'Entradas', icon: 'login' },
        { path: '/salidas', label: 'Salidas', icon: 'logout' },
        { path: '/vehiculos-dentro', label: 'Vehículos dentro', icon: 'directions_car' },
        { path: '/cupos', label: 'Cupos', icon: 'grid_view' },
        { path: '/tarifas', label: 'Tarifas', icon: 'payments' },
        { path: '/usuarios', label: 'Usuarios', icon: 'group' },
        { path: '/reportes', label: 'Reportes', icon: 'analytics' },
        { path: '/facturacion', label: 'Facturación', icon: 'receipt_long' },
        { path: '/perfil', label: 'Perfil', icon: 'account_circle' },
        { path: '/configuracion', label: 'Configuración', icon: 'settings' },
    ];

    const handleLogout = () => {
        router.push('/');
    };

    return (
        <div className="flex h-screen bg-white dark:bg-slate-950">
            {/* Left Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-1.5 shadow-lg">
                            <span className="material-symbols-outlined text-white text-2xl block">
                                local_parking
                            </span>
                        </div>
                        <h1 className="text-white text-xl font-bold tracking-tighter uppercase italic">
                            Parquea<span className="text-primary">Ya</span>
                        </h1>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 border-l-2 ${
                                    isActive
                                        ? 'bg-slate-800 text-primary border-primary'
                                        : 'text-slate-400 border-transparent hover:text-slate-100 hover:bg-slate-800/50'
                                }`}
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-8 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="h-1 w-8 bg-primary"></div>
                        <h2 className="text-slate-900 dark:text-slate-100 font-bold uppercase text-sm tracking-widest">
                            {menuItems.find(i => i.path === pathname)?.label || 'Sistema'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-tight">
                                {userData.role}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                {userData.username}
                            </span>
                        </div>
                        <div className="h-10 w-10 bg-primary/10 dark:bg-slate-800 border border-primary/20 dark:border-slate-700 flex items-center justify-center rounded-full">
                            <span className="text-primary font-bold text-lg">
                                {avatarLetter}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                    {children}
                </main>
            </div>
        </div>
    );
}