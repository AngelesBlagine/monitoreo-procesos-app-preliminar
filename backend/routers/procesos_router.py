from fastapi import APIRouter
from controllers import procesos_controller

router = APIRouter()

@router.get("/")
def listar_procesos():
    return procesos_controller._agrupar_por_nombre(procesos_controller.listar_procesos())