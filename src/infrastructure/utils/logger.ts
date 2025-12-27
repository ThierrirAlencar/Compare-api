import * as winston from "winston";

enum LogLevel {
    LOG = "info",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug",
}

export class Logger {
    private winstonLogger: winston.Logger;
    private deploy: boolean = false;
    private context: string = "";

    constructor(deploy: boolean = false, context: string = "") {
        this.deploy = deploy;
        this.context = context;
        
        this.winstonLogger = winston.createLogger({
            level: deploy ? "info" : "debug",
            format: winston.format.combine(
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json()
            ),
            defaultMeta: { service: context || "app" },
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.printf(
                            ({ timestamp, level, message, context }) =>
                                `[${timestamp}] [${level}] ${context ? `[${context}]` : ""} ${message}`
                        )
                    ),
                }),
                ...(!deploy ? [
                    new winston.transports.File({
                        filename: "logs/error.log",
                        level: "error",
                    }),
                    new winston.transports.File({
                        filename: "logs/combined.log",
                    }),
                ] : []),
            ],
        });
    }

    log(text: string, meta?: Record<string, any>): void {
        this.winstonLogger.log(LogLevel.LOG, text, meta);
    }

    info(text: string, meta?: Record<string, any>): void {
        this.winstonLogger.info(text, meta);
    }

    warn(text: string, meta?: Record<string, any>): void {
        this.winstonLogger.warn(text, meta);
    }

    error(text: string, error?: Error | Record<string, any>, meta?: Record<string, any>): void {
        if (error instanceof Error) {
            this.winstonLogger.error(text, { error: error.message, stack: error.stack, ...meta });
        } else {
            this.winstonLogger.error(text, { ...error, ...meta });
        }
    }

    debug(text: string, meta?: Record<string, any>): void {
        this.winstonLogger.debug(text, meta);
    }

    setContext(context: string): void {
        this.context = context;
    }
}