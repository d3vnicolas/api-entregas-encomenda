import { Router } from "express"
import { userRoutes } from "./users"
import { sessionsRoutes } from "./sessions"

const routes = Router()
routes.use("/users", userRoutes)
routes.use("/sessions", sessionsRoutes)

export { routes }
