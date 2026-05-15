// components/reportes/ReportesExportButtons.jsx
'use client';

export function ReportesExportButtons() {
    const exportarPDF = () => {
        alert("Exportando reporte en formato PDF...");
    };

    const exportarExcel = () => {
        alert("Exportando reporte en formato Excel...");
    };

    return (
        <div className="mb-5 flex gap-2.5">
            <button
                onClick={exportarPDF}
                className="py-2.5 px-5 bg-primary text-white border border-black text-sm font-bold cursor-pointer hover:bg-primary-dark transition-colors"
            >
                EXPORTAR PDF
            </button>
            <button
                onClick={exportarExcel}
                className="py-2.5 px-5 bg-green-700 text-white border border-black text-sm font-bold cursor-pointer hover:bg-green-800 transition-colors"
            >
                EXPORTAR EXCEL
            </button>
        </div>
    );
}