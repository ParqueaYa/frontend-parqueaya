// components/reportes/ReportesStatistics.jsx
export function ReportesStatistics({ totalIngresos, totalVehiculos, tiempoPromedio }) {
    return (
        <div className="mb-[30px]">
            <div className="p-2.5 bg-gray-300 border border-black text-sm font-bold mb-2.5">
                ESTADÍSTICAS
            </div>
            <table className="w-full border-collapse border border-black">
                <tbody>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 w-[200px] text-sm font-bold">
                        TOTAL INGRESOS:
                    </td>
                    <td className="border border-black p-2.5 text-xl font-bold text-green-700">
                        ${totalIngresos.toLocaleString()}
                    </td>
                    <td className="border border-black p-2.5 bg-gray-300 w-[200px] text-sm font-bold">
                        TOTAL VEHÍCULOS:
                    </td>
                    <td className="border border-black p-2.5 text-xl font-bold text-primary">
                        {totalVehiculos}
                    </td>
                    <td className="border border-black p-2.5 bg-gray-300 w-[200px] text-sm font-bold">
                        TIEMPO PROMEDIO:
                    </td>
                    <td className="border border-black p-2.5 text-xl font-bold">
                        {tiempoPromedio}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}