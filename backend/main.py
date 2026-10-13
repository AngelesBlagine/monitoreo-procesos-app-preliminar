from db import pool

def main():
    # Solamente para probar la conexión a la base de datos
    with pool:
        with pool.connection() as conn:
            result = conn.execute("SELECT 1").fetchone()
            print(result)

if __name__ == "__main__":
    main()