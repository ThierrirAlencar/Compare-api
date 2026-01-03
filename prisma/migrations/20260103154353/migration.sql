-- CreateTable
CREATE TABLE "trigger" (
    "id" TEXT NOT NULL,
    "targetPrice" DOUBLE PRECISION NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "prodId" TEXT NOT NULL,

    CONSTRAINT "trigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trigger" ADD CONSTRAINT "trigger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger" ADD CONSTRAINT "trigger_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
