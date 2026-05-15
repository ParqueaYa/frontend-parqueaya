// app/reportes/page.js
import { Layout } from '@/components/layout/Layout';
import { Reportes } from '@/components/reportes/Reportes';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function ReportesPage() {
    return (
        <Layout>
            <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
                <LoginHeader />
                <main className="flex-1">
                    <Reportes />
                </main>
                <LoginFooter />
            </div>
        </Layout >
    );
}