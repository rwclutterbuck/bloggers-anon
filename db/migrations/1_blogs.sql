DROP TABLE IF EXISTS blogs;

CREATE TABLE blogs (
  id serial PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  author VARCHAR(50) NOT NULL,
  content VARCHAR(1000) NOT NULL,
  year INT CHECK (year<2022),
  month INT CHECK (month>0 AND month<=12),
  day INT CHECK (day>0 AND day<=31),
  fingerprint_id INT FOREIGN KEY
)
