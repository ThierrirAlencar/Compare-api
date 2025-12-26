
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { DATABASE_URL } from 'src/config/env';

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit {
	constructor(){
		super({
			adapter: new PrismaPg({ connectionString: DATABASE_URL }),
			log:["error","query","warn"]
		})
	}

	async onModuleInit() {
		await this.$connect()
	}

    async enableShutdownHooks(app: INestApplication) {
      	this.$disconnect();
    }
}
