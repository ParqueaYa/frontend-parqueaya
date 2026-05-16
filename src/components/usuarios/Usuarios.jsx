// components/usuarios/Usuarios.jsx
'use client';

import { useState } from "react";
import { UsuariosTitle } from './UsuariosTitle';
import { UsuariosCreateButton } from './UsuariosCreateButton';
import { UsuariosForm } from './UsuariosForm';
import { UsuariosTable } from './UsuariosTable';

export function Usuarios() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: "Juan Pérez", email: "juan@parqueo-ya.com", rol: "Administrador", google: "Sí", estado: "Activo" },
        { id: 2, nombre: "María García", email: "maria@parqueo-ya.com", rol: "Empleado", google: "No", estado: "Activo" },
        { id: 3, nombre: "Carlos López", email: "carlos@parqueo-ya.com", rol: "Empleado", google: "Sí", estado: "Activo" },
        { id: 4, nombre: "Ana Martínez", email: "ana@parqueo-ya.com", rol: "Empleado", google: "No", estado: "Inactivo" },
    ]);

    const [nuevoUsuario, setNuevoUsuario] = useState({
        id: null,
        nombre: "",
        email: "",
        rol: "Empleado",
        password: ""
    });

    const [modoEdicion, setModoEdicion] = useState(false);

    const crearOActualizarEmpleado = () => {
        if (modoEdicion) {
            setUsuarios(usuarios.map(u => u.id === nuevoUsuario.id ? { ...u, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email, rol: nuevoUsuario.rol } : u));
            alert(`Usuario ${nuevoUsuario.nombre} actualizado (Mock Frontend)`);
        } else {
            const nuevoId = Math.max(...usuarios.map(u => u.id)) + 1;
            setUsuarios([...usuarios, { ...nuevoUsuario, id: nuevoId, google: "No", estado: "Activo" }]);
            alert(`Usuario ${nuevoUsuario.nombre} creado (Mock Frontend)`);
        }
        
        setNuevoUsuario({ id: null, nombre: "", email: "", rol: "Empleado", password: "" });
        setMostrarFormulario(false);
        setModoEdicion(false);
    };

    const iniciarEdicion = (usuario) => {
        setNuevoUsuario({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            password: "" // Se deja en blanco por seguridad
        });
        setModoEdicion(true);
        setMostrarFormulario(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleEstado = (id) => {
        setUsuarios(usuarios.map(u => {
            if (u.id === id) {
                const nuevoEstado = u.estado === "Activo" ? "Inactivo" : "Activo";
                alert(`Usuario ${u.nombre} marcado como ${nuevoEstado} (Mock Frontend)`);
                return { ...u, estado: nuevoEstado };
            }
            return u;
        }));
    };

    const resetearPassword = (nombre) => {
         alert(`Se ha enviado un enlace de recuperación a ${nombre} (Mock Frontend)`);
    };

    const cancelarFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
        if (mostrarFormulario) {
            setModoEdicion(false);
            setNuevoUsuario({ id: null, nombre: "", email: "", rol: "Empleado", password: "" });
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
                    <UsuariosTable 
                        usuarios={usuarios} 
                        onEdit={iniciarEdicion}
                        onToggleStatus={toggleEstado}
                        onResetPassword={resetearPassword}
                    />
                </div>
            </div>
        </div>
    );
}