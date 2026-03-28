// src/app/acceso-denegado/page.js
import { AccesoDenegado } from '@/components/accesodenegado/AccesoDenegado';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function AccesoDenegadoPage() {
    return (
        // CAMBIADO: body por div para evitar el error de hidratación
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <LoginHeader />
            <main className="flex-1 flex items-center justify-center p-4">
                <AccesoDenegado />
            </main>
            <LoginFooter />
        </div>
    );
}