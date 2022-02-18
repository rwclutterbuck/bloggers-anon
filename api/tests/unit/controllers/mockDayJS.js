const mock = jest.genMockFromModule("dayjs");
const dayjs = jest.requireActual("dayjs");
mock.dayjs = jest.fn().mockReturnValue("18/02/2022 03:24:00");

module.exports = mock;
