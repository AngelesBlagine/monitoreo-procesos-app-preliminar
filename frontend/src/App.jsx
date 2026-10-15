import { useState, useEffect } from 'react';
import { Navbar } from './componentes/Navbar/Navbar';
import { TarjetaMetrica } from './componentes/TarjetaMetrica/TarjetaMetrica';
import { TablaProcesos } from './componentes/TablaProcesos/TablaProcesos';
import { obtenerDatosYMetricas } from './controladores/gestorProcesos';
import { GraficoIndividual } from './componentes/GraficoIndividual/GraficoIndividual'; 
import { PoligonoRecursos } from './componentes/PoligonoRecursos/PoligonoRecursos';

function App() {
  const [procesos, setProcesos] = useState([]);
  const [estadoBackend, setEstadoBackend] = useState('CONECTANDO...');
  const [totalProcesosAgrupados, setTotalProcesosAgrupados] = useState(0);
  const [cpuTotal, setCpuTotal] = useState('0.0');
  const [ramTotal, setRamTotal] = useState('0.0');
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [horaServidor, setHoraServidor] = useState('');
  const [historialMuestras, setHistorialMuestras] = useState([]);

  // Umbrales configurables (Advertencia y Crítico) - después agregamos para modificacion
  const [umbralAdvertencia] = useState(80);
  const [umbralCritico] = useState(90);

    const actualizarInformacion = async () => {
    const datos = await obtenerDatosYMetricas();
    setProcesos(datos.procesos);
    setEstadoBackend(datos.estadoBackend);
    setTotalProcesosAgrupados(datos.totalProcesosAgrupados);
    setCpuTotal(datos.cpuTotal);
    setRamTotal(datos.ramTotal);

    const cpuNum = parseFloat(datos.cpuTotal) || 0;
    const ramNum = parseFloat(datos.ramTotal) || 0;
    const timestampActual = new Date().toLocaleTimeString();

    // Agregar nueva muestra al historial, solo muestra las ultimas 30 muestras
    setHistorialMuestras(prev => {
      const nuevaMuestra = { time: timestampActual, cpu: cpuNum, ram: ramNum };
      const actualizado = [...prev, nuevaMuestra];
      if (actualizado.length > 30) {
        actualizado.shift(); // Elimina la más antigua
      }
      return actualizado;
    });
  };

  useEffect(() => {
    actualizarInformacion();
    const intervaloDatos = setInterval(actualizarInformacion, 5000);

    const actualizarReloj = () => {
      const ahora = new Date();
      setHoraServidor(ahora.toLocaleTimeString());
    };
    actualizarReloj();
    const intervaloReloj = setInterval(actualizarReloj, 1000);

    return () => {
      clearInterval(intervaloDatos);
      clearInterval(intervaloReloj);
    };
  }, []);

  return (
    <div className='app-conteiner'>
      <Navbar status={estadoBackend} />

      <main className="main-content">
        <section className="metrics-grid">
          <TarjetaMetrica title="CPU Total Usado" value={cpuTotal} unit="%" subtitle="" />
          <TarjetaMetrica title="Memoria RAM Usada" value={ramTotal} unit="%" subtitle="" />
          <TarjetaMetrica title="Procesos Únicos" value={totalProcesosAgrupados} subtitle={`Actualizado: ${horaServidor}`} />
        </section>

        <div className={`dashboard-layout-desplegable ${sidebarAbierto ? 'con-sidebar' : 'sin-sidebar'}`}>
          <div className="columna-tabla">
            <TablaProcesos 
              processes={procesos} 
              onSelectProcess={(proc) => setProcesoSeleccionado(proc)} 
            />
          </div>

          <div className="wrapper-sidebar-lateral">
            <button 
              className="lengueta-desplegable" 
              onClick={() => setSidebarAbierto(!sidebarAbierto)}
              title={sidebarAbierto ? "Ocultar panel" : "Mostrar panel y gráficos"}
            >
              {sidebarAbierto ? '›' : '‹'}
            </button>

            {sidebarAbierto && (
              <aside className="columna-paneles-derecha">
                <PoligonoRecursos 
                  historial={historialMuestras} 
                  umbralAdvertencia={umbralAdvertencia}
                  umbralCritico={umbralCritico}
                />
                <GraficoIndividual proceso={procesoSeleccionado} />
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;