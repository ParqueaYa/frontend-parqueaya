// components/salidas/SalidasSearch.jsx
'use client';

export function SalidasSearch({ placaBusqueda, setPlacaBusqueda, buscarVehiculo }) {
    return (
        <div className="max-w-[800px] mb-6 shadow-xl">
            {/* Contenedor que replica una fila del formulario de entradas */}
            <div className="flex border border-slate-800 bg-slate-900 overflow-hidden">

                {/* Celda de Etiqueta (Lado izquierdo) */}
                <div className="w-[200px] bg-slate-800/50 p-4 flex items-center border-r border-slate-800">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        BUSCAR POR PLACA:
                    </label>
                </div>

                {/* Celda de Input y Botón (Lado derecho) */}
                <div className="flex-1 p-2 bg-slate-900 flex gap-2 items-center">
                    <input
                        type="text"
                        value={placaBusqueda}
                        onChange={(e) => setPlacaBusqueda(e.target.value.toUpperCase())}
                        placeholder="ABC-123"
                        className="flex-1 bg-slate-950 border border-slate-700 p-3 text-sm text-white font-bold tracking-widest focus:border-orange-500 focus:outline-none uppercase placeholder:text-slate-700"
                    />

                    <button
                        onClick={buscarVehiculo}
                        className="h-full px-8 bg-orange-600 border border-orange-500 text-white text-[11px] font-black tracking-widest uppercase hover:bg-transparent hover:text-orange-500 transition-all duration-300 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">search</span>
                        BUSCAR
                    </button>
                </div>
            </div>
        </div>
    );
}