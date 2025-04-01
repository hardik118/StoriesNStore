/*
  Warnings:

  - Added the required column `shopDesc` to the `UserShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserShop" ADD COLUMN     "shopDesc" TEXT NOT NULL;
