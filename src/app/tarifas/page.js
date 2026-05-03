import { Layout } from '@/components/layout/Layout';
import { Tarifas } from '@/components/tarifas/Tarifas';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function TarifasPage() {
    return (
        <Layout>
            <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
                <LoginHeader />
                <main className="flex-1">
                    <Tarifas />
                </main>
                <LoginFooter />
            </div>
        </Layout>
    );
}
