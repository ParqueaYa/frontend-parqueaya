import { RegisterForm } from "@/components/login/RegisterForm";
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';

export default function RegisterPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <LoginHeader />
            <main className="flex-1 flex items-center justify-center p-4">
                <RegisterForm />
            </main>
            <LoginFooter />
        </div>
    );
}