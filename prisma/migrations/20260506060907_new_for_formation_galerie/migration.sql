-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('PHOTO', 'VIDEO');

-- CreateEnum
CREATE TYPE "CategorieMedia" AS ENUM ('COURS', 'EVENEMENT', 'EXAMENS', 'VIE_CAMPUS', 'ALLEMAGNE', 'AUTRE');

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "categorie" "CategorieMedia" NOT NULL,
    "publie" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
