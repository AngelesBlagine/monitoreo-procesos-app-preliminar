🚀 Monitoreo Procesos del Sistema (React + Vite)
Panel de control en tiempo real diseñado para supervisar métricas globales del sistema (CPU, RAM y procesos únicos) y realizar inspecciones detalladas de procesos mediante una interfaz basada en la estructura base del figma y colores a definir.

📂 Organización de Carpetas del Frontend (src/)
La arquitectura del proyecto se estructuró bajo un modelo modular por componentes, separando responsabilidades entre vistas principales, lógica de negocio/controladores y elementos visuales reutilizables:

src/
├── componentes/
│ ├── GraficoIndividual/
│ │ ├── GraficoIndividual.jsx # Inspección detallada y barras de recursos por proceso seleccionado
│ │ └── GraficoIndividual.css # Estilos con scroll estético y contención de PIDs largos (hay que modficar el color de la barra de scroll)
│ ├── Navbar/
│ │ ├── Navbar.jsx # Barra superior con estado de conexión del backend (proximamente seccion para el usuario)
│ │ └── Navbar.css # Estilos de la barra de navegación
│ ├── PoligonoRecursos/
│ │ ├── PoligonoRecursos.jsx # Gráfico de series temporales SVG (CPU y RAM) con buffer FIFo (mustrea los primeros 30)
│ │ └── PoligonoRecursos.css # Estilo
│ ├── TablaProcesos/
│ │ ├── TablaProcesos.jsx # Tabla interactiva con ordenamiento, PIDs y estados de procesos (arreglar la busqueda especifica)
│ │ └── TablaProcesos.css # Estilos responsivos de la tabla de procesos
│ └── TarjetaMetrica/
│ ├── TarjetaMetrica.jsx # Tarjetas superiores de métricas globales (CPU, RAM, Procesos)
│ └── TarjetaMetrica.css # Estilos de tarjetas métricas
├── controladores/
│ └── gestorProcesos.js # Lógica de comunicación con el backend (FastAPI / psutil)
├── App.jsx # Componente raíz: gestión de estados globales, reloj y buffer FIFO temporal
├── index.css # Estilos globales, variables de tema oscuro y layout principal de dos columnas
└── main.jsx # Punto de entrada de React / Vite

✨ Características Principales y Mejoras Implementadas
-Gestión Temporal en Memoria (Buffer FIFO de 30 Muestras):

-Recopila telemetría en tiempo real desde el backend de FastAPI cada 5 segundos.

-Mantiene un historial acotado de 30 muestras en memoria local, optimizando el rendimiento gráfico y desplazando los registros antiguos de manera automática.

Visualización Gráfica (Polígono de Recursos):

-Gráfico dinámico en SVG nativo optimizado con áreas bajo la curva y gradientes translúcidos.

-Líneas de referencia para umbrales de advertencia y estado crítico configurables.

-Eje X con marcas horarias de referencia y selector interactivo para alternar entre CPU, RAM o ambas métricas simultáneamente.

-Tooltips flotantes interactivos al pasar el cursor sobre los nodos de telemetría.

Layout Adaptativo con Solapa Lateral (sidebar):

-Estructura de dos columnas sincronizada mediante Grid / Flexbox que permite alternar la visualización del panel lateral
