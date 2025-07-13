require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const jwt = require("jsonwebtoken");

jest.setTimeout(10000);

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.create({
    name: "SummaryTester",
    email: "summary@test.com",
    passwordHash: "hashed",
  });

  userId = user._id;
  token = jwt.sign({ userId }, process.env.JWT_SECRET);

  const transactions = [
    {
      title: "Salary Jan",
      amount: 50000,
      type: "income",
      category: "Job",
      date: new Date("2025-01-10"),
      userId,
    },
    {
      title: "Rent Jan",
      amount: 12000,
      type: "expense",
      category: "Housing",
      date: new Date("2025-01-05"),
      userId,
    },
    {
      title: "Freelance Feb",
      amount: 25000,
      type: "income",
      category: "Side Hustle",
      date: new Date("2025-02-15"),
      userId,
    },
    {
      title: "Food Feb",
      amount: 5000,
      type: "expense",
      category: "Groceries",
      date: new Date("2025-02-20"),
      userId,
    },
  ];

  await Transaction.insertMany(transactions);
});

afterAll(async () => {
  try {
    if (userId) {
      await Transaction.deleteMany({ userId });
      await User.findByIdAndDelete(userId);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error("afterAll cleanup failed:", err);
  }
});

describe("GET /api/reports/monthly", () => {
  it("should return monthly summary for 2025", async () => {
    const res = await request(app)
      .get("/api/reports/monthly?year=2025")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ month: 1, income: 50000, expense: 12000 }),
        expect.objectContaining({ month: 2, income: 25000, expense: 5000 }),
      ])
    );
  });

  it("should return 400 if year is missing", async () => {
    const res = await request(app)
      .get("/api/reports/monthly")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Year is required");
  });
});

describe("GET /api/reports/yearly", () => {
  it("should return yearly summary", async () => {
    const res = await request(app)
      .get("/api/reports/yearly")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ year: 2025, income: 75000, expense: 17000 }),
      ])
    );
  });
});
