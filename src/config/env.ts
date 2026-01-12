import "dotenv/config"
import z from "zod";

export const _env = z.object({
    DATABASE_URL: z.string(),
    API_JWT_CONFIG: z.string(),
    API_JWT_TIME:z.coerce.string(),
    NODE_ENV:z.enum(["DEV","DEPLOY"]).default("DEV"),
    PORT:z.coerce.number().default(3000),
    API_HOST:z.string().default("0.0.0.0"),
    ADMIN_EMAIL:z.string().email(),
    ADMIN_PASSWORD:z.string(),
    REDIS_HOST:z.string(),
    REDIS_PORT:z.coerce.number()
}).parse(process.env)

export const {
    DATABASE_URL,
    API_JWT_CONFIG, 
    API_JWT_TIME,
    NODE_ENV, 
    PORT,
    API_HOST,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    REDIS_HOST,
    REDIS_PORT
    } = _env
