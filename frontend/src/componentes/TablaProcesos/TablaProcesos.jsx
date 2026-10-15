import React, { useState } from 'react';
import { buscarProcesoPorNombre } from '../../services/procesos'; 
import './TablaProcesos.css';

export function TablaProcesos({ processes, onSelectProcess }) {
  const [busqueda, setBusqueda] = useState('');
  const [criterioOrden, setCriterioOrden] = useState('cpu'); // recibe inicialmente cpu como criterio de orden, 'cpu' | 'ram' | 'nombre'
  const [verTodos, setVerTodos] = useState(false);
  const [procesosFiltradosApi, setProcesosFiltradosApi] = useState(null);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);

  // Función que se ejecuta al presionar Enter en el input, más que nada para utilizar el segundo metodo de la API, integrar en algun lado
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      const termino = busqueda.trim();
      
      // Si el input está vacío, limpiamos la búsqueda y volvemos a la lista general
      if (!termino) {
        setProcesosFiltradosApi(null);
        return;
      }

      setCargandoBusqueda(true);
      const resultado = await buscarProcesoPorNombre(termino);
      
      if (resultado.success) {
        setProcesosFiltradosApi(resultado.data); // Contiene el array con el proceso encontrado
      } else {
        setProcesosFiltradosApi([]); // Si da 404 o no existe, muestra vacío
      }
      setCargandoBusqueda(false);
      setVerTodos(false);
    }
  };

  // Si la API tiene un resultado de búsqueda activa, usamos eso; si no, la lista general
  const listaBase = procesosFiltradosApi !== null ? procesosFiltradosApi : processes;

  // Ordenamiento
  const procesosOrdenados = [...listaBase].sort((a, b) => { //alfabeticamente
    if (criterioOrden === 'cpu') return b.cpu_percent - a.cpu_percent; //segun la cpu
    if (criterioOrden === 'ram') return b.memory_percent - a.memory_percent; //segun la ram
    return a.name.localeCompare(b.name);
  });

  const procesosAMostrar = verTodos ? procesosOrdenados : procesosOrdenados.slice(0, 10);
  
  return (
    <div className="tabla-procesos-container">
      <div className="tabla-header-controls">
        <h3 className="tabla-titulo">
          Procesos del Sistema
        </h3>
        
        {/* Controles de Búsqueda y Ordenamiento */}
        <div className="controles-filtro">
          <input 
            type="text" 
            placeholder="Buscar exacto + Enter..." 
            value={busqueda}
            onChange={(e) => {
              const nuevoValor = e.target.value;
              setBusqueda(nuevoValor);
              // Si borra el texto por completo con backspace, restablecemos la tabla general de inmediato
              if (nuevoValor.trim() === '') {
                setProcesosFiltradosApi(null);
              }
            }}
            onKeyDown={handleKeyDown}
            className="input-busqueda"
          />
          <select 
            value={criterioOrden} 
            onChange={(e) => setCriterioOrden(e.target.value)}
            className="select-orden"
          >
            <option value="cpu">Más CPU</option>
            <option value="ram">Más RAM</option>
            <option value="nombre">Alfabeto</option>
          </select>
        </div>
      </div>

      {/* Tabla HTML */}
      <div className="tabla-scroll-wrapper">
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Proceso</th>
              <th>PIDs</th>
              <th className="text-right">CPU</th>
              <th className="text-right">RAM</th>
            </tr>
          </thead>
          <tbody>
            {cargandoBusqueda ? (
              <tr>
                <td colSpan="4" className="sin-resultados">Buscando proceso ... </td>
              </tr>
            ) : procesosAMostrar.length > 0 ? (
              procesosAMostrar.map((proc, index) => (
                <tr 
                  key={index} 
                  onClick={() => onSelectProcess(proc)}
                  className="fila-proceso"
                >
                  <td className="nombre-proceso">{proc.name}</td>
                  <td className="pids-proceso">
                    {proc.pids ? proc.pids.join(', ') : 'N/A'}
                  </td>
                  <td className="cpu-proceso text-right">{proc.cpu_percent}%</td>
                  <td className="ram-proceso text-right">{proc.memory_percent}%</td>
                </tr>
              ))
            ) : (
              <tr>
               <td colSpan="4" className="sin-resultados">
                  {busqueda ? `No se encontró el proceso exacto "${busqueda}" en el sistema` : 'No hay procesos disponibles'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón de despliegue, mostramos los primeros 10 para no saturar la visualizacion */}
      {procesosOrdenados.length > 10 && procesosFiltradosApi === null && (
        <div className="contenedor-boton-desplegar">
          <button 
            onClick={() => setVerTodos(!verTodos)}
            className="btn-desplegar"
          >
            {verTodos ? '▲ Ver vista resumida' : `▼ Ver lista completa (${procesosOrdenados.length} procesos)`}
          </button>
        </div>
      )}
    </div>
  );
}