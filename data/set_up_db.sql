--1) Drop database if exists already
DROP DATABASE IF EXISTS orders;

--4) create db
CREATE DATABASE orders

TABLESPACE = pg_default
CONNECTION LIMIT = -1;

CREATE SCHEMA orders;
CREATE EXTENSION "uuid-ossp";
