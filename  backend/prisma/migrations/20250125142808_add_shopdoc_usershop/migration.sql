-- CreateTable
CREATE TABLE "UserShop" (
    "ShopId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserShop_pkey" PRIMARY KEY ("ShopId")
);

-- CreateTable
CREATE TABLE "ShopDoc" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaInfo" TEXT NOT NULL,
    "Tags" TEXT NOT NULL,
    "DocLink" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "ShopDoc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserShop" ADD CONSTRAINT "UserShop_ShopId_fkey" FOREIGN KEY ("ShopId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopDoc" ADD CONSTRAINT "ShopDoc_id_fkey" FOREIGN KEY ("id") REFERENCES "UserShop"("ShopId") ON DELETE RESTRICT ON UPDATE CASCADE;
