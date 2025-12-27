import "dotenv/config"
import z from "zod";

export const {DATABASE_URL,API_JWT_CONFIG} = z.object({
    DATABASE_URL: z.string(),
    API_JWT_CONFIG: z.string(),
}).parse(process.env)