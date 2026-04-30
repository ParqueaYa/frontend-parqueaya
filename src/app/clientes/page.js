import { Layout } from '@/components/layout/Layout';
import { Clientes } from '@/components/clientes/Clientes';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function ClientesPage() {
    return (
        <Layout>
            <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
                <LoginHeader />
                <main className="flex-1">
                    <Clientes />
                </main>
                <LoginFooter />
            </div>
        </Layout>
    );
}
