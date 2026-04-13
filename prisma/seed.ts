import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { VENDOR_PROFILES } from "../lib/vendor-profiles"

const FEATURED = ["anthropic", "openai", "microsoft-azure-openai", "google-vertex"]

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding vendors...")

  for (const vendor of VENDOR_PROFILES) {
    await prisma.vendor.upsert({
      where: { slug: vendor.slug },
      update: {
        name: vendor.name,
        website: vendor.website,
        description: vendor.description,
        partnershipTypes: vendor.partnershipTypes,
        targetIndustries: vendor.targetIndustries,
        idealPartnerProfile: vendor.idealPartnerProfile,
        minimumRequirements: vendor.minimumRequirements,
        featured: FEATURED.includes(vendor.slug),
      },
      create: {
        id: vendor.id,
        name: vendor.name,
        slug: vendor.slug,
        website: vendor.website,
        description: vendor.description,
        partnershipTypes: vendor.partnershipTypes,
        targetIndustries: vendor.targetIndustries,
        idealPartnerProfile: vendor.idealPartnerProfile,
        minimumRequirements: vendor.minimumRequirements,
        featured: FEATURED.includes(vendor.slug),
      },
    })
    console.log(`  ✓ ${vendor.name}`)
  }

  console.log(`\nSeeded ${VENDOR_PROFILES.length} vendors successfully.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
