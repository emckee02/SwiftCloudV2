import mongoose from "mongoose";
import app from "../app";
import supertest from "supertest";
import 'dotenv/config';

const request = supertest(app);
let song_id;

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* Testing the API endpoints. */
describe("GET /api/v1.0/songs", () => {
  it("should return all songs", async () => {
    const res = await request.get("/api/v1.0/songs");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/v1.0/songs", () => {
  it("should create a song", async () => {
    const res = await request.post("/api/v1.0/songs").send({
      song: "New Song",
      artist: 'Taylor Swift',
      writer: 'Ed Sheeran',
      album: 'Folklore',
      year: 2024
    });
    expect(res.statusCode).toBe(201);
    song_id = res.body.id;
  });
});

describe("PUT /api/v1.0/songs/:id/month/:month", () => {
  it("should update song play count", async () => {
    const res = await request.put(`/api/v1.0/songs/${song_id}/month/June`);
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/v1.0/songs/:id", () => {
  it("should return a song", async () => {
    const res = await request.get(`/api/v1.0/songs/${song_id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.Song).toBe("New Song");
    expect(res.body['Plays - June']).toBe(1);
  });
});

describe("DELETE /api/v1.0/songs/:id", () => {
  it("should delete a song", async () => {
    const res = await request.delete(`/api/v1.0/songs/${song_id}`);
    expect(res.statusCode).toBe(204);
  });
});