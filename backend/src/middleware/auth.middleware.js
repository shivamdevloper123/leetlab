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

export { authMiddleware }