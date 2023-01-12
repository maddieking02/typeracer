-- CREATE DATABASE
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE challenges (
  id SERIAL PRIMARY KEY,
  challenge TEXT,
  language TEXT,
  solution VARCHAR(500)
);

-- LOAD reviews csv
\copy challenges
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-mvp/typeracer_challenges.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30),
  password VARCHAR(50),
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(100),
  wpm json
);

-- SELECT setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews)+1);

-- CREATE INDEX product_index ON reviews (product_id);
