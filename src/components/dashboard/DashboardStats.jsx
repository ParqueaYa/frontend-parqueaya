'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import statsService from '@/services/statsService';

export function DashboardStats() {
    const pathname = usePathname();
    const [stats, setStats] = useState({
        vehiculosHoy: 0,
        ingresosTotal: 0,
        disponibles: 0,
        tiempoPromedio: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            const data = await statsService.obtenerResumenDashboard();
            console.log("Datos recibidos en Dashboard:", data);
            
            setStats({
                vehiculosHoy:   data.vehiculosHoy ?? 0,
                ingresosTotal:  data.ingresosHoy ?? 0,
                disponibles:    data.cuposDisponibles ?? 0,
                tiempoPromedio: data.tiempoPromedio ?? 0,
            });
        } catch (error) {
            console.error('DashboardStats: error al obtener estadísticas.', error);
            // Si falla, limpiar estado para no mostrar inconsistencias
             setStats({
                vehiculosHoy: 0,
                ingresosTotal: 0,
                disponibles: 0,
                tiempoPromedio: 0,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats, pathname]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(value || 0);
    };

    const statCards = [
        {
            label: 'Vehículos Hoy',
            value: loading ? '—' : stats.vehiculosHoy,
            color: 'text-white',
            barColor: 'bg-white/30',
            icon: 'directions_car',
            bg: 'bg-primary dark:bg-primary/90',
        },
        {
            label: 'Ingresos',
            value: loading ? '—' : formatCurrency(stats.ingresosTotal),
            color: 'text-emerald-400',
            barColor: 'bg-emerald-400',
            icon: 'payments',
            bg: 'bg-white dark:bg-slate-900',
        },
        {
            label: 'Vehículos Activos',
            value: loading ? '—' : stats.disponibles,
            color: 'text-green-500',
            barColor: 'bg-green-500',
            icon: 'check_circle',
            bg: 'bg-white dark:bg-slate-900',
        },
        {
            label: 'Tiempo Promedio',
            value: loading ? '—' : `${stats.tiempoPromedio} min`,
            color: 'text-amber-400',
            barColor: 'bg-amber-400',
            icon: 'timer',
            bg: 'bg-white dark:bg-slate-900',
        },
    ];

    return (
        <div className="mb-4">
            <div className="flex justify-end mb-2">
                <button
                    onClick={fetchStats}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 h-8"
                >
                    <span className={`material-symbols-outlined text-[16px] ${loading ? 'animate-spin' : ''}`}>
                        refresh
                    </span>
                    Refrescar
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-l border-t border-slate-300 dark:border-slate-800 shadow-sm relative">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`${stat.bg} border-r border-b border-slate-300 dark:border-slate-800 p-6 relative overflow-hidden group transition-colors hover:brightness-95`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-4">
                                    {stat.label}
                                </p>
                                <h3 className={`text-4xl font-black tracking-tighter ${stat.color}`}>
                                    {stat.value}
                                </h3>
                            </div>
                            <span className="material-symbols-outlined text-slate-200 dark:text-slate-700 text-3xl">
                                {stat.icon}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-800 overflow-hidden rounded-full">
                                <div
                                    className={`h-full ${stat.barColor} transition-all duration-700`}
                                    style={{ width: loading ? '0%' : '60%' }}
                                />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                {loading ? 'Actualizando...' : 'Actualizado ahora'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}