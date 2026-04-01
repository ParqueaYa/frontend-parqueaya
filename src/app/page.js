// app/page.js
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';
import { LoginForm } from '@/components/login/LoginForm';

export default function Home() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <LoginHeader />
            <main className="flex-1 flex items-center justify-center p-4">
                <LoginForm />
            </main>
            <LoginFooter />
        </div>
    );
}