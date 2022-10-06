/*
  Warnings:

  - You are about to drop the column `userId` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `description` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "userId",
ADD COLUMN     "completedReps" INTEGER,
ADD COLUMN     "completedTime" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "distance" INTEGER,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL,
ADD COLUMN     "muscleGroup" TEXT,
ADD COLUMN     "reps" INTEGER,
ADD COLUMN     "timeAction" INTEGER,
ADD COLUMN     "timeRest" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "video" TEXT,
ADD COLUMN     "weight" INTEGER;

-- CreateTable
CREATE TABLE "ExercisesOnWorkouts" (
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExercisesOnWorkouts_pkey" PRIMARY KEY ("workoutId","exerciseId")
);

-- CreateTable
CREATE TABLE "CommonExercise" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reps" INTEGER,
    "weight" INTEGER,
    "distance" INTEGER,
    "timeAction" INTEGER,
    "timeRest" INTEGER,
    "muscleGroup" TEXT,
    "image" TEXT,
    "video" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedArAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommonExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExercisesOnWorkouts" ADD CONSTRAINT "ExercisesOnWorkouts_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnWorkouts" ADD CONSTRAINT "ExercisesOnWorkouts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
