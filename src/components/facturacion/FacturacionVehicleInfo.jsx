// components/facturacion/FacturacionVehicleInfo.jsx
export function FacturacionVehicleInfo() {
    return (
        <>
            <div className="p-2 bg-gray-300 border border-black text-sm font-bold mb-2.5">
                DATOS DEL VEHÍCULO
            </div>
            <table className="w-full border-collapse border border-black">
                <tbody>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 w-[200px] text-sm font-bold">
                        PLACA:
                    </td>
                    <td className="border border-black p-2.5 text-sm">
                        XYZ789
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 text-sm font-bold">
                        HORA ENTRADA:
                    </td>
                    <td className="border border-black p-2.5 text-sm">
                        07/03/2026 09:15
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 text-sm font-bold">
                        HORA SALIDA:
                    </td>
                    <td className="border border-black p-2.5 text-sm">
                        07/03/2026 14:45
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 text-sm font-bold">
                        TIEMPO TOTAL:
                    </td>
                    <td className="border border-black p-2.5 text-sm">
                        5 horas 30 minutos
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 text-sm font-bold">
                        TARIFA APLICADA:
                    </td>
                    <td className="border border-black p-2.5 text-sm">
                        $2,000 / hora (Moto)
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}