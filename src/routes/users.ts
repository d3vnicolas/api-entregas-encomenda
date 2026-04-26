import { Router } from "express"
import { UsersController } from "@/controller/users"

const userRoutes = Router()
const usersController = new UsersController()

userRoutes.post("/", usersController.create)

export { userRoutes }
