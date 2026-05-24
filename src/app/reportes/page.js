import { Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Reportes } from '@/components/reportes/Reportes';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';


export const metadata = {
    title: 'Reportes y Auditoría | ParqueaYa',
    description: 'Gestión financiera y revisión de movimientos del parqueadero',
};

export default function ReportesPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 flex flex-col">
                <LoginHeader />

                <main className="flex-1">
                    <Suspense>
                        <Reportes />
                    </Suspense>
                </main>

                <LoginFooter />
            </div>
        </Layout>
    );
}
