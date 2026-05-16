'use client';

export function ReportesFilters({ 
    activeTab, 
    setActiveTab, 
    filtroTexto, 
    setFiltroTexto,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    tipoVehiculo,
    setTipoVehiculo 
}) {
    return (
        <div className="mb-8 space-y-6">
            {/* Main Tabs and Search */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
                <div className="w-full xl:w-auto">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-3 ml-1">Vista del Reporte</h4>
                    <div className="flex bg-slate-900 border border-slate-800 p-1 shadow-xl">
                        <button
                            onClick={() => setActiveTab('ingresos')}
                            className={`flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                                activeTab === 'ingresos' 
                                    ? 'bg-amber-500 text-white shadow-lg' 
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">finance</span>
                            Ingresos Financieros
                        </button>
                        <button
                            onClick={() => setActiveTab('movimientos')}
                            className={`flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                                activeTab === 'movimientos' 
                                    ? 'bg-amber-500 text-white shadow-lg' 
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">history</span>
                            Auditoría de Movimientos
                        </button>
                    </div>
                </div>

                <div className="w-full xl:w-96">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-3 ml-1">Búsqueda Inteligente</h4>
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            manage_search
                        </span>
                        <input
                            type="text"
                            placeholder="Placa, Cédula, # Factura..."
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none transition-all shadow-xl placeholder:text-slate-700 font-mono"
                        />
                    </div>
                </div>
            </div>

            {/* Advanced Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-slate-800/50 bg-slate-900/30 px-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-amber-500">calendar_month</span>
                        Fecha Inicio
                    </label>
                    <input 
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 px-4 py-2 text-xs text-slate-100 focus:border-amber-500 outline-none transition-all font-mono"
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-amber-500">event_available</span>
                        Fecha Fin
                    </label>
                    <input 
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 px-4 py-2 text-xs text-slate-100 focus:border-amber-500 outline-none transition-all font-mono"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-amber-500">directions_car</span>
                        Tipo de Vehículo
                    </label>
                    <select 
                        value={tipoVehiculo}
                        onChange={(e) => setTipoVehiculo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 px-4 py-2 text-xs text-slate-100 focus:border-amber-500 outline-none transition-all uppercase font-bold tracking-widest cursor-pointer"
                    >
                        <option value="todos">Todos los Tipos</option>
                        <option value="carro">Automóvil</option>
                        <option value="moto">Motocicleta</option>
                        <option value="camioneta">Camioneta / SUV</option>
                        <option value="camion">Camión / Pesado</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
