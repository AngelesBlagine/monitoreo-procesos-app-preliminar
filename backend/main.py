from db import pool
from controllers import procesos_controller

# (Opcional) Descomentar para ver todos los procesos en el sistema:
# print("lista de procesos: \n" + str(procesos_controller.listar_procesos()))
# print("\n\n\nprocesos agrupados: \n" + str(procesos_controller._agrupar_por_nombre(procesos_controller.listar_procesos())))

def main():
    # Ejecuta el seguimiento y verificación del proceso
    procesos_controller.verificar_y_actualizar_proceso()

if __name__ == "__main__":
    main()