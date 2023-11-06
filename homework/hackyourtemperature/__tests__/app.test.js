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

