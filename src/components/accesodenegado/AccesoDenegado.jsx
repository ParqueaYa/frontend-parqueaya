// src/components/accesodenegado/AccesoDenegado.jsx
import Link from 'next/link';

export function AccesoDenegado() {
    return (
        <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-8 shadow-sm">

            {/* Título: Mismo estilo que 'Acceso Usuarios' */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                    Acceso Denegado
                </h2>
                {/* Línea decorativa 'primary' idéntica al Login */}
                <div className="h-1 w-12 bg-primary mt-2"></div>
            </div>

            <div className="py-4 text-center">
                {/* Icono de Material Symbols: Lock Person */}
                <div className="mb-6 flex justify-center">
          <span className="material-symbols-outlined text-[80px] text-primary leading-none">
            lock_person
          </span>
                </div>

                <div className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                    ¡Alto ahí!
                </div>

                <div className="text-sm text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
                    No tienes permisos para acceder a esta página. <br/>
                    Contacta con el administrador del sistema.
                </div>

                {/* Botón: Idéntico al de 'Iniciar Sesión' */}
                <Link href="/" className="no-underline">
                    <button
                        className="w-full bg-primary hover:bg-[#0a4548] text-white font-bold py-3 text-sm uppercase tracking-wider transition-colors"
                    >
                        VOLVER AL INICIO
                    </button>
                </Link>
            </div>

            {/* Footer de la tarjeta: Coincide con el Login */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                    Sistema de Gestión ParqueaYa
                </p>
            </div>
        </div>
    );
}