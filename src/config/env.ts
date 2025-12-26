import "dotenv/config"
import z from "zod";

export const {DATABASE_URL,JWT_SECRET} = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
}).parse(process.env)