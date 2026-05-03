import request from "supertest"
import { app } from "@/app"

interface CreateUserProps {
  name?: string
  email?: string
  password?: string
  role?: "customer" | "sale"
}

async function createUser({
  name = "Test user",
  email = `test+${Date.now()}@email.com`,
  password = "123456",
  role = "customer",
}: CreateUserProps = {}) {
  const response = await request(app).post("/users").send({
    name,
    email,
    password,
    role,
  })

  return {
    ...response.body,
    email,
    password,
  }
}

export { createUser }
