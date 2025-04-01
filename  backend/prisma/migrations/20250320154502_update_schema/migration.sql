-- DropForeignKey
ALTER TABLE "UserShop" DROP CONSTRAINT "UserShop_ShopId_fkey";

-- AddForeignKey
ALTER TABLE "UserShop" ADD CONSTRAINT "UserShop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
