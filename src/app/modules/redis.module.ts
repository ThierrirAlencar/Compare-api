import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisService } from "src/infrastructure/database/redis.service";

@Global()
@Module({
    imports:[ConfigModule],
    providers:[RedisService],
    exports:[RedisService],
})
export class RedisModule {}