'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginHeader } from '@/components/login/LoginHeader';
import { LoginFooter } from '@/components/login/LoginFooter';
import authService from '@/services/authService';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Captura automática del token usando useSearchParams
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validación inicial
        if (!token) {
            setError('No se proporcionó un token válido. Por favor, solicita un nuevo enlace de restablecimiento.');
            return;
        }

        // Validación de coincidencia de contraseñas
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.');
            return;
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setIsLoading(true);
        try {
            // Envío del token y la nueva contraseña al backend
            await authService.resetPassword(token, newPassword);
            setIsSuccess(true);
            
            // Redirección exitosa tras 3 segundos
            setTimeout(() => {
                router.push('/');
            }, 3000);
            
        } catch (err) {
            console.error('Error al restablecer la contraseña:', err);
            // Feedback con mensaje naranja si el token es inválido o expiró
            setError('El enlace es inválido o ha expirado. Por favor, solicita restablecer tu contraseña nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                    Restablecer Contraseña
                </h2>
                <div className="h-1 w-12 bg-primary mt-2"></div>
                <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400 uppercase leading-relaxed">
                    Ingresa y confirma tu nueva clave de acceso para ParqueaYa.
                </p>
            </div>

            {isSuccess ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 border border-emerald-200 dark:border-emerald-800">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                        ¡Contraseña actualizada exitosamente!
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                        Serás redirigido al inicio de sesión en unos segundos...
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 text-[10px] uppercase text-emerald-700 dark:text-emerald-300 font-bold hover:underline"
                    >
                        Ir al login ahora
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 border border-orange-200 dark:border-orange-800">
                            <p className="text-sm text-orange-700 dark:text-orange-400 font-bold uppercase tracking-tight">
                                ¡Atención!
                            </p>
                            <p className="text-xs text-orange-600 dark:text-orange-300 mt-2 leading-relaxed">
                                {error}
                            </p>
                            <Link 
                                href="/auth/forgot-password" 
                                className="inline-block mt-3 text-[10px] uppercase text-orange-700 dark:text-orange-400 font-bold hover:underline tracking-widest"
                            >
                                Solicitar nuevo correo 👉
                            </Link>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400" htmlFor="newPassword">
                            Nueva Contraseña
                        </label>
                        <input
                            className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10 text-slate-900 dark:text-slate-100"
                            id="newPassword"
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400" htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>
                        <input
                            className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10 text-slate-900 dark:text-slate-100"
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            className="w-full bg-primary hover:bg-[#0a4548] text-white font-bold py-3 text-sm uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </button>
                    </div>
                </form>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 uppercase">
                    ¿Recordaste tu clave?
                    <Link className="text-primary font-bold hover:underline ml-1 tracking-tight" href="/">
                        Volver al inicio
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <LoginHeader />
            <main className="flex-1 flex items-center justify-center p-4">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 tracking-widest uppercase">Cargando...</p>
                    </div>
                }>
                    <ResetPasswordContent />
                </Suspense>
            </main>
            <LoginFooter />
        </div>
    );
}
