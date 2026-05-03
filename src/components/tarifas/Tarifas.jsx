'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import tarifaService from '@/services/tarifaService';
import tipoVehiculoService from '@/services/tipoVehiculoService';
import { TarifasTitle } from './TarifasTitle';
import { TarifasTable } from './TarifasTable';
import { TarifasForm } from './TarifasForm';

export function Tarifas() {
    const pathname = usePathname();

    const [tarifas, setTarifas]               = useState([]);
    const [tiposVehiculo, setTiposVehiculo]   = useState([]);
    const [loading, setLoading]               = useState(true);
    const [filtroTipo, setFiltroTipo]         = useState('TODAS');
    const [formVisible, setFormVisible]       = useState(false);
    const [tarifaEditando, setTarifaEditando] = useState(null);
    const [loadingForm, setLoadingForm]       = useState(false);
    const [mensaje, setMensaje]               = useState(null);

    const cargarDatos = async () => {
        setLoading(true);
        const [tarifasResult, tiposResult] = await Promise.allSettled([
            tarifaService.listar(),
            tipoVehiculoService.listar(),
        ]);
        if (tarifasResult.status === 'fulfilled') setTarifas(tarifasResult.value ?? []);
        else setMensaje({ tipo: 'error', texto: 'Error al cargar las tarifas.' });
        if (tiposResult.status === 'fulfilled') setTiposVehiculo(tiposResult.value ?? []);
        setLoading(false);
    };

    useEffect(() => {
        cargarDatos();
    }, [pathname]);

    const handleNuevo = () => {
        setTarifaEditando(null);
        setFormVisible(true);
        setMensaje(null);
    };

    const handleEditar = (tarifa) => {
        setTarifaEditando(tarifa);
        setFormVisible(true);
        setMensaje(null);
    };

    const handleCancelar = () => {
        setFormVisible(false);
        setTarifaEditando(null);
    };

    const handleGuardar = async (dto) => {
        setLoadingForm(true);
        setMensaje(null);
        try {
            if (tarifaEditando) {
                await tarifaService.actualizar(tarifaEditando.id, dto);
                setMensaje({ tipo: 'exito', texto: 'Tarifa actualizada correctamente.' });
            } else {
                await tarifaService.crear(dto);
                setMensaje({ tipo: 'exito', texto: 'Tarifa creada correctamente.' });
            }
            setFormVisible(false);
            setTarifaEditando(null);
            await cargarDatos();
        } catch (error) {
            const status = error?.response?.status;
            const serverMsg = error?.response?.data?.message;
            let texto = 'Error al guardar la tarifa. Intente nuevamente.';
            if (status === 400) texto = serverMsg || 'Datos incorrectos. Revise los campos.';
            if (status === 409) texto = 'Ya existe una tarifa con esa combinación de vehículo y modalidad.';
            setMensaje({ tipo: 'error', texto });
        } finally {
            setLoadingForm(false);
        }
    };

    const handleEliminar = async (tarifa) => {
        const label = `${tarifa.tipoVehiculo?.nombre ?? ''} — ${tarifa.tipoTarifa}`;
        if (!window.confirm(`¿Eliminar la tarifa ${label}?`)) return;
        setMensaje(null);
        try {
            await tarifaService.eliminar(tarifa.id);
            setMensaje({ tipo: 'exito', texto: `Tarifa ${label} eliminada.` });
            if (tarifaEditando?.id === tarifa.id) { setFormVisible(false); setTarifaEditando(null); }
            await cargarDatos();
        } catch (error) {
            const serverMsg = error?.response?.data?.message;
            setMensaje({ tipo: 'error', texto: serverMsg || 'Error al eliminar la tarifa.' });
        }
    };

    return (
        <div className="w-full px-4 py-8">
            <TarifasTitle />

            {mensaje && (
                <div className={`mb-4 text-xs font-bold px-4 py-3 border tracking-wide ${
                    mensaje.tipo === 'exito'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                    {mensaje.texto}
                </div>
            )}

            <TarifasTable
                tarifas={tarifas}
                loading={loading}
                filtroTipo={filtroTipo}
                setFiltroTipo={setFiltroTipo}
                onNuevo={handleNuevo}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />

            {formVisible && (
                <TarifasForm
                    tarifaEditando={tarifaEditando}
                    tiposVehiculo={tiposVehiculo}
                    onGuardar={handleGuardar}
                    onCancelar={handleCancelar}
                    loading={loadingForm}
                />
            )}
        </div>
    );
}
