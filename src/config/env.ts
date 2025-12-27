import "dotenv/config"
import z from "zod";

export const {DATABASE_URL,API_JWT_CONFIG, API_JWT_TIME,NODE_ENV} = z.object({
    DATABASE_URL: z.string(),
    API_JWT_CONFIG: z.string(),
    API_JWT_TIME:z.coerce.string(),
    NODE_ENV:z.enum(["DEV","DEPLOY"])
}).parse(process.env)