-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "submissionType" TEXT NOT NULL,
    "codeSnippet" TEXT,
    "hasScreenshot" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Evaluation_createdAt_idx" ON "Evaluation"("createdAt");
