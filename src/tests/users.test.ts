import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("usersController", () => {
  afterEach(async () => {
    await prisma.deliveryLogs.deleteMany()
    await prisma.delivery.deleteMany()
    await prisma.user.deleteMany()
  })

  it("should create a new user successfully", async () => {
    const email = `testuser+${Date.now()}@email.com`

    const response = await request(app).post("/users").send({
      name: "Test user",
      email,
      password: "passwordtestuser",
      role: "customer",
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body.name).toBe("Test user")
  })

  it("should throw an error if user with same email already exists", async () => {
    const email = `testuser+${Date.now()}@email.com`

    // cria primeiro
    await request(app).post("/users").send({
      name: "Test user",
      email,
      password: "passwordtestuser",
      role: "customer",
    })

    // tenta duplicar
    const response = await request(app).post("/users").send({
      name: "Duplicate user",
      email,
      password: "passwordtestuser",
      role: "customer",
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User with same email already exists")
  })

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Test user",
      email: "invalid-email",
      password: "passwordtestuser",
      role: "customer",
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("validation error")
  })
})
