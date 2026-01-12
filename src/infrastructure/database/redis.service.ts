import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PORT } from 'src/config/env';

export class RedisService {
    private readonly client: Redis;
    constructor(private readonly config: ConfigService) {
        this.client = new Redis({
            host:REDIS_HOST,
            port:REDIS_PORT,
            lazyConnect: true,
        })
    }

    async getClient(): Promise<Redis> {
        if(this.client.status === 'end') {
            await this.client.connect();
        }
        return this.client;
    }

    async set(
        key: string,
        value: string,
        ttlSeconds?: number,
    ): Promise<void> {
        const redis = await this.getClient();
        if (ttlSeconds) {
            await redis.set(key, value, 'EX', ttlSeconds);
            return;
        }
        await redis.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        const redis = await this.getClient();
        return redis.get(key);
    }

    async del(key: string): Promise<void> {
        const redis = await this.getClient();
        await redis.del(key);
    }

    async getdel(key: string): Promise<string | null> {
        const redis = await this.getClient();
        return redis.getdel(key);
    }

    async exists(key: string): Promise<boolean> {
        const redis = await this.getClient();
        return (await redis.exists(key)) === 1;
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}