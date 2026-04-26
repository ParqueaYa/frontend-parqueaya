import { Layout } from '@/components/layout/Layout';
import { Vehiculos } from '@/components/vehiculos/Vehiculos';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function VehiculosPage() {
    return (
        <Layout>
            <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
                <LoginHeader />
                <main className="flex-1">
                    <Vehiculos />
                </main>
                <LoginFooter />
            </div>
        </Layout>
    );
}
