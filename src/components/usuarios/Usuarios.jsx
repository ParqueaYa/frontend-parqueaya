// components/usuarios/Usuarios.jsx
'use client';

import { useState, useEffect } from "react";
import { UsuariosTitle } from './UsuariosTitle';
import { UsuariosCreateButton } from './UsuariosCreateButton';
import { UsuariosForm } from './UsuariosForm';
import { UsuariosTable } from './UsuariosTable';
import usuarioService from '@/services/usuarioService';
import authService from '@/services/authService';

export function Usuarios() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [nuevoUsuario, setNuevoUsuario] = useState({
        id: null,
        nombre: "",
        apellido: "",
        email: "",
        rol: "OPERADOR",
        password: ""
    });

    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        setIsLoading(true);
        try {
            const data = await usuarioService.listar();
            const mappedData = data.map(u => ({
                ...u,
                estado: u.activo ? "Activo" : "Inactivo",
                google: u.authProvider === 'GOOGLE' ? "Sí" : "No"
            }));
            setUsuarios(mappedData);
            setError(null);
        } catch (err) {
            console.error("Error al cargar usuarios:", err);
            setError("No se pudieron cargar los usuarios.");
        } finally {
            setIsLoading(false);
        }
    };

    const crearOActualizarEmpleado = async () => {
        try {
            if (modoEdicion) {
                await usuarioService.actualizar(nuevoUsuario.id, {
                    nombre: nuevoUsuario.nombre,
                    apellido: nuevoUsuario.apellido || "",
                    rol: nuevoUsuario.rol
                });
                alert(`Usuario ${nuevoUsuario.nombre} actualizado`);
            } else {
                await authService.register({
                    nombre: nuevoUsuario.nombre,
                    apellido: nuevoUsuario.apellido || "",
                    email: nuevoUsuario.email,
                    password: nuevoUsuario.password,
                    rol: nuevoUsuario.rol
                });
                alert(`Usuario ${nuevoUsuario.nombre} creado`);
            }
            
            setNuevoUsuario({ id: null, nombre: "", apellido: "", email: "", rol: "OPERADOR", password: "" });
            setMostrarFormulario(false);
            setModoEdicion(false);
            fetchUsuarios();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            alert("Ocurrió un error al guardar el usuario.");
        }
    };

    const iniciarEdicion = (usuario) => {
        setNuevoUsuario({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido || "",
            email: usuario.email,
            rol: usuario.rol,
            password: "" // Se deja en blanco por seguridad
        });
        setModoEdicion(true);
        setMostrarFormulario(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleEstado = async (id) => {
        try {
            await usuarioService.cambiarEstado(id);
            fetchUsuarios();
        } catch (error) {
            console.error("Error al cambiar estado:", error);
            alert("No se pudo cambiar el estado del usuario.");
        }
    };

    const resetearPassword = (nombre) => {
         alert(`Se ha enviado un enlace de recuperación a ${nombre}`);
    };

    const cancelarFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
        if (mostrarFormulario) {
            setModoEdicion(false);
            setNuevoUsuario({ id: null, nombre: "", apellido: "", email: "", rol: "OPERADOR", password: "" });
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-8 min-h-full">
            <div className="w-full max-w-[1000px]">
                <UsuariosTitle />
                
                <div className="flex justify-end mb-6">
                    <UsuariosCreateButton
                        mostrarFormulario={mostrarFormulario}
                        setMostrarFormulario={cancelarFormulario}
                    />
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                {mostrarFormulario && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <UsuariosForm
                            nuevoUsuario={nuevoUsuario}
                            setNuevoUsuario={setNuevoUsuario}
                            crearEmpleado={crearOActualizarEmpleado}
                        />
                    </div>
                )}
                
                <div className="bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
                    {isLoading ? (
                        <div className="p-8 text-center text-slate-400">Cargando usuarios...</div>
                    ) : (
                        <UsuariosTable 
                            usuarios={usuarios} 
                            onEdit={iniciarEdicion}
                            onToggleStatus={toggleEstado}
                            onResetPassword={resetearPassword}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}