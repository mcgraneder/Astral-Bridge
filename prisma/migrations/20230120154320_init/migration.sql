-- CreateTable
CREATE TABLE "User" (
    "publicAddress" TEXT NOT NULL,
    "nonce" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("publicAddress")
);
