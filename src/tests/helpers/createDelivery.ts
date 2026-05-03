import request from "supertest"
import { app } from "@/app"

interface CreateDeliveryProps {
  token: string
  user_id: string
  description?: string
}

async function createDelivery({
  token,
  user_id,
  description = "Pacote teste",
}: CreateDeliveryProps) {
  const response = await request(app)
    .post("/deliveries")
    .set("Authorization", `Bearer ${token}`)
    .send({
      user_id,
      description,
    })

  return response.body
}

export { createDelivery }
