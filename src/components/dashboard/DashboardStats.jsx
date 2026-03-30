// components/dashboard/DashboardStats.jsx
export function DashboardStats() {
    const stats = {
        total: 100,
        ocupados: 35,
        disponibles: 65
    };

    return (
        <table className="w-full border-collapse mb-[30px] border border-black">
            <thead>
            <tr className="bg-gray-300">
                <th className="border border-black p-2.5 text-sm text-left">
                    CUPOS TOTALES
                </th>
                <th className="border border-black p-2.5 text-sm text-left">
                    CUPOS OCUPADOS
                </th>
                <th className="border border-black p-2.5 text-sm text-left">
                    CUPOS DISPONIBLES
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="border border-black p-2.5 text-2xl font-bold">
                    {stats.total}
                </td>
                <td className="border border-black p-2.5 text-2xl font-bold text-primary">
                    {stats.ocupados}
                </td>
                <td className="border border-black p-2.5 text-2xl font-bold text-green-700">
                    {stats.disponibles}
                </td>
            </tr>
            </tbody>
        </table>
    );
}