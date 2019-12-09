const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../API/server.js");

describe("quotes", () => {
  beforeEach(async () => {
    await db("quotes").truncate();
  });

  describe("GET/", () => {
    it("returns a 200, OK", () => {
      return request(server)
        .get("/quotes")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON using done callback", done => {
      request(server)
        .get("/quotes")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });
  });

  describe("GET/:id", () => {
    it("returns a 200, OK", async () => {
      await request(server)
        .post("/quotes")
        .send({
          origin: "Katelyn",
          content: "It's not what you say, it's how you say it.",
          date: "1/1/2019",
          context: "Talking about if I am funny or not",
          uploaded_by: "Patrick"
        });

      const expected = await request(server).get("/quotes/1");
      expect(expected.status).toBe(200);
    });
  });

  describe("POST/", () => {
    it("returns a 201, Successful POST", async () => {
      const expected = await request(server)
        .post("/quotes")
        .send({
          origin: "Katelyn",
          content: "It's not what you say, it's how you say it.",
          date: "1/1/2019",
          context: "Talking about if I am funny or not",
          uploaded_by: "Patrick"
        });
      expect(expected.status).toBe(201);
    });

    it("returns a 404, Bad Request", async () => {
        const expected = await request(server)
          .post("/quotes")
          .send({
            origin: "Katelyn",
            content: 1,
            date: "1/1/2019",
            context: "Talking about if I am funny or not",
            uploaded_by: 7
          });
        expect(expected.status).toBe(201);
      });
  });

  describe("PUT/:id", () => {
    it("returns a 200, 0K", async () => {
      await request(server)
        .post("/quotes")
        .send({
          origin: "Katelyn",
          content: "It's not what you say, it's how you say it.",
          date: "1/1/2019",
          context: "Talking about if I am funny or not",
          uploaded_by: "Patrick"
        });

      const expected = await request(server)
        .put("/quotes/1")
        .send({
          origin: "Patrick",
          content: "It's not what you say, it's how you say it.",
          date: "1/1/2019",
          context: "Talking about if I am funny or not",
          uploaded_by: "Patrick"
        });
      expect(expected.status).toBe(200);
    });
  });

  describe("DELETE/:id", () => {
    it("returns a 200, OK", async () => {
      await request(server)
        .post("/quotes")
        .send({
          origin: "Katelyn",
          content: "It's not what you say, it's how you say it.",
          date: "1/1/2019",
          context: "Talking about if I am funny or not",
          uploaded_by: "Patrick"
        });

      const expected = await request(server)
        .delete("/quotes/1")
        .then(res => {
          expect(expected.status).toBe(200);
        });
    });

    it("returns a 404, Bad Request", async () => {
      await request(server)
        .delete("/quotes/2")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
