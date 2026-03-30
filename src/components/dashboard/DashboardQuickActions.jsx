// components/dashboard/DashboardQuickActions.jsx
'use client';

import Link from "next/link";

export function DashboardQuickActions() {
    const actions = [
        { name: "Entradas", href: "/entradas" },
        { name: "Salidas", href: "/salidas" },
        { name: "Vehículos dentro", href: "/vehiculos-dentro" },
        { name: "Reportes", href: "/reportes" },
        { name: "Administración", href: "/configuracion" }
    ];

    return (
        <div className="mb-[30px]">
            <div className="p-2.5 bg-gray-300 border border-black text-sm font-bold mb-2.5">
                ACCIONES RÁPIDAS
            </div>
            <div className="grid grid-cols-5 gap-2.5">
                {actions.map((action, idx) => (
                    <Link key={idx} href={action.href} className="no-underline">
                        <button className="w-full py-5 px-2.5 bg-white border-2 border-black text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors">
                            {action.name}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}