import { ApiProperty } from '@nestjs/swagger';

export class createPermissionDTO {
  @ApiProperty({
    description: 'Nome da permissão',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição da permissão',
    type: 'string',
    nullable: true,
  })
  description?: string;
}

export class createPermissionSuccessDTO {
  @ApiProperty({
    description: 'Id da permissão',
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Nome da permissão',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição da permissão',
    type: 'string',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Data da criação da permissão',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data da atualização da permissão',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Data que a permissão foi deletada',
    nullable: true,
  })
  deleted_at?: Date;
}

export class updatePermissionDTO {
  @ApiProperty({
    description: 'Nome da permissão',
    type: 'string',
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    description: 'Descrição da permissão',
    type: 'string',
    nullable: true,
  })
  description?: string;
}
