'use client';

import { useState, useEffect } from 'react';
import reporteService from '@/services/reporteService';
import { ReportesTitle } from './ReportesTitle';
import { ReportesFilters } from './ReportesFilters';
import { ReportesStatistics } from './ReportesStatistics';
import { ReportesExportButtons } from './ReportesExportButtons';
import { ReportesTable } from './ReportesTable';

export function Reportes() {
    const [activeTab, setActiveTab] = useState('ingresos');
    const [ingresos, setIngresos] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtroTexto, setFiltroTexto] = useState('');
    
    // Filtros avanzados
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [tipoVehiculo, setTipoVehiculo] = useState("todos");

    const cargarDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            const [ingresosData, movimientosData] = await Promise.all([
                reporteService.obtenerIngresos(),
                reporteService.obtenerMovimientos()
            ]);
            setIngresos(ingresosData || []);
            setMovimientos(movimientosData || []);
        } catch (err) {
            setError('Error al cargar la información de reportes desde el backend.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const filtrarPorFecha = (fechaStr) => {
        if (!fechaStr) return true;
        const fecha = new Date(fechaStr).getTime();
        const inicio = fechaInicio ? new Date(fechaInicio + "T00:00:00").getTime() : null;
        const fin = fechaFin ? new Date(fechaFin + "T23:59:59").getTime() : null;
        
        if (inicio && fecha < inicio) return false;
        if (fin && fecha > fin) return false;
        return true;
    };

    const filtrarPorTipo = (item) => {
        if (tipoVehiculo === 'todos') return true;
        const tipoEnItem = item.vehiculo?.tipoVehiculo?.toLowerCase() || '';
        return tipoEnItem === tipoVehiculo;
    };

    const ingresosFiltrados = ingresos.filter(i => {
        const matchesTexto = i.numeroFactura?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                            i.vehiculo?.placa?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                            i.cliente?.cedula?.includes(filtroTexto);
        const matchesFecha = filtrarPorFecha(i.fechaEmision);
        const matchesTipo = filtrarPorTipo(i);
        return matchesTexto && matchesFecha && matchesTipo;
    });

    const movimientosFiltrados = movimientos.filter(m => {
        const matchesTexto = m.vehiculo?.placa?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                            m.estado?.toLowerCase().includes(filtroTexto.toLowerCase());
        const matchesFecha = filtrarPorFecha(m.fechaIngreso);
        const matchesTipo = filtrarPorTipo(m);
        return matchesTexto && matchesFecha && matchesTipo;
    });

    const totalIngresos = ingresosFiltrados.reduce((acc, curr) => acc + (curr.total || 0), 0);

    return (
        <div className="p-5 bg-slate-900 min-h-screen">
            <ReportesTitle />
            
            <ReportesFilters 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                filtroTexto={filtroTexto}
                setFiltroTexto={setFiltroTexto}
                fechaInicio={fechaInicio}
                setFechaInicio={setFechaInicio}
                fechaFin={fechaFin}
                setFechaFin={setFechaFin}
                tipoVehiculo={tipoVehiculo}
                setTipoVehiculo={setTipoVehiculo}
            />

            <ReportesStatistics 
                totalIngresos={totalIngresos}
                totalMovimientos={movimientosFiltrados.length}
                facturasCount={ingresosFiltrados.length}
            />

            <ReportesExportButtons />

            <div className="bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                <ReportesTable 
                    loading={loading}
                    activeTab={activeTab}
                    data={activeTab === 'ingresos' ? ingresosFiltrados : movimientosFiltrados}
                />
                
                {!loading && (
                    <div className="p-4 bg-slate-800/30 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {activeTab === 'ingresos' ? `Total Facturas: ${ingresosFiltrados.length}` : `Total Movimientos: ${movimientosFiltrados.length}`}
                        </span>
                        {activeTab === 'ingresos' && (
                            <span className="text-sm font-black text-amber-500 tracking-widest font-mono">
                                TOTAL: ${totalIngresos.toLocaleString()}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
