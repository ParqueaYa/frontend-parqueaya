'use client';

import { useState, useEffect, useCallback } from 'react';
import vehiculoService from '@/services/vehiculoService';
import { VehiculosDentroTitle } from './VehiculosDentroTitle';
import { VehiculosDentroTable } from './VehiculosDentroTable';

export function VehiculosDentro() {
    const [registros, setRegistros]                 = useState([]);
    const [loading, setLoading]                     = useState(true);
    const [refreshing, setRefreshing]               = useState(false);
    const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
    const [tick, setTick]                           = useState(0);

    const cargar = useCallback(async ({ inicial = false } = {}) => {
        if (inicial) setLoading(true);
        else setRefreshing(true);
        try {
            const data = await vehiculoService.listarActivos();
            setRegistros(data ?? []);
            setUltimaActualizacion(new Date());
        } catch {
            // mantener la lista anterior si falla un refresco
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        cargar({ inicial: true });

        const tickInterval = setInterval(() => setTick((t) => t + 1), 60000);
        return () => clearInterval(tickInterval);
    }, [cargar]);

    return (
        <div className="w-full px-4 py-8">
            <VehiculosDentroTitle
                total={registros.length}
                ultimaActualizacion={ultimaActualizacion}
                refreshing={refreshing}
                onRefrescar={() => cargar()}
            />
            <VehiculosDentroTable
                registros={registros}
                loading={loading}
                tick={tick}
            />
        </div>
    );
}
