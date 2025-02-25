"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ComplianceItem = {
  name: string
  description: string
}

type ComplianceCategory = {
  title: string
  items: ComplianceItem[]
}

const complianceCategories: ComplianceCategory[] = [
  {
    title: "Data Privacy & Protection",
    items: [
      {
        name: "GDPR",
        description: "General Data Protection Regulation. Applicable to all companies processing EU citizens' data.",
      },
      {
        name: "CCPA",
        description:
          "California Consumer Privacy Act. Applies to businesses that collect California residents' personal data.",
      },
      {
        name: "PIPL",
        description:
          "Personal Information Protection Law. China's data privacy law applicable to processing of Chinese residents' data.",
      },
    ],
  },
  {
    title: "AI Risk Management & Security",
    items: [
      {
        name: "EU AI Act",
        description:
          "European Union's proposed regulation on artificial intelligence. Applies to AI systems used in the EU.",
      },
      {
        name: "NIST AI RMF",
        description: "AI Risk Management Framework by NIST. Voluntary guidance for managing risks in AI systems.",
      },
      {
        name: "ISO 27001",
        description: "Information security management standard. Applicable to organizations of any size or industry.",
      },
    ],
  },
  {
    title: "Bias, Fairness, and Ethics",
    items: [
      {
        name: "IEEE 7000",
        description: "Standard for addressing ethical concerns in system design. Applicable to all technology systems.",
      },
      {
        name: "AI Ethics Guidelines",
        description: "Various guidelines for ethical AI development. Applicable to AI developers and organizations.",
      },
    ],
  },
  {
    title: "Healthcare and Life Sciences",
    items: [
      {
        name: "HIPAA",
        description:
          "Health Insurance Portability and Accountability Act. Applies to healthcare providers and their business associates in the US.",
      },
      {
        name: "GDPR (Health Data)",
        description:
          "Specific GDPR provisions for health data. Applies to organizations processing health data of EU residents.",
      },
    ],
  },
  {
    title: "Financial Services and Banking",
    items: [
      {
        name: "PCI DSS",
        description:
          "Payment Card Industry Data Security Standard. Applies to all organizations that handle credit card information.",
      },
      {
        name: "Basel III",
        description: "Global regulatory framework for banks. Applies to banks and financial institutions worldwide.",
      },
    ],
  },
  {
    title: "Autonomous Systems and Safety",
    items: [
      {
        name: "ISO 26262",
        description: "Functional safety standard for road vehicles. Applies to safety-related systems in vehicles.",
      },
      {
        name: "DO-178C",
        description: "Software considerations in airborne systems. Applies to software-based aerospace systems.",
      },
    ],
  },
  {
    title: "Export Control & Trade Compliance",
    items: [
      {
        name: "EAR",
        description:
          "Export Administration Regulations. Applies to exports of commercial and dual-use items from the US.",
      },
      {
        name: "ITAR",
        description: "International Traffic in Arms Regulations. Applies to defense and military related technologies.",
      },
    ],
  },
  {
    title: "Environmental and Sustainability Compliance",
    items: [
      {
        name: "ISO 14001",
        description: "Environmental management systems standard. Applicable to organizations of any size or industry.",
      },
      {
        name: "GHG Protocol",
        description: "Greenhouse Gas Protocol. Standard for measuring and managing greenhouse gas emissions.",
      },
    ],
  },
  {
    title: "Government and Defense Compliance",
    items: [
      {
        name: "CMMC",
        description: "Cybersecurity Maturity Model Certification. Applies to US Department of Defense contractors.",
      },
      {
        name: "FedRAMP",
        description:
          "Federal Risk and Authorization Management Program. Applies to cloud services used by US government agencies.",
      },
    ],
  },
]

export default function Governance() {
  const [activeItems, setActiveItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemName: string) => {
    setActiveItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemName)) {
        newSet.delete(itemName)
      } else {
        newSet.add(itemName)
      }
      return newSet
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Governance and Compliance</h1>
      <div className="space-y-8">
        {complianceCategories.map((category) => (
          <div key={category.title} className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.items.map((item) => (
                <TooltipProvider key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={`flex items-center justify-between w-full p-3 rounded-md transition-colors ${
                          activeItems.has(item.name)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                        onClick={() => toggleItem(item.name)}
                      >
                        <span>{item.name}</span>
                        <Info className="w-4 h-4 ml-2 flex-shrink-0" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

