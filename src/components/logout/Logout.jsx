// components/logout/Logout.jsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogoutSpinner } from './LogoutSpinner';

export function Logout() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-950 font-display">
            {/* Contenedor con estética de panel de control */}
            <div className="relative w-full max-w-[450px] bg-slate-900 border border-slate-800 p-12 shadow-2xl overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-600 to-transparent opacity-50"></div>

                <div className="text-center relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="bg-orange-600 p-2 shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                            <span className="font-black text-white text-xl leading-none">P</span>
                        </div>
                        <h1 className="text-white text-xl font-black uppercase tracking-[0.2em]">
                            PARQUE<span className="text-orange-500">AYA</span>
                        </h1>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <LogoutSpinner />
                        </div>

                        <div className="pt-4 border-t border-slate-800/50">
                            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em] animate-pulse">
                                Finalizando Sesión de Operador
                            </p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-2">
                                Guardando registros en base de datos...
                            </p>
                        </div>
                    </div>
                </div>

                {/* Marca de agua sutil en la esquina */}
                <div className="absolute -bottom-2 -right-2 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-8xl text-white">
                        power_settings_new
                    </span>
                </div>
            </div>
        </div>
    );
}