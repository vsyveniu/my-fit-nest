/*
  Warnings:

  - You are about to drop the column `isToday` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "isToday" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "isToday";
