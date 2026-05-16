// components/facturacion/FacturacionPrintButton.jsx
'use client';

export function FacturacionPrintButton() {
    const handleImprimir = () => {
        window.print();
    };

    return (
        <div className="mt-5">
            <button
                onClick={handleImprimir}
                className="py-3 px-[30px] bg-primary text-white border border-black text-sm font-bold cursor-pointer hover:bg-primary-dark transition-colors"
            >
                IMPRIMIR FACTURA
            </button>
        </div>
    );
}