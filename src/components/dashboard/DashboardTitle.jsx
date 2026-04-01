// components/dashboard/DashboardTitle.jsx
export function DashboardTitle() {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-6 mb-1 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>

            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tighter italic">
                    Dash<span className="text-primary font-black">board</span>
                </h1>
                <div className="flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-slate-200 dark:bg-slate-700"></div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        Panel de Control General
                    </span>
                </div>
            </div>
        </div>
    );
}