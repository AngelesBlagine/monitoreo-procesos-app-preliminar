from fastapi import APIRouter
from controllers import procesos_controller
from uuid import UUID
from schemas import proceso_schema

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

# Cuando se pasa un modelo de pydantic (ProcesoCreate) es la informacion que debe llegar del body de la request
@router.post("/")
def crear_proceso_bd(data: proceso_schema.ProcesoCreate):
    return procesos_controller.crear_proceso_db(data.nombre, data.estado)