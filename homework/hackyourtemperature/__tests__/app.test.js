import app from "../app.js";
import request from "supertest";

// import supertest from "supertest";
// const request = supertest(app);

describe("POST /weather", () => {
  it("Should return 400 and city name as undefined if city name is missing from the request body", async () => {
    const response = await request(app).post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body.cityName).toBeUndefined();
  });

  it("Should return 404 if city name is wrong or not found", async () => {
    const response = await request(app)
      .post("/weather")
      .send({ cityName: "blablaCity" });
    expect(response.status).toBe(404);
  });

  it("Should return 200 and have two properties: cityName and temprature", async () => {
    const response = await request(app)
      .post("/weather")
      .send({ cityName: "london" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("cityName");
    expect(response.body).toHaveProperty("temperature");
  });

  it("Should return 200 if city name is correct", async () => {
    const response = await request(app)
      .post("/weather")
      .send({ cityName: "london" });
    expect(response.status).toBe(200);
  });
});

// const request = require("supertest");
// const app = require("./app.js");
// ​
// describe("POST /posts", () => {
//   describe("given a new blog post title and content", () => {
//     it("should respond with a 201 status code", (done) => {
//       request(app)
//         .post("/posts")
//         .send({ title: "title", content: "random content" })
//         .expect(201)
//         .end(done);
//     });
// ​
//     it("should respond with content-type text/plain", (done) => {
//       request(app)
//         .post("/posts")
//         .send({ title: "title", content: "random content" })
//         .expect("Content-Type", /text\/plain/)
//         .end(done);
//     });
//   });
// ​
//   describe("given only content", () => {
//     it("should respond with a 400 status code", (done) => {
//       request(app)
//         .post("/posts")
//         .send({ content: "random content" })
//         .expect(400)
//         .end(done);
//     });
//   });
// });
