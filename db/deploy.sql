-- Deploy tables
\i '/docker-entrypoint-initdb.d/tables/tables.sql'

-- Copy data from CSV
COPY teams FROM '/docker-entrypoint-initdb.d/data/teams.csv' DELIMITER ',' CSV HEADER;
COPY players FROM '/docker-entrypoint-initdb.d/data/players.csv' DELIMITER ',' CSV HEADER;
COPY grounds FROM '/docker-entrypoint-initdb.d/data/grounds.csv' DELIMITER ',' CSV HEADER;
COPY matches FROM '/docker-entrypoint-initdb.d/data/matches.csv' DELIMITER ',' CSV HEADER;
COPY match_results FROM '/docker-entrypoint-initdb.d/data/match_results.csv' DELIMITER ',' CSV HEADER;
COPY match_totals FROM '/docker-entrypoint-initdb.d/data/match_totals.csv' DELIMITER ',' CSV HEADER;
COPY batsmen FROM '/docker-entrypoint-initdb.d/data/batsmen.csv' DELIMITER ',' CSV HEADER;
COPY bowlers FROM '/docker-entrypoint-initdb.d/data/bowlers.csv' DELIMITER ',' CSV HEADER;
COPY points_table FROM '/docker-entrypoint-initdb.d/data/points_table.csv' DELIMITER ',' CSV HEADER;