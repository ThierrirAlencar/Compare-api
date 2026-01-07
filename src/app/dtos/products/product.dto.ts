import { ApiProperty } from "@nestjs/swagger";
import { GeneralStatus, Price, Product, StoreKind } from "generated/prisma/client"

export class ProductDTO {
  @ApiProperty({
    example: 'b3a1f9d2-4a6e-4c3d-9f12-123456789abc',
  })
  id: string;

  @ApiProperty({
    example: 'mouse-gamer-logitech-g203',
  })
  slug: string;

  @ApiProperty({
    enum: StoreKind,
    example: StoreKind.ALIEXPRESS,
  })
  store: StoreKind;

  @ApiProperty({
    enum: GeneralStatus,
    example: GeneralStatus.ACTIVE,
  })
  status: GeneralStatus;

  @ApiProperty({
    example: 'Mouse Gamer Logitech G203',
    nullable: true,
  })
  title: string | null;

  @ApiProperty({
    example: 'Mouse gamer com sensor de alta precisão',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: 199.9,
  })
  value: number;

  @ApiProperty({
    example: 'https://www.amazon.com.br/produto',
  })
  link: string;

  @ApiProperty({
    example: 'Amazon Brasil',
  })
  where: string;

  @ApiProperty({
    example: 'https://cdn.site.com/images/produto.png',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    example: '2025-01-01T12:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  created_at: Date;

  @ApiProperty({
    example: '2025-01-02T12:00:00.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  updated_at: Date | null;

  @ApiProperty({
    example: '2025-01-10T12:00:00.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  deleted_at: Date;

  @ApiProperty({
    type:"object",
    properties:{
      "id":{
        type:"string",
        description:"Price id"
      },
      "atDate":{
        type:"string",
        format:"date-time"
      },
      "price":{
        type:"number"
      },
      "prodId":{
        type:"string",
        description:"The id of the product"
      }
    }
  })
  priceHistory: Price[]
}