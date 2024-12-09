-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "RoleUser" NOT NULL DEFAULT 'User';
