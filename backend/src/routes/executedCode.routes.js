import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {executedCode } from "../controllers/executeCode.controller.js";


const executionRoute = express.Router();


executionRoute.post("/" , authMiddleware , executedCode)



export default executionRoute;

