// components/login/LoginHeader.jsx
export const LoginHeader = () => {
    return (
        <header className="border-b border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">
            local_parking
          </span>
                    <h1 className="text-xl font-bold tracking-tight uppercase">
                        ParqueaYa
                    </h1>
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                    Sistema de Gestión v1.0
                </div>
            </div>
        </header>
    );
};