// app/layout.js
import './globals.css';

export const metadata = {
    title: 'Iniciar Sesión - ParqueaYa',
    description: 'Sistema de gestión de estacionamiento',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
                rel="stylesheet"
            />
        </head>
        <body> {/* <--- ESTA ES LA CLAVE */}
        {children}
        </body>
        </html>
    );
}