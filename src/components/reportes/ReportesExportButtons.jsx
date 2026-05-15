'use client';

export function ReportesExportButtons() {
    const exportarPDF = () => {
        alert("Generando motor de exportación PDF... Por favor espere.");
    };

    const exportarExcel = () => {
        alert("Preparando datos para Excel (XLSX)...");
    };

    return (
        <div className="flex flex-wrap gap-4 mb-8">
            <button
                onClick={exportarPDF}
                className="group flex items-center gap-3 py-3 px-6 bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-xl"
            >
                <div className="w-8 h-8 bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-red-500 group-hover:text-white text-lg">picture_as_pdf</span>
                </div>
                <div className="text-left">
                    <span className="block text-[10px] font-black text-slate-100 uppercase tracking-widest">Documento PDF</span>
                    <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Reporte Consolidado</span>
                </div>
            </button>
            
            <button
                onClick={exportarExcel}
                className="group flex items-center gap-3 py-3 px-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl"
            >
                <div className="w-8 h-8 bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-emerald-500 group-hover:text-white text-lg">table_view</span>
                </div>
                <div className="text-left">
                    <span className="block text-[10px] font-black text-slate-100 uppercase tracking-widest">Hoja Excel</span>
                    <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Análisis de Datos</span>
                </div>
            </button>
            
            <div className="flex-1" />
            
            <button
                onClick={() => window.print()}
                className="hidden md:flex items-center gap-3 py-3 px-6 bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl"
            >
                <div className="w-8 h-8 bg-amber-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-500 text-lg">print</span>
                </div>
                <div className="text-left">
                    <span className="block text-[10px] font-black text-slate-100 uppercase tracking-widest">Imprimir</span>
                    <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Copia Física</span>
                </div>
            </button>
        </div>
    );
}
