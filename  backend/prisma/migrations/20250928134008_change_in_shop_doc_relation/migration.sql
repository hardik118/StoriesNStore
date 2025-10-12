-- DropForeignKey
ALTER TABLE "ShopDoc" DROP CONSTRAINT "ShopDoc_id_fkey";

-- AddForeignKey
ALTER TABLE "ShopDoc" ADD CONSTRAINT "ShopDoc_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "UserShop"("ShopId") ON DELETE RESTRICT ON UPDATE CASCADE;
