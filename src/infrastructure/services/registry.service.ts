import { Injectable } from "@nestjs/common";
import { RegistryDTO } from "src/app/dtos/registry/registry.dto";
import { SearchRegistryDTO } from "src/app/dtos/registry/search-registry.dto";
import { RegistryRepository } from "src/core/repositories/registry.repository";

@Injectable()
export class RegistryService {
    constructor(
        private readonly registryRepository: RegistryRepository,
    ){}

    async search(data: SearchRegistryDTO) {
        const result = await this.registryRepository.search(data);
        const registrys: RegistryDTO[] = result.map(registry => {
            const {created_at,deleted_at,id,status,store,update_at} = registry;
            return {
                id,
                status,
                store,
                createdAt:created_at,
                updatedAt:update_at,
                deletedAt:deleted_at,
            }
        })
        return registrys;
    }
}