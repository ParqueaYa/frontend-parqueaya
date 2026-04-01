// components/dashboard/DashboardStats.jsx
export function DashboardStats() {
    const stats = {
        total: 100,
        ocupados: 35,
        disponibles: 65
    };

    const statCards = [
        { label: "Cupos Totales", value: stats.total, color: "text-white", icon: "grid_view" },
        { label: "Cupos Ocupados", value: stats.ocupados, color: "text-orange-500", icon: "directions_car" },
        { label: "Cupos Disponibles", value: stats.disponibles, color: "text-green-500", icon: "check_circle" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 mb-1 border-l border-t border-slate-300 dark:border-slate-800 shadow-sm">
            {statCards.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border-r border-b border-slate-300 dark:border-slate-800 p-6 relative overflow-hidden group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                                {stat.label}
                            </p>
                            <h3 className={`text-5xl font-black tracking-tighter ${stat.color}`}>
                                {stat.value}
                            </h3>
                        </div>
                        <span className="material-symbols-outlined text-slate-200 dark:text-slate-800 text-3xl">
                            {stat.icon}
                        </span>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div
                                className="h-full bg-orange-500"
                                style={{ width: `${(stat.value / stats.total) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            Actualizado ahora
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}