-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('MOVIE', 'SERIES', 'TV_CHANNEL');

-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('G', 'PG', 'PG13', 'R', 'TVY', 'TVG', 'TVPG', 'TV14', 'TVMA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "duration" TEXT,
    "rating" "Rating" NOT NULL,
    "type" "ContentType" NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "backdropUrl" TEXT NOT NULL,
    "trailerUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "cast" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MyList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToContent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToContent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Content_title_idx" ON "Content"("title");

-- CreateIndex
CREATE INDEX "Content_type_idx" ON "Content"("type");

-- CreateIndex
CREATE UNIQUE INDEX "MyList_userId_contentId_key" ON "MyList"("userId", "contentId");

-- CreateIndex
CREATE INDEX "_CategoryToContent_B_index" ON "_CategoryToContent"("B");

-- AddForeignKey
ALTER TABLE "MyList" ADD CONSTRAINT "MyList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyList" ADD CONSTRAINT "MyList_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToContent" ADD CONSTRAINT "_CategoryToContent_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToContent" ADD CONSTRAINT "_CategoryToContent_B_fkey" FOREIGN KEY ("B") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
