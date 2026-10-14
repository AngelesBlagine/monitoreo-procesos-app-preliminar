from pydantic import BaseModel
from typing import Optional

class ProcesoCreate(BaseModel):
    nombre: str
    estado: Optional[str] = "desconocido"