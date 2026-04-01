'use client';

import { useState } from 'react';
import Link from 'next/link';

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Solicitud de recuperación para:', email);
        setIsSubmitted(true);
    };

    return (
        <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                    Recuperar Clave
                </h2>
                <div className="h-1 w-12 bg-primary mt-2"></div>
                <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400 uppercase leading-relaxed">
                    Ingresa tu correo para recibir instrucciones de restablecimiento.
                </p>
            </div>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10"
                            id="email"
                            type="email"
                            placeholder="usuario@dominio.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            className="w-full bg-primary hover:bg-[#0a4548] text-white font-bold py-3 text-sm uppercase tracking-wider transition-colors"
                            type="submit"
                        >
                            Enviar Instrucciones
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        Si <strong>{email}</strong> está en nuestra base de datos, recibirás un correo en breve.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 text-[10px] uppercase text-primary font-bold hover:underline"
                    >
                        Intentar con otro correo
                    </button>
                </div>
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