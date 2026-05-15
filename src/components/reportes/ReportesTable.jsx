// components/reportes/ReportesTable.jsx
import { ReportesTableRow } from './ReportesTableRow';

export function ReportesTable({ historico }) {
    return (
        <>
            <div className="p-2.5 bg-gray-300 border border-black text-sm font-bold mb-2.5">
                HISTORIAL
            </div>
            <table className="w-full border-collapse border border-black">
                <thead>
                <tr className="bg-gray-300">
                    <th className="border border-black p-2.5 text-sm text-left">PLACA</th>
                    <th className="border border-black p-2.5 text-sm text-left">FECHA ENTRADA</th>
                    <th className="border border-black p-2.5 text-sm text-left">FECHA SALIDA</th>
                    <th className="border border-black p-2.5 text-sm text-left">CUPO USADO</th>
                    <th className="border border-black p-2.5 text-sm text-left">MONTO PAGADO</th>
                </tr>
                </thead>
                <tbody>
                {historico.map((registro, idx) => (
                    <ReportesTableRow key={idx} registro={registro} />
                ))}
                </tbody>
            </table>
        </>
    );
}