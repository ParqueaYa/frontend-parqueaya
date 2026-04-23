'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clienteService from '@/services/clienteService';
import { ClientesTitle } from './ClientesTitle';
import { ClientesTable } from './ClientesTable';
import { ClientesForm } from './ClientesForm';
import { ClientesVehiculos } from './ClientesVehiculos';

export function Clientes() {
    const pathname = usePathname();

    const [clientes, setClientes]             = useState([]);
    const [loading, setLoading]               = useState(true);
    const [busqueda, setBusqueda]             = useState('');
    const [formVisible, setFormVisible]       = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null);
    const [loadingForm, setLoadingForm]       = useState(false);
    const [mensaje, setMensaje]               = useState(null);
    const [vehiculosPanel, setVehiculosPanel] = useState(null);

    const cargarClientes = async () => {
        setLoading(true);
        try {
            const data = await clienteService.listar();
            setClientes(data ?? []);
        } catch {
            setMensaje({ tipo: 'error', texto: 'Error al cargar los clientes.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, [pathname]);

    const handleNuevo = () => {
        setClienteEditando(null);
        setFormVisible(true);
        setMensaje(null);
        setVehiculosPanel(null);
    };

    const handleEditar = (cliente) => {
        setClienteEditando(cliente);
        setFormVisible(true);
        setMensaje(null);
        setVehiculosPanel(null);
    };

    const handleCancelar = () => {
        setFormVisible(false);
        setClienteEditando(null);
    };

    const handleGuardar = async (dto) => {
        setLoadingForm(true);
        setMensaje(null);
        try {
            if (clienteEditando) {
                await clienteService.actualizar(clienteEditando.id, dto);
                setMensaje({ tipo: 'exito', texto: `Cliente ${dto.nombre} ${dto.apellido} actualizado correctamente.` });
            } else {
                await clienteService.crear(dto);
                setMensaje({ tipo: 'exito', texto: `Cliente ${dto.nombre} ${dto.apellido} creado correctamente.` });
            }
            setFormVisible(false);
            setClienteEditando(null);
            await cargarClientes();
        } catch (error) {
            const status = error?.response?.status;
            const serverMsg = error?.response?.data?.message;
            let texto = 'Error al guardar el cliente. Intente nuevamente.';
            if (status === 409) texto = `Ya existe un cliente con esa cédula.`;
            if (status === 400) texto = serverMsg || 'Datos incorrectos. Revise los campos.';
            setMensaje({ tipo: 'error', texto });
        } finally {
            setLoadingForm(false);
        }
    };

    const handleEliminar = async (cliente) => {
        if (!window.confirm(`¿Eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`)) return;
        setMensaje(null);
        try {
            await clienteService.eliminar(cliente.id);
            setMensaje({ tipo: 'exito', texto: `Cliente ${cliente.nombre} ${cliente.apellido} eliminado.` });
            if (vehiculosPanel?.cliente.id === cliente.id) setVehiculosPanel(null);
            if (clienteEditando?.id === cliente.id) { setFormVisible(false); setClienteEditando(null); }
            await cargarClientes();
        } catch (error) {
            const serverMsg = error?.response?.data?.message;
            setMensaje({ tipo: 'error', texto: serverMsg || 'Error al eliminar el cliente.' });
        }
    };

    const handleVerVehiculos = async (cliente) => {
        if (vehiculosPanel?.cliente.id === cliente.id) {
            setVehiculosPanel(null);
            return;
        }
        setVehiculosPanel({ cliente, vehiculos: [], loading: true });
        try {
            const data = await clienteService.obtenerVehiculos(cliente.id);
            setVehiculosPanel({ cliente, vehiculos: data ?? [], loading: false });
        } catch {
            setVehiculosPanel({ cliente, vehiculos: [], loading: false });
        }
    };

    return (
        <div className="w-full px-4 py-8">
            <ClientesTitle />

            {mensaje && (
                <div className={`mb-4 text-xs font-bold px-4 py-3 border tracking-wide ${
                    mensaje.tipo === 'exito'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                    {mensaje.texto}
                </div>
            )}

            <ClientesTable
                clientes={clientes}
                loading={loading}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                onNuevo={handleNuevo}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                onVerVehiculos={handleVerVehiculos}
                clienteVehiculosId={vehiculosPanel?.cliente.id ?? null}
            />

            {formVisible && (
                <ClientesForm
                    clienteEditando={clienteEditando}
                    onGuardar={handleGuardar}
                    onCancelar={handleCancelar}
                    loading={loadingForm}
                />
            )}

            {vehiculosPanel && (
                <ClientesVehiculos
                    cliente={vehiculosPanel.cliente}
                    vehiculos={vehiculosPanel.vehiculos}
                    loading={vehiculosPanel.loading}
                    onCerrar={() => setVehiculosPanel(null)}
                />
            )}
        </div>
    );
}
