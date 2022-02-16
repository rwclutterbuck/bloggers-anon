INSERT INTO blogs (title, author, content, year, month, day, fingerprint_id)
VALUES
(
  'The Hitchhikers Guide to the Galaxy', 
  'Noah', 
  $str$Earthman Arthur Dent is saved by his friend, Ford Prefect — an alien researcher for the titular Hitchhiker's Guide to the Galaxy, which provides info on every planet in the galaxy—from the Earth just before it is destroyed by the alien Vogons.$str$,
  2020,
  10,
  25,
  1
),
(
  'The Restaurant at the End of the Universe', 
  'Noah', 
  $str$Arthur Dent, Ford Prefect, Trillian, and Zaphod Beeblebrox leave the planet Magrathea on the Heart of Gold. A Vogon ship attacks them, and Arthur's attempt to have the ship computer make him a cup of tea leaves the Heart of Gold unable to fight it off. Zaphod calls up his ancestor Zaphod Beeblebrox the Fourth to rescue them. Zaphod and Marvin vanish, leaving the others on the ship in a black void.$str$,
  2021,
  01,
  08,
  1
),
(
  'War and Peace',
  'Richard',
  $str$Pierre Bezukhov is the illegitimate son of a wealthy count, who is dying after a series of strokes. Pierre is about to become embroiled in a struggle for his inheritance. Educated abroad at his father's expense following his mother's death, Pierre is kindhearted but socially awkward, and finds it difficult to integrate into Petersburg society.$str$,
  2015,
  09,
  20,
  2
);


-- PLEASE IGNORE THIS SECTION
-- INSERT INTO fingerprints (hash)
-- VALUES
-- (
--   '15a3c991a950c998656f06046df19cf1'
-- ),
-- (
--   '897561602fd1b6296870051cee6ed6ee'
-- )
