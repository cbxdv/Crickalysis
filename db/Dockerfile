FROM postgres:latest

ADD tables.sql /docker-entrypoint-initdb.d/tables/tables.sql
ADD /data/ /docker-entrypoint-initdb.d/data
ADD deploy.sql /docker-entrypoint-initdb.d/deploy.sql