import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"
import { createUser } from "./helpers/createUser"

describe("SessionsController", () => {
  let email: string
  let password: string

  afterEach(async () => {
    await prisma.deliveryLogs.deleteMany()
    await prisma.delivery.deleteMany()
    await prisma.user.deleteMany()
  })

  beforeEach(async () => {
    const user = await createUser({ role: "customer" })

    email = user.email
    password = user.password
  })

  it("should authenticate and get access token", async () => {
    const sessionResponse = await request(app).post("/sessions").send({
      email,
      password,
    })

    expect(sessionResponse.status).toBe(200)
    expect(sessionResponse.body.token).toEqual(expect.any(String))
  })
})
