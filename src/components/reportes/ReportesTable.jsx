'use client';

import { ReportesTableRow } from './ReportesTableRow';

export function ReportesTable({ loading, activeTab, data }) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 bg-slate-900/50">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-amber-500 text-xl animate-pulse">query_stats</span>
                    </div>
                </div>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Compilando Reporte...</p>
            </div>
        );
    }

    const headers = activeTab === 'ingresos' 
        ? ['Factura', 'Emisión', 'Cliente / ID', 'Placa', 'Observación', 'Total']
        : ['ID Reg', 'Vehículo', 'Ingreso', 'Salida', 'Estado', 'Recaudado'];

    return (
        <div className="relative">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
                            {headers.map((col, idx) => (
                                <th key={col} className={`px-6 py-4 border-b border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ${idx === headers.length - 1 ? 'text-right' : 'text-left'}`}>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <ReportesTableRow 
                                    key={item.id} 
                                    type={activeTab === 'ingresos' ? 'ingreso' : 'movimiento'} 
                                    data={item} 
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center opacity-20">
                                        <span className="material-symbols-outlined text-6xl text-slate-500 mb-4">
                                            {activeTab === 'ingresos' ? 'receipt_long' : 'swap_horiz'}
                                        </span>
                                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                                            Sin registros encontrados para la búsqueda
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
