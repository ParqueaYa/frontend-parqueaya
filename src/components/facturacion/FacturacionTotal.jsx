// components/facturacion/FacturacionTotal.jsx
export function FacturacionTotal() {
    return (
        <table className="w-full border-collapse border-2 border-black">
            <tbody>
            <tr>
                <td className="border border-black p-[15px] bg-gray-300 text-lg font-bold text-right">
                    TOTAL A PAGAR:
                </td>
                <td className="border border-black p-[15px] text-2xl font-bold text-primary text-right w-[200px]">
                    $12,000
                </td>
            </tr>
            </tbody>
        </table>
    );
}