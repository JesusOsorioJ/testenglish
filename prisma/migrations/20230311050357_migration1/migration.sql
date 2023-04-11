-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "wordSpanish" TEXT NOT NULL,
    "wordEnglish" TEXT NOT NULL,
    "sentenceSpanish" TEXT NOT NULL,
    "sentenceEnglish" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);
