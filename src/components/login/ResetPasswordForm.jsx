'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';

export const ResetPasswordForm = ({ initialToken }) => {
    const router = useRouter();
    const [token, setToken] = useState(initialToken || '');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Backup: capture token from URL in client side just in case it wasn't passed via props
    useEffect(() => {
        if (!token && typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get('token');
            if (urlToken) setToken(urlToken);
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!token) {
            setError('No se encontró un token válido para restablecer la contraseña.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        
        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setIsLoading(true);
        try {
            await authService.resetPassword(token, newPassword);
            setIsSuccess(true);
            
            // Redirect after a brief success message
            setTimeout(() => {
                router.push('/');
            }, 3000);
            
        } catch (err) {
            console.error('Error restableciendo contraseña:', err);
            setError(err?.response?.data?.message || 'Error al restablecer la contraseña. Es posible que el token sea inválido o haya expirado.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                    Nueva Contraseña
                </h2>
                <div className="h-1 w-12 bg-primary mt-2"></div>
                <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400 uppercase leading-relaxed">
                    Ingresa tu nueva clave para el sistema ParqueaYa.
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
                        <div className="bg-red-50 dark:bg-red-900/30 p-3 border border-red-200 dark:border-red-800">
                            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                                {error}
                            </p>
                        </div>
                    )}
                    
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400" htmlFor="newPassword">
                            Nueva Contraseña
                        </label>
                        <input
                            className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10"
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
                            className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10"
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
                    ¿Recordó su clave?
                    <Link className="text-primary font-bold hover:underline ml-1 tracking-tight" href="/">
                        Volver al inicio
                    </Link>
                </p>
            </div>
        </div>
    );
};
