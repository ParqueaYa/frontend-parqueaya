// components/dashboard/DashboardMovements.jsx
export function DashboardMovements() {
    const movimientos = [
        { placa: "ABC123", tipo: "Auto", cupo: "A-12", horaEntrada: "08:30", horaSalida: "10:45", estado: "Completado" },
        { placa: "XYZ789", tipo: "Moto", cupo: "M-5", horaEntrada: "09:15", horaSalida: "-", estado: "Dentro" },
        { placa: "LMN456", tipo: "Auto", cupo: "B-8", horaEntrada: "07:00", horaSalida: "16:30", estado: "Completado" },
        { placa: "QRS321", tipo: "Camioneta", cupo: "C-3", horaEntrada: "10:20", horaSalida: "-", estado: "Dentro" },
        { placa: "DEF654", tipo: "Auto", cupo: "A-25", horaEntrada: "06:45", horaSalida: "18:00", estado: "Completado" },
    ];

    return (
        <>
            <div className="p-2.5 bg-gray-300 border border-black text-sm font-bold mb-2.5">
                ÚLTIMOS MOVIMIENTOS
            </div>
            <table className="w-full border-collapse border border-black">
                <thead>
                <tr className="bg-gray-300">
                    <th className="border border-black p-2 text-sm text-left">PLACA</th>
                    <th className="border border-black p-2 text-sm text-left">TIPO</th>
                    <th className="border border-black p-2 text-sm text-left">CUPO</th>
                    <th className="border border-black p-2 text-sm text-left">HORA ENTRADA</th>
                    <th className="border border-black p-2 text-sm text-left">HORA SALIDA</th>
                    <th className="border border-black p-2 text-sm text-left">ESTADO</th>
                </tr>
                </thead>
                <tbody>
                {movimientos.map((mov, idx) => (
                    <tr key={idx}>
                        <td className="border border-black p-2 text-sm">{mov.placa}</td>
                        <td className="border border-black p-2 text-sm">{mov.tipo}</td>
                        <td className="border border-black p-2 text-sm">{mov.cupo}</td>
                        <td className="border border-black p-2 text-sm">{mov.horaEntrada}</td>
                        <td className="border border-black p-2 text-sm">{mov.horaSalida}</td>
                        <td className={`border border-black p-2 text-sm font-bold ${
                            mov.estado === "Dentro" ? "text-primary" : "text-green-700"
                        }`}>
                            {mov.estado}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}