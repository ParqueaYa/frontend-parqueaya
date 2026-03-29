import './globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
    title: 'Iniciar Sesión - ParqueaYa',
    description: 'Sistema de gestión de estacionamiento',
};

export default function RootLayout({ children }) {
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
        {/* Envolvemos TODA la aplicación con el Provider de Google */}
        <GoogleOAuthProvider clientId="PONER_AQUI_CLIENT_ID_DE_GOOGLE_CONSOLA">
            {children}
        </GoogleOAuthProvider>
        </body>
        </html>
    );
}