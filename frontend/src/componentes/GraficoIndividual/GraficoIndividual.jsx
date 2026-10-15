import React from 'react';
import './GraficoIndividual.css';

export function GraficoIndividual({ proceso }) {
  if (!proceso) {
    return (
      <div className="grafico-individual-container placeholder">
        <div className="placeholder-content">
          <span className="icono-cursor">👆</span>
          <p>Selecciona un proceso de la lista para ver su rendimiento detallado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grafico-individual-container">
      <div className="header-inspeccion">
        <h4 className="titulo-inspeccion">Inspección de Proceso</h4>
        <span className="badge-activo">Activo</span>
      </div>

      <div className="detalles-proceso">
        <div className="fila-detalle">
          <span className="label">Nombre:</span>
          <span className="valor-nombre">{proceso.name}</span>
        </div>
        <div className="fila-detalle">
          <span className="label">PIDs Asociados:</span>
          <span className="valor-pids font-mono">
            {proceso.pids ? proceso.pids.join(', ') : 'N/A'}
          </span>
        </div>
      </div>

      {/* Gráficos de barras individuales con estilo profesional */}
      <div className="metricas-grafico-box">
        {/* Barra CPU Proceso */}
        <div className="barra-grupo">
          <div className="barra-info">
            <span>Uso de CPU</span>
            <span className="cpu-valor font-mono">{proceso.cpu_percent}%</span>
          </div>
          <div className="barra-fondo">
            <div 
              className="barra-fill cpu-fill" 
              style={{ width: `${Math.min(proceso.cpu_percent, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Barra RAM Proceso */}
        <div className="barra-grupo">
          <div className="barra-info">
            <span>Uso de Memoria RAM</span>
            <span className="ram-valor font-mono">{proceso.memory_percent}%</span>
          </div>
          <div className="barra-fondo">
            <div 
              className="barra-fill ram-fill" 
              style={{ width: `${Math.min(proceso.memory_percent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

//por ahora lo dejamos como barras, proximamente incluimos otros tipos de graficos. Hay que descagar dependencias, despues buscamos