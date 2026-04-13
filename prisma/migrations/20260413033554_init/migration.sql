-- CreateEnum
CREATE TYPE "IndustryVertical" AS ENUM ('FINANCIAL_SERVICES', 'INSURANCE', 'CONSULTING', 'TECH', 'OTHER');

-- CreateEnum
CREATE TYPE "GTMModel" AS ENUM ('DIRECT_SALES', 'CHANNEL', 'CONSULTING_LED', 'PRODUCT_LED', 'OTHER');

-- CreateEnum
CREATE TYPE "PartnershipType" AS ENUM ('RESELLER', 'REFERRAL', 'BUILD', 'INTEGRATE', 'CO_SELL');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETE', 'FAILED');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "industry" "IndustryVertical" NOT NULL,
    "employeeCount" INTEGER NOT NULL,
    "aiMaturityLevel" INTEGER NOT NULL,
    "capabilities" TEXT NOT NULL,
    "clientBase" TEXT NOT NULL,
    "gtmModel" "GTMModel" NOT NULL,
    "partnershipGoals" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "partnershipTypes" "PartnershipType"[],
    "targetIndustries" "IndustryVertical"[],
    "idealPartnerProfile" JSONB NOT NULL,
    "minimumRequirements" JSONB NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchReport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "reportData" JSONB,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "cacheReadTokens" INTEGER,
    "cacheWriteTokens" INTEGER,

    CONSTRAINT "MatchReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatchReportToVendor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MatchReportToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_slug_key" ON "Vendor"("slug");

-- CreateIndex
CREATE INDEX "_MatchReportToVendor_B_index" ON "_MatchReportToVendor"("B");

-- AddForeignKey
ALTER TABLE "MatchReport" ADD CONSTRAINT "MatchReport_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchReportToVendor" ADD CONSTRAINT "_MatchReportToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "MatchReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchReportToVendor" ADD CONSTRAINT "_MatchReportToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
