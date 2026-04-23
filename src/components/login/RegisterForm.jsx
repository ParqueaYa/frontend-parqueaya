'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import authService from '@/services/authService';

const EyeIcon = ({ visible }) => (
    visible ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
    ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    )
);

export const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const passwordsMatch = formData.password === formData.confirmPassword;
    const showMatchMessage = formData.confirmPassword.length > 0;
    const isFormComplete = Object.values(formData).every(value => value.trim() !== '');
    const isButtonDisabled = !isFormComplete || !passwordsMatch || loading;

    const [errorMsg, setErrorMsg] = useState('');

    const handleGoogleRegister = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setErrorMsg('');
            try {
                const data = await authService.loginGoogle(tokenResponse.access_token);
                authService.guardarSesion(data);
                router.push('/dashboard');
            } catch (error) {
                setErrorMsg(error?.response?.data?.message || 'Error al registrarse con Google.');
            } finally {
                setLoading(false);
            }
        },
        onError: () => setErrorMsg('Login con Google falló. Intente nuevamente.'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isButtonDisabled) return;
        setLoading(true);
        setErrorMsg('');
        try {
            const data = await authService.register({
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
            });
            authService.guardarSesion(data);
            router.push('/dashboard');
        } catch (error) {
            const status = error?.response?.status;
            if (status === 409) {
                setErrorMsg('Ya existe una cuenta con ese correo electrónico.');
            } else if (status === 400) {
                setErrorMsg(error?.response?.data?.message || 'Datos inválidos. Revise el formulario.');
            } else {
                setErrorMsg('No se pudo conectar al servidor. Intente más tarde.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-8 shadow-lg">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                    Crear Cuenta
                </h2>
                <div className="h-1 w-12 bg-primary mt-2"></div>
            </div>

            {errorMsg && (
                <div className="mb-4 text-xs font-bold px-4 py-3 border bg-red-500/10 border-red-500/30 text-red-400 tracking-wide">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Nombre completo</label>
                    <input
                        name="nombre"
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez"
                        className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10"
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Correo electrónico</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="usuario@dominio.com"
                        className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10"
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Contraseña</label>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            className="form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-0 h-10 pr-10"
                            onChange={handleChange}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                            <EyeIcon visible={showPassword} />
                        </button>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Confirmar contraseña</label>
                        {showMatchMessage && (
                            <span className={`text-[10px] font-bold uppercase ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordsMatch ? '✓ Coinciden' : '✗ No coinciden'}
                            </span>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            className={`form-input block w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-0 h-10 pr-10 transition-colors ${
                                showMatchMessage ? (passwordsMatch ? 'border-green-500' : 'border-red-500') : 'focus:border-primary'
                            }`}
                            onChange={handleChange}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                            <EyeIcon visible={showConfirmPassword} />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`w-full font-bold py-3 text-sm uppercase tracking-wider transition-all mt-2 text-white ${
                        isButtonDisabled
                            ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed border-transparent'
                            : 'bg-primary hover:bg-[#0a4548] shadow-md active:transform active:scale-[0.98]'
                    }`}
                >
                    {loading ? 'Cargando...' : 'Registrarse'}
                </button>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">O regístrate con</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => handleGoogleRegister()}
                    disabled={loading}
                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 uppercase">
                    ¿Ya tiene una cuenta?
                    <Link href="/" className="text-primary font-bold hover:underline ml-1 tracking-tight">
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};