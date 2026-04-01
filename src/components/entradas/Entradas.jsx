// components/entradas/Entradas.jsx (o donde agrupes los componentes)
import { EntradasTitle } from "./EntradasTitle";
import { EntradasForm } from "./EntradasForm";
import { EntradasValidation } from "./EntradasValidation";

export function Entradas() {
    return (
        <div className="w-full px-4 py-8 flex flex-col items-center">
            {/* Contenedor con ancho fijo que agrupa todo al centro */}
            <div className="w-full max-w-[800px]">
                <EntradasTitle />

                <div className="shadow-2xl shadow-orange-950/10">
                    <EntradasForm />
                    <EntradasValidation />
                </div>
            </div>
        </div>
    );
}