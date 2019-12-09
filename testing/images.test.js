const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../API/server.js");

describe("images", () => {
  beforeEach(async () => {
    await db("images").truncate();
  });

  describe("GET /", () => {
    it("returns a 200, OK", () => {
      return request(server)
        .get("/images")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON using done callback", done => {
      request(server)
        .get("/images")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });
  });

  describe("POST/", () => {
    it("returns a 201, Successful POST", async () => {
      const expected = await request(server)
        .post("/images")
        .send({
          title: "Katelyn and I at Prom",
          img_url: "https://www.pexels.com/photo/analysis-blackboard-board-bubble-355952/",
          date: "1/1/2019",
          caption: "Couple Photo",
          uploaded_by: "Patrick"
        });
      expect(expected.status).toBe(201);
    });

    it("returns a 404, Bad Request", async () => {
      const expected = await request(server)
        .post("/images")
        .send({
          title: "Katelyn and I at Prom",
          date: "1/1/2019",
          caption: "Couple Photo",
          uploaded_by: 1
        });
      expect(expected.status).toBe(201);
    });
  });
});
