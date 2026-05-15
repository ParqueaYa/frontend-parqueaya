'use client';

export function ReportesTableRow({ type, data }) {
    if (type === 'ingreso') {
        const i = data;
        return (
            <tr className="group hover:bg-amber-500/[0.03] transition-all duration-300 border-b border-slate-800/50">
                <td className="px-6 py-4 text-xs font-mono font-bold text-amber-500/80 group-hover:text-amber-500 transition-colors">
                    #{i.numeroFactura}
                </td>
                <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-200">{new Date(i.fechaEmision).toLocaleDateString()}</span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">{new Date(i.fechaEmision).toLocaleTimeString()}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:border-amber-500/30 transition-colors">
                            {i.cliente?.nombre?.charAt(0)}{i.cliente?.apellido?.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-100 group-hover:text-white transition-colors">{i.cliente?.nombre} {i.cliente?.apellido}</span>
                            <span className="text-[9px] font-mono text-slate-500 tracking-widest">ID: {i.cliente?.cedula}</span>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-[10px] font-black text-slate-100 font-mono tracking-[0.2em] group-hover:border-amber-500/50 transition-all">
                        {i.vehiculo?.placa}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-500 italic max-w-[150px] truncate block" title={i.detalle}>
                        {i.detalle || 'Servicio de Parqueo'}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-amber-500 font-mono tracking-widest">
                        ${(i.total || 0).toLocaleString()}
                    </span>
                </td>
            </tr>
        );
    }

    if (type === 'movimiento') {
        const m = data;
        const isActivo = m.estado === 'ACTIVO';
        return (
            <tr className="group hover:bg-blue-500/[0.03] transition-all duration-300 border-b border-slate-800/50">
                <td className="px-6 py-4 text-[10px] font-mono font-bold text-slate-600">
                    {m.id?.toString().padStart(6, '0')}
                </td>
                <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-[10px] font-black text-slate-100 font-mono tracking-[0.2em] group-hover:border-blue-500/50 transition-all">
                        {m.vehiculo?.placa}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-200">{new Date(m.fechaIngreso).toLocaleDateString()}</span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">{new Date(m.fechaIngreso).toLocaleTimeString()}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    {m.fechaSalida ? (
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-slate-200">{new Date(m.fechaSalida).toLocaleDateString()}</span>
                            <span className="text-[9px] font-mono text-slate-500 uppercase">{new Date(m.fechaSalida).toLocaleTimeString()}</span>
                        </div>
                    ) : (
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 animate-pulse flex items-center gap-1">
                             En curso
                        </span>
                    )}
                </td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] border ${
                        isActivo 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                        {m.estado}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <span className={`text-xs font-bold font-mono tracking-widest ${m.totalCobrado ? 'text-slate-100' : 'text-slate-600'}`}>
                        {m.totalCobrado ? `$${m.totalCobrado.toLocaleString()}` : '—'}
                    </span>
                </td>
            </tr>
        );
    }

    return null;
}
