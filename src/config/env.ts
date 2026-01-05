import "dotenv/config"
import z from "zod";

export const {DATABASE_URL,API_JWT_CONFIG, API_JWT_TIME,NODE_ENV, PORT,API_HOST,ADMIN_EMAIL,ADMIN_PASSWORD} = z.object({
    DATABASE_URL: z.string(),
    API_JWT_CONFIG: z.string(),
    API_JWT_TIME:z.coerce.string(),
    NODE_ENV:z.enum(["DEV","DEPLOY"]),
    PORT:z.coerce.number().default(3000),
    API_HOST:z.string().default("0.0.0.0"),
    ADMIN_EMAIL:z.string().email(),
    ADMIN_PASSWORD:z.string()
}).parse(process.env)