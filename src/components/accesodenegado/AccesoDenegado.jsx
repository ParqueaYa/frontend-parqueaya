// components/AccesoDenegado.jsx
import Link from "next/link"; // ← Corregido: importación de Next.js

export function AccesoDenegado() {
    return (
        <div className="p-5">
            {/* Title */}
            <div className="p-3 bg-primary border border-black mb-5">
                <h1 className="m-0 text-lg text-white">ACCESO DENEGADO</h1>
            </div>

            <div className="py-[60px] px-10 text-center">
                <div className="text-7xl font-bold text-red-600 mb-5">
                    ⛔
                </div>
                <div className="text-2xl font-bold mb-4">
                    ACCESO DENEGADO
                </div>
                <div className="text-base text-gray-500 mb-10">
                    No tienes permisos para acceder a esta página.
                </div>
                <Link href="/public" className="no-underline"> {/* ← Corregido: href en lugar de to */}
                    <button
                        className="py-3 px-[30px] bg-primary text-white border border-black text-sm font-bold cursor-pointer hover:bg-primary-dark transition-colors"
                    >
                        VOLVER AL DASHBOARD
                    </button>
                </Link>
            </div>
        </div>
    );
}