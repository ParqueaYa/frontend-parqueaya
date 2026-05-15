// components/reportes/ReportesFilters.jsx
'use client';

export function ReportesFilters({ fechaInicio, setFechaInicio, fechaFin, setFechaFin, tipoVehiculo, setTipoVehiculo }) {
    return (
        <div className="mb-[30px]">
            <div className="p-2.5 bg-gray-300 border border-black text-sm font-bold mb-2.5">
                FILTROS
            </div>
            <table className="border-collapse border border-black">
                <tbody>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 w-[180px] text-sm font-bold">
                        FECHA INICIO:
                    </td>
                    <td className="border border-black p-1">
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="w-[200px] p-2 border border-black text-sm"
                        />
                    </td>
                    <td className="border border-black p-2.5 bg-gray-300 w-[180px] text-sm font-bold">
                        FECHA FIN:
                    </td>
                    <td className="border border-black p-1">
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="w-[200px] p-2 border border-black text-sm"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2.5 bg-gray-300 text-sm font-bold">
                        TIPO VEHÍCULO:
                    </td>
                    <td className="border border-black p-1" colSpan={3}>
                        <select
                            value={tipoVehiculo}
                            onChange={(e) => setTipoVehiculo(e.target.value)}
                            className="w-[200px] p-2 border border-black text-sm"
                        >
                            <option value="todos">Todos</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                            <option value="camioneta">Camioneta</option>
                            <option value="camion">Camión</option>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}