-- DropForeignKey
ALTER TABLE "Chain" DROP CONSTRAINT "Chain_userId_fkey";

-- AlterTable
ALTER TABLE "Chain" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'unnamed';

-- AddForeignKey
ALTER TABLE "Chain" ADD CONSTRAINT "Chain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
