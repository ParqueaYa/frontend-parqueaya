// components/salidas/SalidasVehicleInfo.jsx

// Definición externa para evitar el error react-hooks/static-components
const InfoRow = ({ label, value, isLast = false, highlight = false }) => (
    <div className={`flex border-slate-800 ${!isLast ? 'border-b' : ''}`}>
        {/* Celda de Etiqueta */}
        <div className="w-[200px] bg-slate-800/30 p-4 flex items-center border-r border-slate-800">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {label}
            </label>
        </div>
        {/* Celda de Valor */}
        <div className="flex-1 p-4 bg-slate-900">
            <span className={`text-sm font-black tracking-widest uppercase ${highlight ? 'text-orange-500 text-lg' : 'text-white'}`}>
                {value}
            </span>
        </div>
    </div>
);

export function SalidasVehicleInfo({ vehiculoEncontrado }) {
    if (!vehiculoEncontrado) return null;

    return (
        <div className="max-w-[800px] mb-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Título de sección igual al de Registro de Entrada */}
            <div className="p-4 bg-slate-800/50 border border-slate-800 border-b-0 flex items-center gap-3">
                <div className="h-4 w-1 bg-orange-600"></div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">
                    Información de Liquidación de Vehículo
                </h3>
            </div>
            <div className="border border-slate-800 bg-slate-900 overflow-hidden">
                <InfoRow label="PLACA:" value={vehiculoEncontrado.placa} />
                <InfoRow 
                    label="HORA ENTRADA:" 
                    value={vehiculoEncontrado.horaEntrada || (vehiculoEncontrado.fechaIngreso ? new Date(vehiculoEncontrado.fechaIngreso).toLocaleString() : '')} 
                />
                <InfoRow 
                    label="HORA SALIDA:" 
                    value={vehiculoEncontrado.horaSalida || new Date().toLocaleString()} 
                />
                <InfoRow 
                    label="TIEMPO TOTAL:" 
                    value={vehiculoEncontrado.tiempoTotal || vehiculoEncontrado.tiempoTranscurrido} 
                />
                <InfoRow 
                    label="TARIFA APLICADA:" 
                    value={vehiculoEncontrado.tarifaAplicada || (vehiculoEncontrado.tarifaHora ? `$${vehiculoEncontrado.tarifaHora}/hora` : '')} 
                />
                <InfoRow
                    label="MONTO A PAGAR:"
                    value={vehiculoEncontrado.montoPagar || (vehiculoEncontrado.costoAcumulado != null ? `$${vehiculoEncontrado.costoAcumulado.toLocaleString()}` : '')}
                    isLast={true}
                    highlight={true}
                />
            </div>
        </div>
    );
}