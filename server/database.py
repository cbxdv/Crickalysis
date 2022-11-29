import psycopg2


conn = psycopg2.connect(host='localhost', database='crickalysis', user='postgres', password='password')
cur = conn.cursor()


def get_cursor():
    return cur


def execute_query(query):
    pass