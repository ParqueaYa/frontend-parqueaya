// components/reportes/Reportes.jsx
'use client';

import { useState } from "react";
import { ReportesTitle } from './ReportesTitle';
import { ReportesFilters } from './ReportesFilters';
import { ReportesStatistics } from './ReportesStatistics';
import { ReportesExportButtons } from './ReportesExportButtons';
import { ReportesTable } from './ReportesTable';

export function Reportes() {
    const [fechaInicio, setFechaInicio] = useState("2026-03-01");
    const [fechaFin, setFechaFin] = useState("2026-03-07");
    const [tipoVehiculo, setTipoVehiculo] = useState("todos");

    const historico = [
        { placa: "ABC123", fechaEntrada: "2026-03-01 08:30", fechaSalida: "2026-03-01 10:45", cupo: "A-12", monto: "$6,000" },
        { placa: "LMN456", fechaEntrada: "2026-03-01 07:00", fechaSalida: "2026-03-01 16:30", cupo: "B-8", monto: "$30,000" },
        { placa: "DEF654", fechaEntrada: "2026-03-02 06:45", fechaSalida: "2026-03-02 18:00", cupo: "A-25", monto: "$36,000" },
        { placa: "GHI789", fechaEntrada: "2026-03-03 09:00", fechaSalida: "2026-03-03 13:30", cupo: "M-3", monto: "$10,000" },
        { placa: "JKL321", fechaEntrada: "2026-03-04 10:15", fechaSalida: "2026-03-04 19:45", cupo: "C-5", monto: "$50,000" },
        { placa: "MNO654", fechaEntrada: "2026-03-05 08:00", fechaSalida: "2026-03-05 12:00", cupo: "A-7", monto: "$12,000" },
        { placa: "PQR987", fechaEntrada: "2026-03-06 14:30", fechaSalida: "2026-03-06 20:00", cupo: "B-12", monto: "$22,000" },
    ];

    const totalIngresos = 166000;
    const totalVehiculos = 7;
    const tiempoPromedio = "6h 30m";

    return (
        <div className="p-5">
            <ReportesTitle />
            <ReportesFilters
                fechaInicio={fechaInicio}
                setFechaInicio={setFechaInicio}
                fechaFin={fechaFin}
                setFechaFin={setFechaFin}
                tipoVehiculo={tipoVehiculo}
                setTipoVehiculo={setTipoVehiculo}
            />
            <ReportesStatistics
                totalIngresos={totalIngresos}
                totalVehiculos={totalVehiculos}
                tiempoPromedio={tiempoPromedio}
            />
            <ReportesExportButtons />
            <ReportesTable historico={historico} />
        </div>
    );
}