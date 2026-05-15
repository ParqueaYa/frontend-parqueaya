// components/facturacion/Facturacion.jsx
import { FacturacionTitle } from './FacturacionTitle';
import { FacturacionHeader } from './FacturacionHeader';
import { FacturacionVehicleInfo } from './FacturacionVehicleInfo';
import { FacturacionTotal } from './FacturacionTotal';
import { FacturacionFooter } from './FacturacionFooter';
import { FacturacionPrintButton } from './FacturacionPrintButton';

export function Facturacion() {
    return (
        <div className="p-5">
            <FacturacionTitle />

            <div className="border-2 border-black p-[30px] bg-white max-w-[800px]">
                <FacturacionHeader />
                <div className="border-t-2 border-black mb-[30px]"></div>
                <FacturacionVehicleInfo />
                <div className="mb-[30px]">
                    <FacturacionTotal />
                </div>
                <FacturacionFooter />
            </div>

            <FacturacionPrintButton />
        </div>
    );
}