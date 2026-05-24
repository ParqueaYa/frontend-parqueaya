import { Layout } from '@/components/layout/Layout';

export const metadata = {
    title: 'Configuración | ParqueaYa',
    description: 'Ajustes generales del sistema ParqueaYa.',
};

export default function ConfiguracionPage() {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-1 bg-primary" />
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-slate-100">
                            Configuración
                        </h1>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                            Ajustes generales del sistema
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
                    {[
                        { icon: 'notifications', label: 'Notificaciones', desc: 'Configurar alertas y avisos del sistema' },
                        { icon: 'lock', label: 'Seguridad', desc: 'Cambiar contraseña y opciones de acceso' },
                        { icon: 'palette', label: 'Apariencia', desc: 'Modo claro, oscuro y preferencias visuales' },
                        { icon: 'backup', label: 'Respaldo', desc: 'Exportación y copia de seguridad de datos' },
                    ].map(({ icon, label, desc }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-primary/40 transition-colors group cursor-not-allowed opacity-60"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl text-primary">{icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
                                        {label}
                                    </p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-xl">chevron_right</span>
                        </div>
                    ))}

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                            <span className="material-symbols-outlined text-slate-400 text-xl">info</span>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                                La configuración avanzada estará disponible próximamente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
