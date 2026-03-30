import './globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
    title: 'Iniciar Sesión - ParqueaYa',
    description: 'Sistema de gestión de estacionamiento',
};

export default function RootLayout({ children }) {
    // Definimos la constante que lee el ID desde tu archivo .env.local
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    return (
        <html lang="es">
        <head>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
                rel="stylesheet"
            />
        </head>
        <body>
        {/* Usamos la variable clientId para mayor seguridad */}
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
        </body>
        </html>
    );
}