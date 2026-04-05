// app/logout/page.js
import { Logout } from '@/components/logout/Logout';
import { Layout } from '@/components/layout/Layout';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function LogoutPage() {
    return (        <Layout>
            <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
                <LoginHeader />
                <main className="flex-1">
                    <Logout />
                </main>
                <LoginFooter />
            </div>
        </Layout>
    );
}