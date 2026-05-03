import request from "supertest"
import { app } from "@/app"

async function authenticateUser(email: string, password: string) {
  const response = await request(app).post("/sessions").send({
    email,
    password,
  })

  return response.body.token
}

export { authenticateUser }
