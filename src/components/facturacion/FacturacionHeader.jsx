// components/facturacion/FacturacionHeader.jsx
export function FacturacionHeader() {
    return (
        <table className="w-full border-collapse mb-[30px]">
            <tbody>
            <tr>
                <td className="w-[60%]">
                    <div className="text-2xl font-bold mb-2.5">ParqueoYa</div>
                    <div className="text-sm mb-1">NIT: 900.123.456-7</div>
                    <div className="text-sm mb-1">Dirección: Calle 123 # 45-67</div>
                    <div className="text-sm">Teléfono: (601) 234-5678</div>
                </td>
                <td className="w-[40%] text-right align-top">
                    <div className="border-2 border-black p-[15px] bg-gray-300">
                        <div className="text-lg font-bold mb-1">FACTURA</div>
                        <div className="text-sm mb-1">No. 00001234</div>
                        <div className="text-sm">Fecha: 07/03/2026</div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    );
}