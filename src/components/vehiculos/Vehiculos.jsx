'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import vehiculoService from '@/services/vehiculoService';
import tipoVehiculoService from '@/services/tipoVehiculoService';
import { VehiculosTitle } from './VehiculosTitle';
import { VehiculosTable } from './VehiculosTable';
import { VehiculosForm } from './VehiculosForm';
import { VehiculosAsociarCliente } from './VehiculosAsociarCliente';

export function Vehiculos() {
    const pathname = usePathname();

    const [vehiculos, setVehiculos]               = useState([]);
    const [tiposVehiculo, setTiposVehiculo]       = useState([]);
    const [loading, setLoading]                   = useState(true);
    const [busqueda, setBusqueda]                 = useState('');
    const [formVisible, setFormVisible]           = useState(false);
    const [vehiculoEditando, setVehiculoEditando] = useState(null);
    const [loadingForm, setLoadingForm]           = useState(false);
    const [mensaje, setMensaje]                   = useState(null);
    const [asociarPanel, setAsociarPanel]         = useState(null);
    const [loadingAsociar, setLoadingAsociar]     = useState(false);

    const cargarDatos = async () => {
        setLoading(true);
        const [vehiculosResult, tiposResult] = await Promise.allSettled([
            vehiculoService.listarTodos(),
            tipoVehiculoService.listar(),
        ]);
        if (vehiculosResult.status === 'fulfilled') setVehiculos(vehiculosResult.value ?? []);
        else setMensaje({ tipo: 'error', texto: 'Error al cargar los vehículos desde el servidor.' });
        if (tiposResult.status === 'fulfilled') setTiposVehiculo(tiposResult.value ?? []);
        setLoading(false);
    };

    useEffect(() => {
        cargarDatos();
    }, [pathname]);

    const handleNuevo = () => {
        setVehiculoEditando(null);
        setFormVisible(true);
        setAsociarPanel(null);
        setMensaje(null);
    };

    const handleEditar = (vehiculo) => {
        setVehiculoEditando(vehiculo);
        setFormVisible(true);
        setAsociarPanel(null);
        setMensaje(null);
    };

    const handleCancelar = () => {
        setFormVisible(false);
        setVehiculoEditando(null);
    };

    const handleGuardar = async (dto) => {
        setLoadingForm(true);
        setMensaje(null);
        try {
            if (vehiculoEditando) {
                await vehiculoService.actualizar(vehiculoEditando.id, dto);
                setMensaje({ tipo: 'exito', texto: `Vehículo ${dto.placa} actualizado correctamente.` });
            } else {
                await vehiculoService.crear(dto);
                setMensaje({ tipo: 'exito', texto: `Vehículo ${dto.placa} creado correctamente.` });
            }
            setFormVisible(false);
            setVehiculoEditando(null);
            await cargarDatos();
        } catch (error) {
            const status = error?.response?.status;
            const serverMsg = error?.response?.data?.message;
            let texto = 'Error al guardar el vehículo. Intente nuevamente.';
            if (status === 409) texto = `Ya existe un vehículo con la placa ${dto.placa}.`;
            if (status === 400) texto = serverMsg || 'Datos incorrectos. Revise los campos.';
            setMensaje({ tipo: 'error', texto });
        } finally {
            setLoadingForm(false);
        }
    };

    const handleEliminar = async (vehiculo) => {
        if (!window.confirm(`¿Eliminar el vehículo ${vehiculo.placa}?`)) return;
        setMensaje(null);
        try {
            await vehiculoService.eliminar(vehiculo.id);
            setMensaje({ tipo: 'exito', texto: `Vehículo ${vehiculo.placa} eliminado.` });
            if (asociarPanel?.vehiculo.id === vehiculo.id) setAsociarPanel(null);
            if (vehiculoEditando?.id === vehiculo.id) { setFormVisible(false); setVehiculoEditando(null); }
            await cargarDatos();
        } catch (error) {
            const serverMsg = error?.response?.data?.message;
            setMensaje({ tipo: 'error', texto: serverMsg || 'Error al eliminar el vehículo.' });
        }
    };

    const handleAsociarCliente = (vehiculo) => {
        if (asociarPanel?.vehiculo.id === vehiculo.id) {
            setAsociarPanel(null);
            return;
        }
        setAsociarPanel({ vehiculo });
        setFormVisible(false);
        setVehiculoEditando(null);
        setMensaje(null);
    };

    const handleConfirmarAsociacion = async (clienteId, clienteData) => {
        if (!asociarPanel) return;
        setLoadingAsociar(true);
        setMensaje(null);
        try {
            await vehiculoService.asociarCliente(asociarPanel.vehiculo.id, clienteId);
            // Optimistic update: avoid re-fetching GET /api/vehiculos (backend Hibernate proxy issue)
            setVehiculos((prev) => prev.map((v) =>
                v.id === asociarPanel.vehiculo.id ? { ...v, cliente: clienteData } : v
            ));
            setMensaje({ tipo: 'exito', texto: `Cliente asociado al vehículo ${asociarPanel.vehiculo.placa} correctamente.` });
            setAsociarPanel(null);
        } catch (error) {
            const serverMsg = error?.response?.data?.message;
            setMensaje({ tipo: 'error', texto: serverMsg || 'Error al asociar el cliente.' });
        } finally {
            setLoadingAsociar(false);
        }
    };

    return (
        <div className="w-full px-4 py-8">
            <VehiculosTitle />

            {mensaje && (
                <div className={`mb-4 text-xs font-bold px-4 py-3 border tracking-wide ${
                    mensaje.tipo === 'exito'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                    {mensaje.texto}
                </div>
            )}

            <VehiculosTable
                vehiculos={vehiculos}
                loading={loading}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                onNuevo={handleNuevo}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                onAsociarCliente={handleAsociarCliente}
                vehiculoAsociarId={asociarPanel?.vehiculo.id ?? null}
            />

            {formVisible && (
                <VehiculosForm
                    vehiculoEditando={vehiculoEditando}
                    tiposVehiculo={tiposVehiculo}
                    onGuardar={handleGuardar}
                    onCancelar={handleCancelar}
                    loading={loadingForm}
                />
            )}

            {asociarPanel && (
                <VehiculosAsociarCliente
                    vehiculo={asociarPanel.vehiculo}
                    onAsociar={handleConfirmarAsociacion}
                    onCerrar={() => setAsociarPanel(null)}
                    loading={loadingAsociar}
                />
            )}
        </div>
    );
}
