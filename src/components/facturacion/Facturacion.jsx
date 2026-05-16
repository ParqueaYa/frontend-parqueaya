'use client';

import { useState } from 'react';
import { FacturacionTitle } from './FacturacionTitle';
import { FacturacionGenerar } from './FacturacionGenerar';
import { FacturacionHistorial } from './FacturacionHistorial';

export function Facturacion() {
    const [tab, setTab] = useState('generar');

    return (
        <div className="w-full px-4 py-8">
            <FacturacionTitle />

            <div className="flex gap-1 mb-6 border-b border-slate-800">
                <button
                    onClick={() => setTab('generar')}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                        tab === 'generar'
                            ? 'text-primary border-b-2 border-primary bg-primary/5'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                    Generar Factura
                </button>
                <button
                    onClick={() => setTab('historial')}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                        tab === 'historial'
                            ? 'text-primary border-b-2 border-primary bg-primary/5'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                    Consultar Historial
                </button>
            </div>

            <div>
                {tab === 'generar' && <FacturacionGenerar />}
                {tab === 'historial' && <FacturacionHistorial />}
            </div>
        </div>
    );
}