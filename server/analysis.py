import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

from query import *
from database import *

pd.options.plotting.backend = 'plotly'

cur = get_cursor()


def player_analysis(player_id: int):

    # Player Details
    player_details_statement = query_player_details(player_id)
    cur.execute(player_details_statement)
    data = cur.fetchone()
    pid, player_name, country = data  # type: ignore

    # Boundaries
    boundaries_statement = query_player_boundaries(player_id)
    cur.execute(boundaries_statement)
    data = cur.fetchall()
    teams, fours, sixes = zip(*data)
    df = pd.DataFrame({
        'opposition': teams,
        'fours': fours,
        'sixes': sixes
    })
    df.set_index('opposition')
    fig = px.bar(
        df,
        x='opposition',
        y=['fours', 'sixes'],
        title='Boundaries (Fours & Sixes)'
    )
    boundaries_graph = fig.to_html()

    # Runs & Strike Rate
    runs_statement = query_player_runs_strike_rate(player_id)
    cur.execute(runs_statement)
    data = cur.fetchall()
    dates, runs, strike_rate, opposition = zip(*data)
    df = pd.DataFrame({
        'Date': dates,
        'Runs': runs,
        'Strike Rate': strike_rate,
        'Opposition': opposition
    })
    fig = px.line(
        df,
        x='Date',
        y=['Runs', 'Strike Rate'],
        hover_data=['Opposition'],
        title='Runs & Strike Rate'
    )
    runs_graph = fig.to_html()

    # Wickets
    wickets_statement = query_player_wickets(player_id)
    cur.execute(wickets_statement)
    data = cur.fetchall()
    wickets, opposition = zip(*data)
    df = pd.DataFrame({
        'Opposition': opposition,
        'Wickets': wickets
    })
    fig = px.bar(df, 'Opposition', 'Wickets', title='Total Wickets')
    wickets_graph = fig.to_html()

    # economy
    statement = query_player_economy(player_id)
    cur.execute(statement)
    data = cur.fetchall()
    economy, dates = zip(*data)
    df = pd.DataFrame({
        'Economy': economy,
        'Date': dates
    })
    fig = px.line(df, x='Date', y='Economy', title='Player Economy over time')
    economy_graph = fig.to_html()

    return {
        'playerId': pid,
        'playerName': player_name,
        'country': country,
        'analysis': {
            'boundaries': {
                'name': 'Boundaries Analysis',
                'graphData': boundaries_graph
            },
            'runs': {
                'name': 'Runs Analysis',
                'graphData': runs_graph
            },
            'wickets': {
                'name': 'Wickets Analysis',
                'graphData': wickets_graph
            },
            'economy': {
                'name': 'Player Economy Analysis',
                'graphData': economy_graph
            }
        }
    }


def team_analysis(team_id: str):

    statement = query_team_details(team_id)
    cur.execute(statement)
    data = cur.fetchone()
    team_country = data[0]  # type: ignore

    # Win Loss Percentages
    statement = query_team_win_loss_percentage(team_id)
    cur.execute(statement)
    data = cur.fetchall()
    country, win, lost = zip(*data)
    fig = go.Figure()
    fig.add_trace(go.Bar(
        y=country,
        x=win,
        name='Win Percentages',
        orientation='h'
    ))
    fig.add_trace(go.Bar(
        y=country,
        x=lost,
        name='Loss Percentage',
        orientation='h'
    ))
    fig.update_layout(barmode='stack', title='Win & Loss Percentages')
    win_loss_percentage_graph = fig.to_html()

    # Runs
    statement = query_team_runs(team_id)
    cur.execute(statement)
    data = cur.fetchall()
    country, runs, opp_runs = zip(*data)
    df = pd.DataFrame({
        'Country': country,
        'Runs': runs,
        'Opposition Runs': opp_runs
    })
    fig = px.bar(
        df,
        x='Country',
        y=['Runs', 'Opposition Runs'],
        barmode='group',
        title='Total Runs Scored and Lost'
    )
    runs_graph = fig.to_html()

    # Innings wins
    statement = query_team_inns_wins(team_id)
    cur.execute(statement)
    data = cur.fetchall()
    fig = px.pie(
        values=data[0],
        names=['Batting First Win', 'Batting First Loss',
               'Bowling First Win', 'Bowling First Loss'],
        title='Batting First and Bowling First'
    )
    innings_graph = fig.to_html()

    return {
        'teamId': team_id,
        'country': team_country,
        'analysis': {
            'win_loss_percentage': {
                'name': 'Team Win Loss Percentages',
                'graphData': win_loss_percentage_graph
            },
            'runs': {
                'name': 'Runs For and Against',
                'graphData': runs_graph
            },
            'innings': {
                'name': 'Batting First and Bowling First Stats',
                'graphData': innings_graph
            }
        }
    }


def score_board_generator():
    statement = query_points_table()
    cur.execute(statement)
    data = cur.fetchall()
    country, won, matches, lost, net_run_rate, points = zip(*data)
    fig = go.Figure(data=[go.Table(
        header=dict(
            values=['<b>Country</b>', '<b>Won</b>', '<b>Matches</b>',
                    '<b>Lost</b>', '<b>Net Run Rate</b>', '<b>Points</b>'],
            height=40,
            font=dict(color='white', size=12),
            fill_color='royalblue',
        ),
        cells=dict(
            values=[country, won, matches, lost, net_run_rate, points],
            height=40
        ),
    )])
    fig.update_layout(width=992, height=650)
    html = fig.to_html()
    return {
        'table': html
    }
