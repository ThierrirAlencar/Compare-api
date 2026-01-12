import { promise } from 'zod';
import data from './.temp/productsData.json'
import { GeneralStatus, PrismaClient, StoreKind } from 'generated/prisma/client';
import { DATABASE_URL } from 'src/config/env';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: DATABASE_URL })
});

(async()=>{
    await Promise.all(data.map(async e=>{
        await prisma.product.create({
            data:{
                link:e.Link,
                slug:e.Slug,
                where:e.Where,
                imageUrl:e.ImageUrl,
                value:e.Value,
                created_at:new Date(),
                description:e.Description,
                status:GeneralStatus.ACTIVE,
                // store:e.Kind as StoreKind,
                title:e.Title
            }
        })
    }))
})()

