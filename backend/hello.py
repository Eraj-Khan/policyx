## Postgres
import os 

import psycopg2

def connect_to_postgres():
    try:
        dbname = os.getenv(""'PDB'"")
        user = os.getenv('PUSER')
        password = os.getenv('PASS')
        host = os.getenv('PDB_HOST')
        port = os.getenv('PDB_PORT')
        connection = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print("Connected to PostgreSQL!")
        return connection

    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
        
postgres_conn = connect_to_postgres()

#  cursor = postgres_conn.cursor() 
#  query = 'SELECT * FROM agro_data WHERE "cnic" = %s;'
# cursor.execute(query, (self.loan_app["cnic"],))
# result = cursor.fetchone()