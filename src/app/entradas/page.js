// app/entradas/page.js
import { Layout } from '@/components/layout/Layout';
import { Entradas } from '@/components/entradas/Entradas';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function EntradasPage() {
    return (
        <Layout>
            <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
                <LoginHeader />
                <main className="flex-1">
                    <Entradas />
                </main>
                <LoginFooter />
            </div>
        </Layout>
    );
}