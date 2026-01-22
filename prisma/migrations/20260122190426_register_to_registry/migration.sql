/*
  Warnings:

  - You are about to drop the `register` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "register";

-- CreateTable
CREATE TABLE "registry" (
    "id" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'DEACTIVE',
    "store" "StoreKind" NOT NULL DEFAULT 'OTHER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "registry_pkey" PRIMARY KEY ("id")
);
