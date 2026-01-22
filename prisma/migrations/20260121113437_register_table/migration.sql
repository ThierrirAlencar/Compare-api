-- CreateTable
CREATE TABLE "register" (
    "id" TEXT NOT NULL,
    "status" "GeneralStatus" NOT NULL DEFAULT 'DEACTIVE',
    "store" "StoreKind" NOT NULL DEFAULT 'OTHER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "register_pkey" PRIMARY KEY ("id")
);
