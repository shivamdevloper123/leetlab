import jwt from "jsonwebtoken"

import { db } from "../lib/db.js"
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";


const authMiddleware = asyncHandler(async (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json(new ApiError(401, "Unauthorized : Invalid token"))

    }


    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json(new ApiError(401, "Unauthorized : Invalid token"))

    }
    const user = await db.user.findUnique({
        where: {
            id: decoded.id
        },
        select: {
            id: true,
            image: true,
            name: true,
            email: true,
            role: true
        }
    })

    req.user = user;
    next()
})

const checkAdmin = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                role: true
            }
        })

        if (!user || user.role !== "ADMIN") {
            return res.status(403).json(new ApiError(403, "Access is denied - Admin only"))

        }
        next()
    } catch (error) {
        console.error("Error checking admin role:", error);
        res.status(500).json({ message: "Error checking admin role" });
    }
}

export { authMiddleware ,checkAdmin }