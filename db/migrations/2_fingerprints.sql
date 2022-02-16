-- ---------------- PLEASE IGNORE THIS FILE ---------------------------

DROP TABLE IF EXISTS fingerprints;

CREATE TABLE fingerprints (
  id serial PRIMARY KEY,
  hash VARCHAR(64)
)
