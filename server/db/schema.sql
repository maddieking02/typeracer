-- CREATE DATABASE
DROP TABLE IF EXISTS challenges;

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

-- SELECT setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews)+1);

-- CREATE INDEX product_index ON reviews (product_id);
