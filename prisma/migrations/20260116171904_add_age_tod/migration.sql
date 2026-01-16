/*
  Warnings:

  - You are about to drop the column `reply` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `message` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "reply",
ADD COLUMN     "message" TEXT NOT NULL;
