🚀 Monitoreo Procesos del Sistema (React + Vite)
Panel de control en tiempo real diseñado para supervisar métricas globales del sistema (CPU, RAM y procesos únicos) y realizar inspecciones detalladas de procesos mediante una interfaz basada en la estructura base del figma y colores a definir.

📂 Organización de Carpetas del Frontend (src/)
La arquitectura del proyecto se estructuró bajo un modelo modular por componentes, separando responsabilidades entre vistas principales, lógica de negocio/controladores y elementos visuales reutilizables:

src/
├── componentes/
│ ├── GraficoIndividual/
│ │ ├── GraficoIndividual.jsx
│ │ └── GraficoIndividual.css
│ ├── Navbar/
│ │ ├── Navbar.jsx
│ │ └── Navbar.css
│ ├── PoligonoRecursos/
│ │ ├── PoligonoRecursos.jsx
│ │ └── PoligonoRecursos.css
│ ├── TablaProcesos/
│ │ ├── TablaProcesos.jsx
│ │ └── TablaProcesos.css
│ └── TarjetaMetrica/
│ ├── TarjetaMetrica.jsx
│ └── TarjetaMetrica.css
├── controladores/
│ └── gestorProcesos.js
├── App.jsx
├── index.css
└── main.jsx

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
