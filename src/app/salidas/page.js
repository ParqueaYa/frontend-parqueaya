// app/salidas/page.js
import { Layout } from '@/components/layout/Layout';
import { Salidas } from '@/components/salidas/Salidas';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function SalidasPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 flex flex-col">
                <LoginHeader />

                <main className="flex-1">
                    <Salidas />
                </main>

                <LoginFooter />
            </div>
        </Layout>
    );
}