// import {PrismaClient} from "../generated/prisma/index.js"
// import dotenv from "dotenv"
// dotenv.config({ path: "./.env" })
// const globalForPrisma = globalThis;

// export const db = globalForPrisma.prisma || new PrismaClient();

// if(process.env.NODE_ENV !== "production") globalForPrisma = db;


import { PrismaClient } from "../generated/prisma/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;
