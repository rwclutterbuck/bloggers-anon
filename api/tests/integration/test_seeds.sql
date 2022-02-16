TRUNCATE blogs, fingerprints RESTART IDENTITY;

INSERT INTO blogs (title, author, content, year, month, day, fingerprint_id)
VALUES
(
    'Test Blog 1', 
    'Test Man 1', 
    $str$Test blog 1 description$str$,
    2022,
    1,
    23,
    1
),
(
    'Test Blog 2', 
    'Test Man 2', 
    $str$Test blog 2 description$str$,
    2022,
    1,
    22,
    1
),
(
    'Test Blog 3',
    'Test Man 3',
    $str$Test blog 3 description$str$,
    2022,
    2,
    23,
    2
);

-- INSERT INTO fingerprints (hash)
-- VALUES
-- (''),
-- ('');
