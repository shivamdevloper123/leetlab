import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/auth.routes.js"
dotenv.config({ path: "./.env" })
const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("hello welcome to the leet-lab 🔥")
})

app.use("/api/v1/auth", userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})