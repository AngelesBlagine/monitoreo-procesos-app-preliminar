from fastapi import APIRouter
from controllers import procesos_controller
from uuid import UUID

router = APIRouter()

@router.get("/sistema")
def listar_procesos_sistema():
    return procesos_controller._agrupar_procesos_por_nombre(procesos_controller.listar_procesos_sistema())

@router.get("/")
def listar_procesos_db():
    return procesos_controller.obtener_procesos_db()

@router.get("/{proceso_id}")
def obterner_proceso_bd_por_id(proceso_id: UUID):
    return procesos_controller.obtener_proceso_db(proceso_id)