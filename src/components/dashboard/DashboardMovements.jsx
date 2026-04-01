// components/dashboard/DashboardMovements.jsx
'use client';

import { useState } from 'react';

export function DashboardMovements() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("Todos");

    const movimientos = [
        { placa: "ABC123", tipo: "Auto", cupo: "A-12", horaEntrada: "08:30", horaSalida: "10:45", estado: "Completado" },
        { placa: "XYZ789", tipo: "Moto", cupo: "M-5", horaEntrada: "09:15", horaSalida: "-", estado: "Dentro" },
        { placa: "LMN456", tipo: "Auto", cupo: "B-8", horaEntrada: "07:00", horaSalida: "16:30", estado: "Completado" },
        { placa: "QRS321", tipo: "Camioneta", cupo: "C-3", horaEntrada: "10:20", horaSalida: "-", estado: "Dentro" },
        { placa: "DEF654", tipo: "Auto", cupo: "A-25", horaEntrada: "06:45", horaSalida: "18:00", estado: "Completado" },
    ];

    // Lógica de filtrado
    const filteredMovements = movimientos.filter(mov => {
        const matchesSearch = mov.placa.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "Todos" || mov.estado === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm">
            {/* Header con Buscador y Filtros */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-300 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-primary"></div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
                        Últimos Movimientos
                    </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Buscador */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                        <input
                            type="text"
                            placeholder="BUSCAR PLACA..."
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 pl-8 pr-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:border-primary focus:ring-0 w-40 outline-none transition-colors"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Selector de Estado */}
                    <select
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:border-primary outline-none cursor-pointer text-slate-600 dark:text-slate-300"
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="Todos">TODOS LOS ESTADOS</option>
                        <option value="Dentro">DENTRO</option>
                        <option value="Completado">COMPLETADO</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/30">
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Placa</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Tipo</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Cupo</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Entrada</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Salida</th>
                        <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Estado</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredMovements.length > 0 ? (
                        filteredMovements.map((mov, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">{mov.placa}</td>
                                <td className="px-4 py-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">{mov.tipo}</td>
                                <td className="px-4 py-4 text-xs font-mono text-slate-600 dark:text-slate-400">{mov.cupo}</td>
                                <td className="px-4 py-4 text-xs text-slate-600 dark:text-slate-400">{mov.horaEntrada}</td>
                                <td className="px-4 py-4 text-xs text-slate-600 dark:text-slate-400">{mov.horaSalida}</td>
                                <td className="px-4 py-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-sm border ${
                                            mov.estado === "Dentro"
                                                ? "bg-primary/10 text-primary border-primary/20"
                                                : "bg-green-500/10 text-green-600 border-green-500/20"
                                        }`}>
                                            {mov.estado}
                                        </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                No se encontraron movimientos
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}