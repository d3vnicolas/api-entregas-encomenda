import request from "supertest"
import { app } from "@/app"
import { createUser } from "./helpers/createUser"
import { authenticateUser } from "./helpers/authUser"
import { createDelivery } from "./helpers/createDelivery"
import { prisma } from "@/database/prisma"

describe("DeliveriesStatusController", () => {
  let saleToken: string
  let deliveryId: string

  beforeEach(async () => {
    const sale = await createUser({ role: "sale" })
    const customer = await createUser({ role: "customer" })

    saleToken = await authenticateUser(sale.email, sale.password)

    const delivery = await createDelivery({
      token: saleToken,
      user_id: customer.id,
    })

    deliveryId = delivery.id
  })

  afterEach(async () => {
    await prisma.deliveryLogs.deleteMany()
    await prisma.delivery.deleteMany()
    await prisma.user.deleteMany()
  })

  it("should update delivery status successfully", async () => {
    const response = await request(app)
      .patch(`/deliveries/${deliveryId}/status`)
      .set("Authorization", `Bearer ${saleToken}`)
      .send({
        status: "delivered",
      })

    expect(response.status).toBe(200)
  })
})
