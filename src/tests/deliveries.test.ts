import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"
import { createUser } from "./helpers/createUser"
import { authenticateUser } from "./helpers/authUser"
import { createDelivery } from "./helpers/createDelivery"

describe("DeliveriesController", () => {
  let saleToken: string
  let deliveryId: string
  let customerId: string

  beforeEach(async () => {
    const sale = await createUser({ role: "sale" })
    const customer = await createUser({ role: "customer" })

    saleToken = await authenticateUser(sale.email, sale.password)

    const delivery = await createDelivery({
      token: saleToken,
      user_id: customer.id,
    })

    deliveryId = delivery.id
    customerId = customer.id
  })

  afterEach(async () => {
    await prisma.deliveryLogs.deleteMany()
    await prisma.delivery.deleteMany()
    await prisma.user.deleteMany()
  })

  it("should create a new delivery successfully", async () => {
    const response = await request(app)
      .post("/deliveries")
      .set("Authorization", `Bearer ${saleToken}`)
      .send({
        user_id: customerId,
        description: "pacote teste",
      })

    expect(response.status).toBe(201)
  })

  it("should list all deliveries", async () => {
    const response = await request(app)
      .get("/deliveries")
      .set("Authorization", `Bearer ${saleToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })
})
