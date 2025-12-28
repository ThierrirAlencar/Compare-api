import { Module } from "@nestjs/common";
import { RepositoryModule } from "./repository.module";
import { ProductService } from "src/infrastructure/services/product.service";
import { ProductController } from "../controllers/product.controller";

@Module({
    imports:[RepositoryModule],
    providers:[ProductService],
    controllers:[ProductController],
})
export class ProductModule {}