def crear(conn, nombre, estado = "desconocido"):
    return conn.execute(
        """
        INSERT INTO procesos (nombre, estado)
        VALUES (%s, %s)
        RETURNING *
        """,
        (nombre, estado)
    ).fetchone()

def buscar_por_id(conn, proceso_id):
    return conn.execute("SELECT * FROM procesos WHERE id = %s", (proceso_id,)).fetchone()

def buscar_por_nombre(conn, nombre):
    return conn.execute("SELECT * FROM procesos WHERE nombre = %s", (nombre,)).fetchone()

def eliminar(conn, proceso_id):
    return conn.execute("DELETE FROM procesos WHERE id = %s", (proceso_id,)).rowcount > 0