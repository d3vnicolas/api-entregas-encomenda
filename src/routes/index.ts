import { Router } from "express"
import { userRoutes } from "./users"
import { sessionsRoutes } from "./sessions"
import { deliveriesRoutes } from "./deliveries"
import { deliveriesLogsRoutes } from "./deliveriesLogs"

const routes = Router()
routes.use("/users", userRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", deliveriesRoutes)
routes.use("/deliveries-logs", deliveriesLogsRoutes)

export { routes }
