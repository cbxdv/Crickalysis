import psycopg2
import time

cur = None

while True:
    try:
        conn = psycopg2.connect(
            host='localhost',
            database='crickalysis', 
            user='postgres',
            password='password'
        )
        cur = conn.cursor()
        print("Connected to PostgreSQL database - crickalysis")
        break
    except:
        print('Retrying connection to database in 5 seconds')
        time.sleep(1)


def get_cursor():
    if cur == None:
        time.sleep(1)
        return get_cursor()
    return cur
