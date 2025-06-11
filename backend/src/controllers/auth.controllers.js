import bcrypt, { hash } from "bcryptjs"

import { db } from "../lib/db.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { UserRole } from "../generated/prisma/index.js"
import { asyncHandler } from "../utils/async-handler.js"
import jwt from "jsonwebtoken"


 

const register = asyncHandler(async (req, res) => {
    const { email, password, name ,role} = req.body

    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })
    if (existingUser) {
        return res.status(400).json(new ApiError(400, "User already exists"))
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
        data: {
            name,
            password: hashedPassword,
            email,
            role: UserRole.USER
        }
    })
    const token = jwt.sign({ id: newUser },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    const cookieOption = {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

    res.cookie("jwt", token, cookieOption)

    res.status(201).json(new ApiResponse(201, {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image
    }, "User registered successfully"))

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await db.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return res.status(401).json(new ApiError(401, "User not found"))
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json(new ApiError(401, "Invalid credentials"))

    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    const cookieOption = {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

    res.cookie("jwt", token, cookieOption)

    res.status(200).json({
        success: true,
        message: "User Logged in successfully",
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image
        }
    })


})

const logout = asyncHandler(async (req, res) => {
    const cookieOption = {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }


    res.clearCookie("jwt", cookieOption)
    res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"))
})

const check = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(
        200,
        { user: req.user },
        "User authenticated successfully"
    ))
})

export {
    register,
    logout,
    login,
    check
}
