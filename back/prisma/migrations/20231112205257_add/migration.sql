/*
  Warnings:

  - You are about to drop the `nearby_landmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "nearby_landmarks" DROP CONSTRAINT "nearby_landmarks_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "nearby_landmarks" TEXT[];

-- DropTable
DROP TABLE "nearby_landmarks";
