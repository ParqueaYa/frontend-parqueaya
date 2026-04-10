'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosConfig';

export function DashboardStats() {
    const [stats, setStats] = useState({
        vehiculosHoy: 0,
        ingresos: 0,
        espaciosDisponibles: 0,
        tiempoPromedio: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosInstance.get('/api/stats');
                const data = response.data;
                setStats({
                    vehiculosHoy:        data.vehiculosHoy        ?? data.ocupados    ?? 0,
                    ingresos:            data.ingresos            ?? 0,
                    espaciosDisponibles: data.espaciosDisponibles  ?? data.disponibles ?? 0,
                    tiempoPromedio:      data.tiempoPromedio       ?? 0,
                });
            } catch (error) {
                console.warn('DashboardStats: no se pudo obtener estadísticas.', error?.response?.status);
                // Estado queda en ceros — no rompe la interfaz
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

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
            value: loading ? '—' : `$${Number(stats.ingresos).toLocaleString('es-CO')}`,
            color: 'text-emerald-400',
            barColor: 'bg-emerald-400',
            icon: 'payments',
            bg: 'bg-white dark:bg-slate-900',
        },
        {
            label: 'Espacios Disponibles',
            value: loading ? '—' : stats.espaciosDisponibles,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-1 border-l border-t border-slate-300 dark:border-slate-800 shadow-sm">
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
                            {loading ? 'Cargando...' : 'Actualizado ahora'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}