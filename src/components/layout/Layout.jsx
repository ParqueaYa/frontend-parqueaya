// components/layout/Layout.jsx
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Layout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/entradas', label: 'Entradas' },
        { path: '/salidas', label: 'Salidas' },
        { path: '/vehiculos-dentro', label: 'Vehículos dentro' },
        { path: '/cupos', label: 'Cupos' },
        { path: '/tarifas', label: 'Tarifas' },
        { path: '/usuarios', label: 'Usuarios' },
        { path: '/reportes', label: 'Reportes' },
        { path: '/facturacion', label: 'Facturación' },
        { path: '/perfil', label: 'Perfil' },
        { path: '/configuracion', label: 'Configuración' },
    ];

    const handleLogout = () => {
        // Aquí va la lógica de logout
        router.push('/login');
    };

    return (
        <div className="flex h-screen bg-background-light">
            {/* Left Sidebar */}
            <aside className="w-56 bg-primary flex-shrink-0">
                <div className="p-4 border-b border-primary-dark">
                    <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-2xl">
              local_parking
            </span>
                        <h1 className="text-white text-xl font-bold tracking-tight uppercase">
                            ParqueaYa
                        </h1>
                    </div>
                </div>
                <nav className="p-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block px-3 py-2 mb-1 text-white hover:bg-primary-dark transition-colors ${
                                pathname === item.path ? 'bg-primary-dark' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b-2 border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
                    <h2 className="text-gray-800 font-semibold">Sistema de Parqueadero</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Usuario conectado</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1 bg-primary text-white border border-primary-dark hover:bg-primary-dark transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6 bg-background-light">
                    {children}
                </main>
            </div>
        </div>
    );
}