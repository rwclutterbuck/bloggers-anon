const Fingerprint = require("../../../fingerprintjs/fingerprintModel");
const fingerprintController = require("../../../fingerprintjs/fingerprints");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("fingerprints controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("correctFingerprint", () => {
    test("it returns a boolean with status code 200", async () => {
      const mockReq = { body: { hash: "NO4H" } };
      jest.spyOn(Fingerprint.prototype, "checker").mockResolvedValue(true);
      await fingerprintController.correctFingerprint(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ access: true });
    });
  });
});
