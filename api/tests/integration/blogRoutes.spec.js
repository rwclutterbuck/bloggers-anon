describe("blog endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000...")
    );
  });

  it("should return a list of all blogs in database", async () => {
    const res = await request(api).get("/blogs");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(3);
  });

  it("should return a list of all blogs in database for specified year", async () => {
    const res = await request(api).get("/blogs/2022");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(3);
  });

  it("should return a list of all blogs for specified year and month", async () => {
    const res = await request(api).get("/blogs/2022-1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it("should return a list of all blogs for specified year, month, and day", async () => {
    const res = await request(api).get("/blogs/2022-1-23");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it("should return the blog with specified date and id", async () => {
    const res = await request(api).get("/blogs/2022-2-23/2");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(3);
  });

  it("should create a new blog", async () => {
    const res = await request(api).post("/blogs").send({
      title: "New Blog",
      author: "Test Man",
      content: "Test Description",
      year: 2022,
      month: 2,
      day: 16,
      // fingerprint_id: 3,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");

    const blogRes = await request(api).get("/blogs");
    expect(blogRes.body.length).toEqual(4);
  });

  it("should not create a new blog with title over 50 characters", async () => {
    const res = await request(api).post("/blogs").send({
      title: "Thdkaodjue ncsljancoajfbnowbefoabcjbadljbcaldbvjadbvljabdbd",
      author: "Test Man",
      content: "Test Description",
      year: 2022,
      month: 2,
      day: 16,
      // fingerprint_id: 3,
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("err");

    const bookRes = await request(api).get("/books/4");
    expect(bookRes.statusCode).toEqual(404);
  });

  it("should not create a new blog with author name over 50 characters", async () => {
    const res = await request(api).post("/blogs").send({
      title: "Test Blog",
      author: "Thdkaodjue ncsljancoajfbnowbefoabcjbadljbcaldbvjadbvljabdbd",
      content: "Test Description",
      year: 2022,
      month: 2,
      day: 16,
      // fingerprint_id: 3,
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("err");

    const bookRes = await request(api).get("/books/4");
    expect(bookRes.statusCode).toEqual(404);
  });

  it("should not create a new blog with content over 500 characters", async () => {
    const res = await request(api).post("/blogs").send({
      title: "Test Blog 4",
      author: "Test Man",
      content:
        "YyYXJHN8ovVJHDYn7kOl1griWoH8rw3Q7vaAxeyopIDG2NTZRIwQbhY7ykbuwZE2ohowLvUcxDMncPX6hwkrYLX4CrP5Y3nKsb6A9xfOFSsKTYvpmFeTSkDYkJNeszfeNF7I2iQqxWfWSYWH5PRYTLJUnU9Lq8rq0LKi24BkG5OWYWO3W0Nt2YCsbuJYamiWzPutJVfZ4oDg9dQUBy64d6a5tGCrNgSfyPzeg2wWgPHBLGfDEZPYO1zGsumYIr8Wh9l4cpyr5zuozn6kBkEz5mXfiZsUiKnjDp2BxaoU2ZEitJBiJ86KNOYV7NaqltNEBIkSfCrwRZwwhUfUj3h1W1PVGfs3hTFjA7xw0a6ZeMGZCEfKJ7w4wloiR3WVk6JpEnSNJuuf6eA4azTDiTCPkTRprSg0yLZwHuN3WiFg3wq4AsYadddbmWIKxxMszxSyRo9ZmZEcqkicpyTXPvfnGQTaF4SLoynBT3Soy1BG4BGWu7D9R7MbI",
      year: 2022,
      month: 2,
      day: 16,
      // fingerprint_id: 3,
    });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("err");

    const bookRes = await request(api).get("/books/4");
    expect(bookRes.statusCode).toEqual(404);
  });
});
