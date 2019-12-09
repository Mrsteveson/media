const request = require("supertest");
const server = require("../API/server.js");

describe("server", () => {
  it("sets the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return 200 OK", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("should return provided message", () => {
      const expected = {
        message: "Hello! This is the Media API by Pat Steveson."
      };
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });
});
