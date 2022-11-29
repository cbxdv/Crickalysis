def query_player_search(q):
    return f"""
        SELECT
            player_id,
            player_name,
            team_id
        FROM
            players
        WHERE
            LOWER(players.player_name) LIKE '%{q}%'
        LIMIT
            10
    """

def query_points_table():
    return """
        SELECT
            (
                SELECT
                country
                FROM
                teams
                WHERE
                teams.team_id = points_table.team_id
            ),
            won,
            matches,
            lost,
            net_run_rate,
            points
        FROM
            points_table
        ORDER BY
            points_table.points DESC;
    """


def query_player_details(player_id):
    return f"""
        SELECT
            player_id,
            player_name,
            country
        FROM
            players
            JOIN teams ON players.team_id = teams.team_id
        WHERE
            player_id ={player_id}
    """

def query_player_boundaries(player_id):
    return f"""
        SELECT
            opposition,
            SUM(fours),
            SUM(sixes)
        FROM
            batsmen
        WHERE
            player_id ={player_id}
        GROUP BY
            opposition
    """

def query_player_runs_strike_rate(player_id):
    return f"""
        SELECT
            matches.date,
            batsmen.runs,
            batsmen.strike_rate,
            (
                SELECT
                country
                FROM
                teams
                WHERE
                teams.team_id = batsmen.opposition
            )
        FROM
            batsmen
            JOIN matches ON batsmen.match_id = matches.match_id
        WHERE
            player_id ={player_id}
        ORDER BY
            matches.date;
    """


def query_player_wickets(player_id):
    return f"""
        SELECT
            SUM(wickets),
            (
                SELECT
                country
                FROM
                teams
                WHERE
                teams.team_id = opposition
            )
        FROM
            bowlers
        WHERE
            player_id = {player_id}
        GROUP BY
            opposition;
    """

def query_player_economy(player_id):
    return f"""
        SELECT
            economy,
            (
                SELECT
                date
                FROM
                matches
                WHERE
                matches.match_id = bowlers.match_id
            )
        FROM
            bowlers
        WHERE
            player_id = {player_id}
        ORDER BY
            date
    """

def query_team_win_loss_percentage(team_id):
    return f"""
        SELECT
            (
                SELECT
                    country
                FROM
                    teams
                WHERE
                    teams.team_id = results.opposition
            ),
            (
                SELECT
                    TRUNC(AVG(result) * 100, 2)
                FROM
                    match_results as res1
                WHERE
                    res1.country = '{team_id}'
                  AND 
                    res1.opposition = results.opposition
            ),
            (
                SELECT
                    TRUNC(100 - (AVG(result) * 100), 2)
                FROM
                    match_results as res1
                WHERE
                    res1.country = '{team_id}'
                AND res1.opposition = results.opposition
            )
        FROM
            match_results as results
        WHERE
            country = '{team_id}'
        GROUP BY
            opposition;
    """


def query_team_runs(team_id):
    return f"""
        SELECT
            (
                SELECT
                country
                FROM
                teams
                WHERE
                team_id = tot1.opposition
            ) as runs,
            SUM(tot1.runs),
            (
                SELECT
                SUM(runs)
                FROM
                match_totals as tot2
                WHERE
                tot2.country = tot1.opposition
                AND tot2.opposition = '{team_id}'
            ) as opposition_runs
        FROM
            match_totals as tot1
        WHERE
            country = '{team_id}'
        GROUP BY
            opposition;
    """

def query_team_inns_wins(team_id):
    return f"""
        SELECT
            (SELECT COUNT(*) FROM match_totals WHERE country = '{team_id}' AND inns = 1 AND result = 1) as batting_first_win, 
            (SELECT COUNT(*) FROM match_totals WHERE country = '{team_id}' AND inns = 1 AND result = 0) as batting_first_loss, 
            (SELECT COUNT(*) FROM match_totals WHERE country = '{team_id}' AND inns = 2 AND result = 1) as bowling_first_win,
            (SELECT COUNT(*) FROM match_totals WHERE country = '{team_id}' AND inns = 2 AND result = 0) as batting_first_loss; 
    """ 