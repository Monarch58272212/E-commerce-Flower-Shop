-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_parentId_fkey";

-- AlterTable
ALTER TABLE "Reply" ALTER COLUMN "commentId" DROP NOT NULL,
ALTER COLUMN "parentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
