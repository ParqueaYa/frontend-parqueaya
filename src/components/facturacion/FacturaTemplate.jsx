import React from 'react';

export function FacturaTemplate({ factura, cliente, vehiculo }) {
    if (!factura) return null;
    
    // Si la factura ya viene con los datos de cliente/vehiculo embebidos desde el backend, usamos esos
    const clienteNombre = factura.cliente?.nombre ? `${factura.cliente.nombre} ${factura.cliente.apellido || ''}` : cliente ? `${cliente.nombre} ${cliente.apellido || ''}` : 'Consumidor Final';
    const clienteCedula = factura.cliente?.cedula || cliente?.cedula || 'N/A';
    const placaVehiculo = factura.vehiculo?.placa || vehiculo?.placa || factura.placa || 'N/A';
    const monto = factura.total || factura.monto || 0;
    const fecha = factura.fecha || new Date().toISOString().slice(0, 10);
    const numero = factura.id || '000000';

    return (
        <div className="bg-slate-100 p-8 text-slate-900 font-mono shadow-2xl max-w-2xl mx-auto border-t-8 border-primary">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-300 pb-6 mb-6">
                <div>
                    <div className="text-3xl font-black mb-1 text-slate-800 tracking-tighter">PARQUEO<span className="text-primary">YA</span></div>
                    <div className="text-xs text-slate-600 font-bold tracking-widest">NIT: 900.123.456-7</div>
                    <div className="text-xs text-slate-600">Dirección: Calle 123 # 45-67</div>
                    <div className="text-xs text-slate-600">Teléfono: (601) 234-5678</div>
                </div>
                <div className="text-right border-2 border-slate-300 p-3 bg-white">
                    <div className="text-xl font-black tracking-widest mb-1 text-slate-800">FACTURA</div>
                    <div className="text-sm font-bold text-slate-600">No. {String(numero).padStart(8, '0')}</div>
                    <div className="text-sm text-slate-500">Fecha: {new Date(fecha).toLocaleDateString()}</div>
                </div>
            </div>

            {/* Datos del Cliente */}
            <div className="mb-6 bg-white p-4 border border-slate-200">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Datos del Cliente</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="font-bold text-slate-500">CLIENTE:</span> {clienteNombre}</div>
                    <div><span className="font-bold text-slate-500">C.C./NIT:</span> {clienteCedula}</div>
                </div>
            </div>

            {/* Datos del Vehículo */}
            <div className="mb-6 bg-white p-4 border border-slate-200">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Datos del Vehículo y Servicio</div>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-slate-100">
                            <td className="py-2 font-bold text-slate-500 w-1/3">PLACA:</td>
                            <td className="py-2 font-black text-lg">{placaVehiculo}</td>
                        </tr>
                        {factura.fechaIngreso && (
                            <tr className="border-b border-slate-100">
                                <td className="py-2 font-bold text-slate-500">HORA ENTRADA:</td>
                                <td className="py-2">{new Date(factura.fechaIngreso).toLocaleString()}</td>
                            </tr>
                        )}
                        {factura.fechaSalida && (
                            <tr className="border-b border-slate-100">
                                <td className="py-2 font-bold text-slate-500">HORA SALIDA:</td>
                                <td className="py-2">{new Date(factura.fechaSalida).toLocaleString()}</td>
                            </tr>
                        )}
                        {factura.tiempoMinutos && (
                            <tr className="border-b border-slate-100">
                                <td className="py-2 font-bold text-slate-500">TIEMPO TOTAL:</td>
                                <td className="py-2">{Math.floor(factura.tiempoMinutos / 60)}h {factura.tiempoMinutos % 60}m</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Total */}
            <div className="flex justify-end mb-8">
                <div className="w-1/2 bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg">
                    <span className="font-bold tracking-widest text-xs uppercase text-slate-400">Total a Pagar</span>
                    <span className="text-3xl font-black text-primary">${monto.toLocaleString()}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-400 border-t border-slate-300 pt-4 mt-8">
                <div>Resolución DIAN No. 123456789 del 01/01/2026</div>
                <div>Rango autorizado: 00000001 al 99999999</div>
                <div className="font-bold mt-2">¡Gracias por preferirnos!</div>
            </div>
            
            {/* Imprimir btn (solo visible en pantalla) */}
            <div className="mt-8 text-center print:hidden">
                <button 
                    onClick={() => window.print()}
                    className="bg-primary text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mx-auto hover:bg-transparent hover:text-primary border border-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">print</span>
                    Imprimir Factura
                </button>
            </div>
            
            <style jsx global>{`
                @media print {
                    body * { visibility: hidden; }
                    .print\\:hidden { display: none !important; }
                    .bg-slate-100 { background-color: white !important; box-shadow: none !important; }
                    .border-primary { border-color: black !important; }
                    .text-primary { color: black !important; }
                    .bg-slate-800 { background-color: #f1f5f9 !important; color: black !important; }
                    .text-slate-400 { color: #475569 !important; }
                    .bg-slate-100, .bg-white { 
                        position: absolute; left: 0; top: 0; width: 100%;
                        visibility: visible; 
                    }
                    .bg-slate-100 *, .bg-white * { visibility: visible; }
                }
            `}</style>
        </div>
    );
}
