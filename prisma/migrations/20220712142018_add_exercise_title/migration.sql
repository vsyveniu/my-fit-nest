/*
  Warnings:

  - Added the required column `title` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isToday` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "isToday" BOOLEAN NOT NULL;
