-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "permission" ALTER COLUMN "deleted_at" DROP NOT NULL;
