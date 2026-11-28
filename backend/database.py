
import os
import psycopg


def get_connection():
    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise RuntimeError("DATABASE_URL environment variable is not set")

    return psycopg.connect(database_url)


def initialize_database():
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS bridge_status (
                    bridge_id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    status TEXT NOT NULL,
                    status_text TEXT NOT NULL,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS bridge_status_history (
                    id BIGSERIAL PRIMARY KEY,
                    bridge_id TEXT NOT NULL,
                    name TEXT NOT NULL,
                    status TEXT NOT NULL,
                    status_text TEXT NOT NULL,
                    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
            """)


def save_bridge_statuses(bridges):
    with get_connection() as connection:
        with connection.cursor() as cursor:
            for bridge in bridges:
                bridge_id = bridge["id"]
                status = bridge["status"]

                cursor.execute(
                    """
                    SELECT status
                    FROM bridge_status
                    WHERE bridge_id = %s
                    FOR UPDATE
                    """,
                    (bridge_id,),
                )

                previous = cursor.fetchone()

                cursor.execute(
                    """
                    INSERT INTO bridge_status (
                        bridge_id, name, status, status_text, updated_at
                    )
                    VALUES (%s, %s, %s, %s, NOW())
                    ON CONFLICT (bridge_id)
                    DO UPDATE SET
                        name = EXCLUDED.name,
                        status = EXCLUDED.status,
                        status_text = EXCLUDED.status_text,
                        updated_at = NOW()
                    """,
                    (
                        bridge_id,
                        bridge["name"],
                        status,
                        bridge["status_text"],
                    ),
                )

                # Record the first status or an actual status change.
                if previous is None or previous[0] != status:
                    cursor.execute(
                        """
                        INSERT INTO bridge_status_history (
                            bridge_id, name, status, status_text
                        )
                        VALUES (%s, %s, %s, %s)
                        """,
                        (
                            bridge_id,
                            bridge["name"],
                            status,
                            bridge["status_text"],
                        ),
                    )

def get_bridge_statuses():
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT bridge_id, name, status, status_text
                FROM bridge_status
                ORDER BY
                    CASE bridge_id
                        WHEN 'lakeshore' THEN 1
                        WHEN 'carlton' THEN 2
                        WHEN 'queenston' THEN 3
                        WHEN 'glendale' THEN 4
                        WHEN 'highway-20' THEN 5
                        ELSE 6
                    END
            """)

            rows = cursor.fetchall()

    return [
        {
            "id": row[0],
            "name": row[1],
            "status": row[2],
            "status_text": row[3],
        }
        for row in rows
    ]

