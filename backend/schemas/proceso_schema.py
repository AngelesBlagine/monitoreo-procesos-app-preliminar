from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class ProcesoCreate(BaseModel):
    nombre: str
    estado: Optional[str] = "desconocido"

class ProcesoOut(BaseModel):
    id: UUID
    nombre: str
    estado: str