const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("../server.js");

describe("users", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("GET /", () => {
    it("returns a 200, OK", () => {
      return request(server)
        .get("/users")
        .expect(200);
    });

    it("should return JSON using done callback", done => {
      request(server)
        .get("/users")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });
  });

  describe("GET /:id", () => {
    it("returns a 200, OK", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "Player7", password: "pass" });

      const expected = await request(server).get("/users/1");
      expect(expected.status).toBe(200);
    });

    it("returns a 404, Bad Request", async () => {
        await request(server)
          .post("/auth/register")
          .send({ username: "Pat", password: "pass" });
  
        const expected = await request(server).get("/users/7");
        expect(expected.status).toBe(404);
      });
  });

  describe("PUT /:id", () => {
    it("returns a 200, Successful Update", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "Patrick", password: "pass" });

      const expected = await request(server)
        .put("/users/1")
        .send({ username: "Taylor", password: "pass" });
      expect(expected.status).toBe(200);
    });

    it("returns a 404, bad request on invalid update id", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "Patrick", password: "pass" });

      const expected = await request(server)
        .put("/users/5")
        .send({ username: "Mr Pat", password: "pass" });
      expect(expected.status).toBe(404);
    });
  });
});