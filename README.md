<p align="center">
  <img src="https://github.com/AngelesBlagine/TSO-netbooks/blob/1c3faeea3387298c86c0612e24b2c533b1967ce7/logoUNO/BANNER-UNO-LOGO.png" alt="Banner del Proyecto">
</p>

<h1 align="center">📊 Sistema de Monitoreo de Procesos y Servidores (SysSentinel)</h1>

<p align="center">
  <i>Una plataforma web ligera y un agente de monitoreo 24/7 para el control de procesos críticos con alertas proactivas en tiempo real vía Telegram.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-success?style=for-the-badge" alt="Estado">
  <img src="https://img.shields.io/badge/Versión-1.0-blue?style=for-the-badge" alt="Versión">
  <img src="https://img.shields.io/badge/Licencia-MIT-orange?style=for-the-badge" alt="Licencia">
</p>

---

> 🎓 **Proyecto Académico**  
> Este proyecto es desarrollado por el **Grupo 3** para la cátedra de **Programación Orientada a Objetos** de la **Universidad Nacional del Oeste (UNO)**, ubicada en la Provincia de Buenos Aires, Argentina[cite: 1, 2, 3]. Su propósito es ofrecer una solución ágil y directa para supervisar servicios críticos y evitar caídas imprevistas[cite: 3].

> **Integrantes del Grupo 3:**
> * Agustín Calpe Monzón[cite: 1]
> * Federico Jiménez[cite: 1]
> * Abril Ruiz Blagine[cite: 1]
> * Camila Vera[cite: 1]
> * Diego Salvatierra[cite: 1]

---

## ✨ Funcionalidades Principales

* 👤 **Gestión de Usuarios y Servidores:** Registro, inicio de sesión y panel para registrar servidores obteniendo un Token de seguridad único[cite: 3].
* 🐍 **Agente Recolector (Python):** Script instalable en el servidor destino que lee métricas de procesos por su nombre mediante `psutil` y envía la información a la API[cite: 3, 4].
* 📈 **Dashboard en Tiempo Real:** Interfaz web con listado de procesos monitoreados, indicadores de estado (Activo/Caído) y gráficos de consumo de CPU y RAM[cite: 3, 9].
* 📬 **Motor de Alertas y Notificaciones:** Integración con la API de Telegram para notificar al usuario de forma inmediata según umbrales configurados (ej. uso excesivo de CPU o RAM)[cite: 3].
* 💓 **Detección de Caída Total (Heartbeat):** Sistema centinela capaz de detectar si el servidor completo perdió conexión a internet o se apagó[cite: 3].

---

## 🚀 Tecnologías y Herramientas

El proyecto está diseñado bajo un enfoque liviano y moderno, optimizado para garantizar un Producto Mínimo Viable (MVP) funcional en poco tiempo[cite: 3].

### 💻 Frontend
* <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black" /> **React.js** para una interfaz de usuario reactiva y de alta densidad informativa[cite: 4, 9].
* <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" /> **Tailwind CSS** para un diseño moderno, rápido y adaptativo[cite: 4].

### ⚙️ Backend & Base de Datos
* <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" /> **Python (FastAPI / Flask / Django)** para gestionar la lógica de negocio, autenticación y recepción de métricas[cite: 4].
* <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" /> **PostgreSQL** para la estructuración robusta de relaciones y datos secuenciales[cite: 4].
* <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" /> **Supabase / Render** como instancias gratuitas para la base de datos y hosting PaaS del backend y frontend[cite: 4].

### 🛠️ Agente Local
* <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" /> Script en **Python** utilizando la librería `psutil` para interactuar con el sistema operativo de los servidores monitoreados[cite: 4].

---

## 🧠 Arquitectura y Esquema de Base de Datos

El modelo relacional está compuesto por las siguientes entidades principales[cite: 7, 8]:
* **USUARIOS:** Almacena credenciales de acceso y datos de vinculación con Telegram[cite: 7, 8].
* **PROCESOS:** Registra el nombre y estado de los servicios monitoreados[cite: 7, 8].
* **USUARIOS_PROCESOS:** Tabla intermedia que resuelve la relación de muchos a muchos entre usuarios y procesos[cite: 7, 8].
* **HISTORIAL:** Entidad vinculada para registrar secuencialmente las métricas de consumo de RAM y CPU en el tiempo[cite: 7, 8].
* **ALERTAS y EVENTOS:** Configuran los límites de caídas o consumo y almacenan el historial de notificaciones emitidas[cite: 7, 8].

---

## 📸 Prototipado y Diseño (Figma)

El maquetado visual de la aplicación web se diseñó bajo una estética de alta densidad de información (*Slate Code*), incorporando[cite: 9]:
* **Tabla de Procesos:** Listado de servicios con PID, CPU, Memoria y códigos de color por estado (`NORMAL`, `WARNING`, `CRITICAL`)[cite: 9].
* **Inspector de Detalles:** Panel con estructura de árbol para examinar reportes del kernel, contexto del SO y descriptores de red/sockets[cite: 9].
* **Gráficos de Métricas y Consola de Eventos:** Barras de progreso de carga por núcleo de CPU, uso de RAM y un stream de logs que simula las alertas enviadas por Telegram en tiempo real[cite: 9].
