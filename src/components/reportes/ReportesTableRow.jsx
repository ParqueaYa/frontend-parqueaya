// components/reportes/ReportesTableRow.jsx
export function ReportesTableRow({ registro }) {
    return (
        <tr>
            <td className="border border-black p-2 text-sm font-bold">
                {registro.placa}
            </td>
            <td className="border border-black p-2 text-sm">
                {registro.fechaEntrada}
            </td>
            <td className="border border-black p-2 text-sm">
                {registro.fechaSalida}
            </td>
            <td className="border border-black p-2 text-sm">
                {registro.cupo}
            </td>
            <td className="border border-black p-2 text-sm font-bold text-green-700">
                {registro.monto}
            </td>
        </tr>
    );
}