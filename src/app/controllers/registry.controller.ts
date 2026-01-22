import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { SearchRegistryDTO } from "../dtos/registry/search-registry.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RegistryDTO } from "../dtos/registry/registry.dto";
import { RegistryService } from "src/infrastructure/services/registry.service";

@UseInterceptors(CacheInterceptor)
@ApiTags("Registry")
@Controller("registry")
export class RegistryController {
    constructor(
        private readonly registryService: RegistryService,
    ){}

    @ApiOkResponse({
        description:"Success, doesn't mean something was found.",
        type: RegistryDTO,
        isArray: true,
    })
    @CacheKey("registry_search")
    @CacheTTL(300)
    @Get("search")
    @UseGuards(AuthGuard("jwt"))
    async search(@Query() data: SearchRegistryDTO) {
        const result = await this.registryService.search(data);
        return result;
    }
}