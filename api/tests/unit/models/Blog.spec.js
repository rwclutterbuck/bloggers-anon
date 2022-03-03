const Blog = require("../../../models/Blog");
const Fingerprint = require("../../../fingerprintjs/fingerprintModel");

jest.mock("../../../fingerprintjs/fingerprintModel");

const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("Blog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("all", () => {
    test("it resolves with blogs on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await Blog.all;
      expect(all).toHaveLength(3);
    });
  });

  describe("findById", () => {
    test("it reolves with blog on successful db query", async () => {
      const blogData = {
        id: 1,
        title: "Test",
        author: "Tester",
        content: "Testing...",
        year: 2022,
        month: 2,
        day: 18,
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [blogData] });
      const findById = await Blog.findById(1);
      expect(findById).toBeInstanceOf(Blog);
      expect(findById).toEqual({ ...blogData, route: "/blogs/1" });
    });
  });

  describe("create", () => {
    test("it resolves with new blog on successful db query", async () => {
      const blogData = {
        title: "Test",
        author: "Tester",
        content: "Testing...",
        year: 2022,
        month: 2,
        day: 18,
      };
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [blogData], id: 1 });
      const create = await Blog.create(blogData);
      expect(create).toBeInstanceOf(Blog);
      expect(create).toHaveProperty("id");
    });
  });

  describe("update", () => {
    test("it reolves with updated blog on successful db query", async () => {
      const blogData = {
        id: 1,
        title: "Test",
        author: "Tester",
        content: "Testing...",
        year: 2022,
        month: 2,
        day: 18,
      };
      const testBlog = new Blog(blogData);
      const newData = {
        title: "Test2",
        content: "Testing...2",
        year: 2022,
        month: 2,
        day: 18,
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [{ ...newData, author: "Tester", id: 1 }],
      });
      const update = await testBlog.update(blogData);
      expect(update).toBeInstanceOf(Blog);
      expect(update.id).toBe(1);
      expect(update.title).toBe("Test2");
      expect(update.content).toBe("Testing...2");
    });
  });

  // --------------- VERY STUCK -----------------------
  // describe("destroy", () => {
  //   test("it resolves with message on successful db query", async () => {
  //     const blogData = {
  //       id: 1,
  //       title: "Test",
  //       author: "Tester",
  //       content: "Testing...",
  //       year: 2022,
  //       month: 2,
  //       day: 18,
  //       fingerprint_id: 1,
  //     };
  //     jest
  //       .spyOn(db, "query")
  //       .mockResolvedValueOnce({ rows: [{ fingerprint_id: 1 }] });
  //     jest
  //       .spyOn(Fingerprint, "findById")
  //       .mockResolvedValueOnce(new Fingerprint({ id: 1, hash: 23 }));
  //     jest
  //       .spyOn(Fingerprint.prototype, "blogs")
  //       .mockResolvedValueOnce([{ blogData }]);
  //     const testBlog = new Blog(blogData);
  //     const destroy = await testBlog.destroy();
  //     expect(destroy).toBe("Blog has been deleted");
  //   });
  // });
});
