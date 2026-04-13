import type { VendorProfile } from "./types"

export const VENDOR_PROFILES: VendorProfile[] = [
  {
    id: "anthropic",
    name: "Anthropic",
    slug: "anthropic",
    website: "https://www.anthropic.com/partners",
    description:
      "Anthropic builds AI systems that are safe, beneficial, and understandable. The Claude model family powers enterprise applications across document analysis, coding, customer service, and complex reasoning. Their partner program focuses on companies building production AI solutions for regulated industries.",
    partnershipTypes: ["BUILD", "INTEGRATE", "REFERRAL"],
    targetIndustries: [
      "FINANCIAL_SERVICES",
      "INSURANCE",
      "CONSULTING",
      "TECH",
      "OTHER",
    ],
    idealPartnerProfile: {
      minEmployees: 50,
      minAiMaturity: 2,
      requiredCapabilities: [
        "AI/ML solution development",
        "enterprise software delivery",
        "client advisory services",
      ],
      preferredGtm: ["CONSULTING_LED", "DIRECT_SALES", "PRODUCT_LED"],
    },
    minimumRequirements: {
      minEmployees: 20,
      minAiMaturity: 2,
      existingUseCases: [
        "At least one active AI pilot or production deployment",
        "Identified use cases for Claude in client engagements",
      ],
    },
  },
  {
    id: "openai",
    name: "OpenAI",
    slug: "openai",
    website: "https://openai.com/partners",
    description:
      "OpenAI develops advanced AI models including the GPT-4 series and o-series reasoning models. Their partnership program — including the ChatGPT Enterprise and API ecosystem — supports companies building AI-powered products and services at scale.",
    partnershipTypes: ["RESELLER", "BUILD", "INTEGRATE", "REFERRAL"],
    targetIndustries: [
      "FINANCIAL_SERVICES",
      "INSURANCE",
      "CONSULTING",
      "TECH",
      "OTHER",
    ],
    idealPartnerProfile: {
      minEmployees: 25,
      minAiMaturity: 2,
      requiredCapabilities: [
        "software development",
        "API integration",
        "enterprise solution delivery",
      ],
      preferredGtm: ["PRODUCT_LED", "DIRECT_SALES", "CONSULTING_LED"],
    },
    minimumRequirements: {
      minEmployees: 10,
      minAiMaturity: 2,
      existingUseCases: [
        "Active OpenAI API usage or committed spend",
        "Customer-facing AI feature or product",
      ],
    },
  },
  {
    id: "google-vertex",
    name: "Google Cloud (Vertex AI)",
    slug: "google-vertex",
    website: "https://cloud.google.com/partners",
    description:
      "Google Cloud's Vertex AI platform provides access to Gemini models alongside a full suite of MLOps tools, data infrastructure, and enterprise services. Their partner ecosystem prioritizes companies with strong cloud practices and data-intensive enterprise clients.",
    partnershipTypes: ["RESELLER", "CO_SELL", "INTEGRATE", "BUILD"],
    targetIndustries: ["FINANCIAL_SERVICES", "TECH", "INSURANCE", "OTHER"],
    idealPartnerProfile: {
      minEmployees: 100,
      minAiMaturity: 3,
      requiredCapabilities: [
        "cloud architecture",
        "data engineering",
        "enterprise software delivery",
        "Google Cloud certifications preferred",
      ],
      preferredGtm: ["DIRECT_SALES", "CHANNEL", "CONSULTING_LED"],
    },
    minimumRequirements: {
      minEmployees: 50,
      minAiMaturity: 3,
      existingUseCases: [
        "Active Google Cloud customer or existing GCP practice",
        "Demonstrated AI/ML project delivery on cloud",
      ],
    },
  },
  {
    id: "microsoft-azure-openai",
    name: "Microsoft (Azure OpenAI)",
    slug: "microsoft-azure-openai",
    website: "https://partner.microsoft.com",
    description:
      "Microsoft's Azure OpenAI Service brings GPT-4, DALL-E, and other models into the Azure enterprise ecosystem with compliance, security, and integration with M365 and Dynamics. Their partner program is one of the most structured in the industry, with tiered certifications and significant co-sell investment.",
    partnershipTypes: ["RESELLER", "CO_SELL", "INTEGRATE", "BUILD"],
    targetIndustries: ["FINANCIAL_SERVICES", "INSURANCE", "CONSULTING", "TECH"],
    idealPartnerProfile: {
      minEmployees: 200,
      minAiMaturity: 2,
      requiredCapabilities: [
        "Microsoft technology stack experience",
        "enterprise deployment",
        "regulated industry expertise",
        "Azure certifications preferred",
      ],
      preferredGtm: ["DIRECT_SALES", "CHANNEL", "CONSULTING_LED"],
    },
    minimumRequirements: {
      minEmployees: 50,
      minAiMaturity: 2,
      existingUseCases: [
        "Existing Microsoft partner relationship or Azure practice",
        "Clients using Microsoft 365 or Azure",
        "Track record in regulated industry implementations",
      ],
    },
  },
  {
    id: "cohere",
    name: "Cohere",
    slug: "cohere",
    website: "https://cohere.com/partners",
    description:
      "Cohere builds enterprise NLP models focused on security, deployment flexibility, and fine-tuning for domain-specific applications. Their Command and Embed models are widely used in financial services for document intelligence, compliance automation, and search.",
    partnershipTypes: ["BUILD", "INTEGRATE", "REFERRAL"],
    targetIndustries: ["FINANCIAL_SERVICES", "TECH", "INSURANCE"],
    idealPartnerProfile: {
      minEmployees: 50,
      minAiMaturity: 3,
      requiredCapabilities: [
        "NLP/document intelligence solutions",
        "financial services domain expertise",
        "enterprise software integration",
      ],
      preferredGtm: ["CONSULTING_LED", "DIRECT_SALES"],
    },
    minimumRequirements: {
      minEmployees: 25,
      minAiMaturity: 3,
      existingUseCases: [
        "Active use case in document processing, search, or classification",
        "Clients in financial services or regulated industries",
      ],
    },
  },
  {
    id: "mistral-ai",
    name: "Mistral AI",
    slug: "mistral-ai",
    website: "https://mistral.ai/partners",
    description:
      "Mistral AI develops open and proprietary frontier models known for efficiency and strong performance at smaller sizes. Their enterprise offering supports on-premise deployment, making them attractive for highly regulated environments requiring data sovereignty.",
    partnershipTypes: ["BUILD", "INTEGRATE", "REFERRAL"],
    targetIndustries: ["CONSULTING", "TECH", "FINANCIAL_SERVICES", "INSURANCE"],
    idealPartnerProfile: {
      minEmployees: 20,
      minAiMaturity: 2,
      requiredCapabilities: [
        "LLM deployment and integration",
        "consulting or systems integration",
        "European or regulated market expertise",
      ],
      preferredGtm: ["CONSULTING_LED", "PRODUCT_LED"],
    },
    minimumRequirements: {
      minEmployees: 10,
      minAiMaturity: 2,
      existingUseCases: [
        "Interest in or experience with open-source LLM deployment",
        "Clients with data sovereignty requirements",
      ],
    },
  },
  {
    id: "scale-ai",
    name: "Scale AI",
    slug: "scale-ai",
    website: "https://scale.com/partners",
    description:
      "Scale AI is the enterprise AI data platform for fine-tuning, evaluation, and RLHF. Their partner ecosystem focuses on companies helping enterprise clients build proprietary AI models using their own data, particularly in financial services and government sectors.",
    partnershipTypes: ["BUILD", "REFERRAL", "CO_SELL"],
    targetIndustries: ["FINANCIAL_SERVICES", "TECH", "OTHER"],
    idealPartnerProfile: {
      minEmployees: 100,
      minAiMaturity: 3,
      requiredCapabilities: [
        "AI model development and fine-tuning advisory",
        "data strategy and governance",
        "enterprise AI program management",
      ],
      preferredGtm: ["CONSULTING_LED", "DIRECT_SALES"],
    },
    minimumRequirements: {
      minEmployees: 50,
      minAiMaturity: 3,
      existingUseCases: [
        "Clients with proprietary data and AI training objectives",
        "Active AI model development or fine-tuning engagements",
      ],
    },
  },
  {
    id: "wandb",
    name: "Weights & Biases",
    slug: "wandb",
    website: "https://wandb.ai/partners",
    description:
      "Weights & Biases (W&B) is the ML platform for experiment tracking, model versioning, and LLM evaluation. Their partner program supports consulting firms and software companies helping enterprise clients build robust AI development practices.",
    partnershipTypes: ["INTEGRATE", "REFERRAL", "BUILD"],
    targetIndustries: ["TECH", "FINANCIAL_SERVICES", "OTHER"],
    idealPartnerProfile: {
      minEmployees: 50,
      minAiMaturity: 3,
      requiredCapabilities: [
        "MLOps and AI platform expertise",
        "enterprise AI development practices",
        "model lifecycle management",
      ],
      preferredGtm: ["CONSULTING_LED", "PRODUCT_LED"],
    },
    minimumRequirements: {
      minEmployees: 20,
      minAiMaturity: 3,
      existingUseCases: [
        "Active ML model development or LLM evaluation work",
        "Clients building or running ML pipelines",
      ],
    },
  },
  {
    id: "hugging-face",
    name: "Hugging Face",
    slug: "hugging-face",
    website: "https://huggingface.co/enterprise",
    description:
      "Hugging Face is the open-source AI community and enterprise platform hosting 500,000+ models, datasets, and Spaces. Their enterprise partner program supports companies delivering private model hubs, fine-tuning services, and open-source AI adoption programs.",
    partnershipTypes: ["BUILD", "INTEGRATE", "REFERRAL"],
    targetIndustries: ["TECH", "CONSULTING", "OTHER"],
    idealPartnerProfile: {
      minEmployees: 10,
      minAiMaturity: 3,
      requiredCapabilities: [
        "open-source AI model deployment",
        "ML engineering",
        "AI adoption advisory",
      ],
      preferredGtm: ["PRODUCT_LED", "CONSULTING_LED"],
    },
    minimumRequirements: {
      minEmployees: 5,
      minAiMaturity: 3,
      existingUseCases: [
        "Experience deploying or fine-tuning open-source models",
        "Clients interested in private model infrastructure",
      ],
    },
  },
  {
    id: "databricks",
    name: "Databricks",
    slug: "databricks",
    website: "https://www.databricks.com/partners",
    description:
      "Databricks is the data and AI platform built on Apache Spark and Delta Lake, with DBRX and integrated LLM capabilities through their AI platform. Their partner ecosystem prioritizes companies with strong data engineering practices serving data-heavy industries.",
    partnershipTypes: ["CO_SELL", "INTEGRATE", "RESELLER", "BUILD"],
    targetIndustries: ["FINANCIAL_SERVICES", "INSURANCE", "TECH", "OTHER"],
    idealPartnerProfile: {
      minEmployees: 200,
      minAiMaturity: 3,
      requiredCapabilities: [
        "data engineering and analytics",
        "Spark/Delta Lake expertise",
        "enterprise data platform delivery",
        "AI/ML on top of data platforms",
      ],
      preferredGtm: ["DIRECT_SALES", "CONSULTING_LED", "CHANNEL"],
    },
    minimumRequirements: {
      minEmployees: 100,
      minAiMaturity: 3,
      existingUseCases: [
        "Active Databricks customer or existing Databricks practice",
        "Data platform engagements in FS or insurance",
      ],
    },
  },
  {
    id: "aws-bedrock",
    name: "AWS (Amazon Bedrock)",
    slug: "aws-bedrock",
    website: "https://aws.amazon.com/partners/",
    description:
      "Amazon Web Services offers Bedrock — a fully managed service for building generative AI apps using foundation models from Anthropic, Meta, Mistral, and others. The AWS Partner Network is the largest cloud partner ecosystem, with deep incentive programs for companies serving enterprise AWS customers.",
    partnershipTypes: ["RESELLER", "CO_SELL", "INTEGRATE", "BUILD"],
    targetIndustries: [
      "FINANCIAL_SERVICES",
      "INSURANCE",
      "TECH",
      "CONSULTING",
      "OTHER",
    ],
    idealPartnerProfile: {
      minEmployees: 100,
      minAiMaturity: 2,
      requiredCapabilities: [
        "AWS cloud architecture",
        "enterprise software delivery on AWS",
        "AI/ML workload migration",
      ],
      preferredGtm: ["DIRECT_SALES", "CHANNEL", "CONSULTING_LED"],
    },
    minimumRequirements: {
      minEmployees: 25,
      minAiMaturity: 2,
      existingUseCases: [
        "Active AWS customer base or existing AWS practice",
        "At least one AI/ML workload running on AWS",
      ],
    },
  },
]
