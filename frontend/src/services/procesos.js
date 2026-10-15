const API_URL = "http://localhost:8000";//listado de procesos del sistema


export async function obtenerProcesosSistema() {
  try {
    const response = await fetch(`${API_URL}/procesos/sistema`);
    const resultado = await response.json();
    
    // Como tu backend devuelve directamente la lista de procesos:
    return { success: true, data: resultado };
  } catch (error) {
    console.error('Error de conexión con el backend:', error);
    return { success: false, data: [], error: error.message };
  }
}

//busqueda de proceso por nombre
export async function buscarProcesoPorNombre(nombre) {
  try {
    const response = await fetch(`${API_URL}/procesos/sistema/buscar?nombre=${encodeURIComponent(nombre)}`);
    const data = await response.json();

    if (response.ok) {

      return { success: true, data: [data.data] };
    } else {
      return { success: false, data: [] };
    }
  } catch (error) {
    return { success: false, data: [] };
  }
}