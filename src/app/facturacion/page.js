// app/facturacion/page.js
import { Layout } from '@/components/layout/Layout';
import { Facturacion } from '@/components/facturacion/Facturacion';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function FacturacionPage() {
    return (
        <Layout>
            <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
                <LoginHeader />
                <main className="flex-1">
                    <Facturacion />
                </main>
                <LoginFooter />
            </div>
        </Layout>
    );
}