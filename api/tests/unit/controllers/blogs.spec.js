const blogsController = require("../../../controllers/blogs");
const Blog = require("../../../models/Blog");

const dayjs = require("./mockDayJS");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

describe("blogs controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("index", () => {
    test("it returns blogs with 200 status code", async () => {
      const testBlogs = ["blog1", "blog2"];
      jest.spyOn(Blog, "all", "get").mockResolvedValue(testBlogs);
      await blogsController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testBlogs);
    });
  });

  describe("show", () => {
    test("it returns a blog with 200 status code", async () => {
      const testBlog = {
        id: 1,
        title: "Test",
        author: "Tester",
        content: "Testing...",
        year: 2022,
        month: 2,
        day: 18,
      };
      jest.spyOn(Blog, "findById").mockResolvedValue(new Blog(testBlog));
      const mockReq = { params: { id: 1 } };
      await blogsController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Blog(testBlog));
    });
  });

  describe("create", () => {
    test("it returns new blog with 201 status code", async () => {
      const testBlog = {
        title: "Test",
        author: "Tester",
        content: "Testing...",
        year: 2022,
        month: 2,
        day: 18,
      };
      jest
        .spyOn(Blog, "create")
        .mockResolvedValue(new Blog({ ...testBlog, id: 1 }));
      const mockReq = { body: testBlog };
      await blogsController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Blog({ ...testBlog, id: 1 }));
    });
  });

  describe("update", () => {
    test("it returns updated blog with 200 status code", async () => {
      const testBlog = {
        id: 1,
        title: "Test",
        content: "Testing...",
        year: 2022,
        month: 2,
        day: 18,
      };
      jest
        .spyOn(Blog.prototype, "update")
        .mockResolvedValue(new Blog({ ...testBlog, author: "Tester" }));
      const mockReq = { body: testBlog, params: { id: 1 } };
      await blogsController.update(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(
        new Blog({ ...testBlog, author: "Tester" })
      );
    });
  });

  describe("destroy", () => {
    test("it returns 204 status code on success", async () => {
      jest
        .spyOn(Blog.prototype, "destroy")
        .mockResolvedValue("Blog has been deleted");
      const mockReq = { params: { id: 1 } };
      await blogsController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    });
  });
});
