// app/usuarios/page.js
import { Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Usuarios } from '@/components/usuarios/Usuarios';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function UsuariosPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 flex flex-col">
                <LoginHeader />

                <main className="flex-1">
                    <Suspense>
                        <Usuarios />
                    </Suspense>
                </main>

                <LoginFooter />
            </div>
        </Layout>
    );
}