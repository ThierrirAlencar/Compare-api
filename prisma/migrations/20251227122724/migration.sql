-- CreateEnum
CREATE TYPE "StoreKind" AS ENUM ('TERABYTE', 'PICHAU', 'KABUM', 'ALIEXPRESS', 'OTHER');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "store" "StoreKind" NOT NULL DEFAULT 'OTHER',
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "title" TEXT,
    "description" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "link" TEXT NOT NULL,
    "where" TEXT NOT NULL,
    "imageUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "atDate" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "prodId" TEXT NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
