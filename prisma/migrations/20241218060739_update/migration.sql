/*
  Warnings:

  - A unique constraint covering the columns `[customerId,shopId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cart_customerId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "shopId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_customerId_shopId_key" ON "Cart"("customerId", "shopId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
