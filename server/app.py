import os
from shutil import rmtree
from flask import Flask, request
from flask_cors import CORS

from query import *
from database import *
from analysis import *

app = Flask(__name__, static_url_path='/static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cur = get_cursor()


@app.route('/')
def index():
    return 'ok'


@app.route('/players')
def search_player():
    args = request.args
    q = args['q']
    statement = query_player_search(q)

    cur.execute(statement)
    results = cur.fetchall()

    data = []
    for player in results:
        data.append({
            'player_id': player[0],
            'player_name': player[1],
            'team_id': player[2]
        })

    return data


@app.route('/player-analysis/<player_id>')
def get_player_analysis(player_id):
    player_id = int(player_id)
    return player_analysis(player_id)


@app.route('/team-analysis/<team_id>')
def get_team_analysis(team_id):
    return team_analysis(team_id)


@app.route('/points-table')
def get_points_table():
    return score_board_generator()


if __name__ == '__main__':
    app.run(debug=True)