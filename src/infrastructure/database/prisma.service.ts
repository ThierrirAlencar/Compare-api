
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { DATABASE_URL, NODE_ENV } from 'src/config/env';
import { Logger } from '../utils/logger';
import { createCoreGroups } from './seeders/groupsSeeders';
import { createCorePermissions } from './seeders/permissionSeeder';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	private seeded = false;
	private l:Logger = new Logger(NODE_ENV=="DEPLOY","prismaService")

	constructor(){
			super({
				adapter: new PrismaPg({ connectionString: DATABASE_URL }),
				log:["error",]//"query","warn"]
			})
			
	}

	async seedPermissions(){
		try{
			//Check for Group Load permissions
			this.l.log("Trying to seed groups!")
			await createCoreGroups(this);
			//Check for Permissions
			this.l.log("Trying to seed permissions!")
			await createCorePermissions(this);
		}catch(err){
			this.l.error("Error while seeding new user groups! -> "+err);
		}
	}

	async onModuleInit() {
		await this.$connect();
		if (!this.seeded) {
			this.l.log("Prisma Instance Connected! Will now run Seeders if needed")
			NODE_ENV=="DEPLOY"?await this.seedPermissions():this.l.warn("Seeder not loaded because of development mode (may espect errors in permissions and groups)")
			this.seeded = true;
    	}
	}

    async enableShutdownHooks(app: INestApplication) {
      	this.$disconnect();
    }
}
