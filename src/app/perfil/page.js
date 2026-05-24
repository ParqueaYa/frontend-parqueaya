import { Layout } from '@/components/layout/Layout';

export const metadata = {
    title: 'Mi Perfil | ParqueaYa',
    description: 'Información y configuración de tu cuenta de usuario en ParqueaYa.',
};

export default function PerfilPage() {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-1 bg-primary" />
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-slate-100">
                            Mi Perfil
                        </h1>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                            Información de tu cuenta
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                        <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl text-primary">account_circle</span>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                Usuario del Sistema
                            </p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                                ParqueaYa
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                            <span className="material-symbols-outlined text-slate-400 text-xl">info</span>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                                La edición del perfil estará disponible próximamente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
