import React, { useState } from 'react';
import './PoligonoRecursos.css';

export const PoligonoRecursos = ({ historial = [], umbralAdvertencia = 80, umbralCritico = 90 }) => {
  const [metricaSeleccionada, setMetricaSeleccionada] = useState('ambas'); 
  const [puntoHover, setPuntoHover] = useState(null);

  const cantidadMuestras = historial.length;
  const cpuValores = historial.map(m => m.cpu);
  const ramValores = historial.map(m => m.ram);

  const cpuActual = cantidadMuestras > 0 ? cpuValores[cantidadMuestras - 1] : 0;
  const ramActual = cantidadMuestras > 0 ? ramValores[cantidadMuestras - 1] : 0;

  const cpuMax = cantidadMuestras > 0 ? Math.max(...cpuValores) : 0;
  const ramMax = cantidadMuestras > 0 ? Math.max(...ramValores) : 0;

  const cpuPromedio = cantidadMuestras > 0 ? (cpuValores.reduce((a, b) => a + b, 0) / cantidadMuestras).toFixed(1) : 0;
  const ramPromedio = cantidadMuestras > 0 ? (ramValores.reduce((a, b) => a + b, 0) / cantidadMuestras).toFixed(1) : 0;

  // Dimensiones del SVG
  const width = 360;
  const height = 160;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const getX = (index) => {
    if (cantidadMuestras <= 1) return padding;
    return padding + (index / (cantidadMuestras - 1)) * chartWidth;
  };

  const getY = (value) => {
    const clamped = Math.max(0, Math.min(100, value));
    return height - padding - (clamped / 100) * chartHeight;
  };

  const puntosCpu = historial.map((m, i) => `${getX(i)},${getY(m.cpu)}`).join(' ');
  const puntosRam = historial.map((m, i) => `${getX(i)},${getY(m.ram)}`).join(' ');

  // Coordenadas para cerrar el área bajo la curva para el gradiente
  const areaCpu = cantidadMuestras > 0 ? `${getX(0)},${height - padding} ${puntosCpu} ${getX(cantidadMuestras - 1)},${height - padding}` : '';
  const areaRam = cantidadMuestras > 0 ? `${getX(0)},${height - padding} ${puntosRam} ${getX(cantidadMuestras - 1)},${height - padding}` : '';

  // Horario inicial y final para el eje X de referencia
  const horaInicio = cantidadMuestras > 0 ? historial[0].time : '';
  const horaFin = cantidadMuestras > 0 ? historial[cantidadMuestras - 1].time : '';

  return (
    <div className="card-poligono">
      <div className="poligono-header">
        <div>
          <h4>Polígono de Consumo - General</h4>
          <p className="sub-poligono">Historial optimizado (últimas {cantidadMuestras}/30 muestras)</p>
        </div>
        
        <div className="selector-metricas">
          <button className={metricaSeleccionada === 'cpu' ? 'activo' : ''} onClick={() => setMetricaSeleccionada('cpu')}>CPU</button>
          <button className={metricaSeleccionada === 'ram' ? 'activo' : ''} onClick={() => setMetricaSeleccionada('ram')}>RAM</button>
          <button className={metricaSeleccionada === 'ambas' ? 'activo' : ''} onClick={() => setMetricaSeleccionada('ambas')}>Ambas</button>
        </div>
      </div>

      <div className="grafico-svg-container">
        {cantidadMuestras === 0 ? (
          <div className="sin-datos">Recopilando telemetría inicial...</div>
        ) : (
          <svg viewBox={`0 0 ${width} ${height}`} className="svg-poligono">
            <defs>
              <linearGradient id="gradCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7B44C" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C7B44C" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="gradRam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#619242" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#619242" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Líneas de umbrales con los colores sobrios propuestos */}
            <line x1={padding} y1={getY(umbralAdvertencia)} x2={width - padding} y2={getY(umbralAdvertencia)} className="linea-umbral advertencia" />
            <line x1={padding} y1={getY(umbralCritico)} x2={width - padding} y2={getY(umbralCritico)} className="linea-umbral critico" />

            {/* Cuadrícula de porcentaje */}
            <text x={0} y={getY(100) + 4} className="eje-label">100%</text>
            <line x1={padding} y1={getY(100)} x2={width - padding} y2={getY(100)} className="grid-line" />
            <text x={0} y={getY(50) + 4} className="eje-label">50%</text>
            <line x1={padding} y1={getY(50)} x2={width - padding} y2={getY(50)} className="grid-line" />
            <text x={0} y={getY(0) + 4} className="eje-label">0%</text>
            <line x1={padding} y1={getY(0)} x2={width - padding} y2={getY(0)} className="grid-line" />

            {/* Área bajo la curva y Poligonal CPU */}
            {(metricaSeleccionada === 'cpu' || metricaSeleccionada === 'ambas') && (
              <>
                <polygon points={areaCpu} fill="url(#gradCpu)" />
                <polyline fill="none" points={puntosCpu} className="poligono-linea cpu" />
                {historial.map((m, i) => (
                  <circle key={`cpu-${i}`} cx={getX(i)} cy={getY(m.cpu)} r={2.5} className="nodo-punto cpu"
                    onMouseEnter={() => setPuntoHover({ ...m, tipo: 'CPU', valor: m.cpu })}
                    onMouseLeave={() => setPuntoHover(null)}
                  />
                ))}
              </>
            )}

            {/* Área bajo la curva y Poligonal RAM */}
            {(metricaSeleccionada === 'ram' || metricaSeleccionada === 'ambas') && (
              <>
                <polygon points={areaRam} fill="url(#gradRam)" />
                <polyline fill="none" points={puntosRam} className="poligono-linea ram" />
                {historial.map((m, i) => (
                  <circle key={`ram-${i}`} cx={getX(i)} cy={getY(m.ram)} r={2.5} className="nodo-punto ram"
                    onMouseEnter={() => setPuntoHover({ ...m, tipo: 'RAM', valor: m.ram })}
                    onMouseLeave={() => setPuntoHover(null)}
                  />
                ))}
              </>
            )}
          </svg>
        )}

        {/* Tooltip flotante */}
        {puntoHover && (
          <div className="tooltip-flotante">
            <strong>{puntoHover.tipo}: {puntoHover.valor}%</strong>
            <span>{puntoHover.time}</span>
          </div>
        )}
      </div>

      {/* Eje X con piso horario */}
      <div className="eje-x-horarios">
        <span>{horaInicio}</span>
        <span>Tiempo real </span>
        <span>{horaFin}</span>
      </div>

      {/* Estadísticas de soporte */}
      <div className="poligono-stats">
        <div className="stat-group">
          <span className="stat-title">CPU ({cpuActual}%)</span>
          <div className="stat-details">
            <span>Máx: <strong>{cpuMax}%</strong></span>
            <span>Prom: <strong>{cpuPromedio}%</strong></span>
          </div>
        </div>
        <div className="stat-group">
          <span className="stat-title">RAM ({ramActual}%)</span>
          <div className="stat-details">
            <span>Máx: <strong>{ramMax}%</strong></span>
            <span>Prom: <strong>{ramPromedio}%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};