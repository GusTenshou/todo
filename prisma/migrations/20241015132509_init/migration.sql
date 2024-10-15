-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "toDo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "DateStart" TIMESTAMP(3) NOT NULL,
    "DateEnd" TIMESTAMP(3) NOT NULL,
    "Priority" "Priority" NOT NULL,

    CONSTRAINT "toDo_pkey" PRIMARY KEY ("id")
);
