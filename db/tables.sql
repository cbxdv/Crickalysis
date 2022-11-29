BEGIN TRANSACTION;

DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS grounds CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS bowlers CASCADE;
DROP TABLE IF EXISTS batsman CASCADE;
DROP TABLE IF EXISTS match_totals CASCADE;
DROP TABLE IF EXISTS match_results CASCADE;
DROP TABLE IF EXISTS points_table CASCADE;

CREATE TABLE teams(
    team_id VARCHAR(3),
    country varchar(50),
    PRIMARY KEY(team_id)
);

CREATE TABLE players (
    player_id INT,
    player_name VARCHAR(50),
    team_id VARCHAR(3),
    PRIMARY KEY (player_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE grounds(
    ground_id VARCHAR(5),
    name VARCHAR(100),
    location VARCHAR(100),
    matches INT,
    won INT,
    tied INT,
    nr INT,
    runs INT,
    wickets INT,
    balls INT,
    average FLOAT,
    rpo FLOAT,
    PRIMARY KEY (ground_id)
);

CREATE TABLE matches(
    match_id INT,
    team1 VARCHAR(3),
    team2 VARCHAR(3),
    date DATE,
    ground VARCHAR(50),
    PRIMARY KEY (match_id),
    FOREIGN KEY (team1) REFERENCES teams(team_id),
    FOREIGN KEY (team2) REFERENCES teams(team_id)
);

CREATE TABLE bowlers(
    player_id INT,
    match_id INT,
    overs FLOAT,
    maidens INT,
    runs INT,
    wickets INT,
    economy FLOAT,
    average FLOAT,
    strike_rate FLOAT,
    opposition VARCHAR(3),
    FOREIGN KEY (player_id) REFERENCES players(player_id),
    FOREIGN KEY (match_id) REFERENCES matches(match_id),
    FOREIGN KEY (opposition) REFERENCES teams(team_id)
);

CREATE TABLE batsmen(
    player_id INT,
    match_id INT,
    runs INT,
    strike_rate FLOAT,
    fours INT,
    sixes INT,
    opposition VARCHAR(3),
    not_out BOOLEAN,
    FOREIGN KEY (player_id) REFERENCES players(player_id),
    FOREIGN KEY (match_id) REFERENCES matches(match_id),
    FOREIGN KEY (opposition) REFERENCES teams(team_id)
);

CREATE TABLE match_totals(
    match_id INT,
    country VARCHAR(3),
    opposition VARCHAR(3),
    runs INT,
    wickets INT,
    overs FLOAT,
    rpo FLOAT,
    target INT,
    inns INT,
    result INT,
    FOREIGN KEY (match_id) REFERENCES matches(match_id),
    FOREIGN KEY (country) REFERENCES teams(team_id),
    FOREIGN KEY (opposition) REFERENCES teams(team_id)
);

CREATE TABLE match_results(
    match_id INT,
    result INT,
    toss INT,
    bat INT,
    opposition VARCHAR(5),
    country VARCHAR(5),
    FOREIGN KEY (match_id) REFERENCES matches(match_id),
    FOREIGN KEY (opposition) REFERENCES teams(team_id),
    FOREIGN KEY (country) REFERENCES teams(team_id)
);

CREATE TABLE points_table(
    team_id VARCHAR(5),
    won INT,
    matches INT,
    lost INT,
    net_run_rate FLOAT,
    points INT,
    PRIMARY KEY (team_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

COMMIT;
