import express from "express"
import { register,login,logout,check } from "../controllers/auth.controllers.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const userRoutes = express.Router()

userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.post("/logout",authMiddleware,logout)
userRoutes.get("/check",authMiddleware,check)

export default userRoutes;