"use client"

import { useState } from "react"
import { Info, ChevronDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface ComplianceBox {
  id: string
  title: string
  description: string
}

interface ComplianceCategory {
  title: string
  boxes: ComplianceBox[]
}

const categories: ComplianceCategory[] = [
  {
    title: "Data Privacy & Protection",
    boxes: [
      {
        id: "gdpr",
        title: "GDPR",
        description: "General Data Protection Regulation. Applicable to all companies processing EU citizens' data.",
      },
      {
        id: "ccpa",
        title: "CCPA",
        description:
          "California Consumer Privacy Act. Applies to businesses that collect California residents' personal data.",
      },
      {
        id: "pipl",
        title: "PIPL",
        description:
          "Personal Information Protection Law. China's data privacy law applicable to processing of Chinese residents' data.",
      },
    ],
  },
  {
    title: "AI Risk Management & Security",
    boxes: [
      {
        id: "eu-ai-act",
        title: "EU AI Act",
        description:
          "European Union's comprehensive regulation for artificial intelligence systems and their use within the EU.",
      },
      {
        id: "nist-ai",
        title: "NIST AI RMF",
        description: "Framework for managing risks associated with AI systems throughout their lifecycle.",
      },
      {
        id: "iso-27001",
        title: "ISO 27001",
        description: "International standard for information security management systems.",
      },
    ],
  },
  {
    title: "Bias, Fairness, and Ethics",
    boxes: [
      {
        id: "fairness-metrics",
        title: "Fairness Metrics",
        description: "Statistical measures to assess algorithmic bias and discrimination.",
      },
      {
        id: "ethics-guidelines",
        title: "Ethics Guidelines",
        description: "Principles and guidelines for ethical AI development and deployment.",
      },
    ],
  },
  {
    title: "Healthcare and Life Sciences",
    boxes: [
      {
        id: "hipaa",
        title: "HIPAA",
        description: "Health Insurance Portability and Accountability Act. US healthcare privacy standard.",
      },
      {
        id: "health-gdpr",
        title: "GDPR Health",
        description: "Special provisions for health data under GDPR.",
      },
    ],
  },
  {
    title: "Financial Services and Banking",
    boxes: [
      {
        id: "pci-dss",
        title: "PCI DSS",
        description: "Payment Card Industry Data Security Standard for handling credit card information.",
      },
      {
        id: "basel-iii",
        title: "Basel III",
        description: "Global regulatory standards for bank capital adequacy and market liquidity.",
      },
    ],
  },
  {
    title: "Autonomous Systems and Safety",
    boxes: [
      {
        id: "iso-26262",
        title: "ISO 26262",
        description: "Functional safety standard for road vehicles and automotive systems.",
      },
      {
        id: "do-178c",
        title: "DO-178C",
        description: "Software considerations in airborne systems and equipment certification.",
      },
    ],
  },
  {
    title: "Export Control & Trade Compliance",
    boxes: [
      {
        id: "ear",
        title: "EAR",
        description: "Export Administration Regulations for commercial and dual-use items.",
      },
      {
        id: "itar",
        title: "ITAR",
        description: "International Traffic in Arms Regulations for defense articles and services.",
      },
    ],
  },
  {
    title: "Environmental and Sustainability",
    boxes: [
      {
        id: "iso-14001",
        title: "ISO 14001",
        description: "Environmental management systems standard.",
      },
      {
        id: "ghg-protocol",
        title: "GHG Protocol",
        description: "Standards for greenhouse gas emissions accounting and reporting.",
      },
    ],
  },
  {
    title: "Government and Defense",
    boxes: [
      {
        id: "cmmc",
        title: "CMMC",
        description: "Cybersecurity Maturity Model Certification for defense contractors.",
      },
      {
        id: "fedramp",
        title: "FedRAMP",
        description: "Federal Risk and Authorization Management Program for cloud services.",
      },
    ],
  },
  {
    title: "ML Ops Frameworks",
    boxes: [
      {
        id: "kubeflow",
        title: "Kubeflow",
        description: "Open-source machine learning platform designed for Kubernetes.",
      },
      {
        id: "mlflow",
        title: "MLflow",
        description: "Open-source platform for managing the end-to-end machine learning lifecycle.",
      },
    ],
  },
]

export default function GovernancePage() {
  const [activeBoxes, setActiveBoxes] = useState<Set<string>>(new Set())
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const toggleBox = (boxId: string) => {
    const newActiveBoxes = new Set(activeBoxes)
    if (newActiveBoxes.has(boxId)) {
      newActiveBoxes.delete(boxId)
    } else {
      newActiveBoxes.add(boxId)
    }
    setActiveBoxes(newActiveBoxes)
  }

  const toggleCategory = (categoryTitle: string) => {
    const newOpenCategories = new Set(openCategories)
    if (newOpenCategories.has(categoryTitle)) {
      newOpenCategories.delete(categoryTitle)
    } else {
      newOpenCategories.add(categoryTitle)
    }
    setOpenCategories(newOpenCategories)
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Compliance Categories</h1>
      <div className="space-y-4">
        {categories.map((category) => (
          <Collapsible
            key={category.title}
            open={openCategories.has(category.title)}
            onOpenChange={() => toggleCategory(category.title)}
            className={cn(
              "border-2 border-border rounded-lg overflow-hidden transition-all duration-200",
              openCategories.has(category.title) ? "bg-accent/30" : "bg-card",
            )}
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-accent/50 transition-colors duration-200">
              <h2 className="text-xl font-semibold transition-colors duration-200 text-foreground">{category.title}</h2>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-200 text-muted-foreground",
                  openCategories.has(category.title) && "transform rotate-180",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-background">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.boxes.map((box) => (
                  <TooltipProvider key={box.id}>
                    <div
                      className={cn(
                        "relative rounded-lg border-2 transition-all duration-200 cursor-pointer p-4",
                        activeBoxes.has(box.id)
                          ? "border-green-500 bg-green-500/10"
                          : "border-border hover:border-primary/50 hover:bg-accent/50",
                      )}
                      onClick={() => toggleBox(box.id)}
                    >
                      <h3 className="font-medium text-lg mb-2">{box.title}</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="absolute top-2 right-2 p-1 rounded-full hover:bg-accent transition-colors duration-200">
                            <Info className="w-4 h-4 text-muted-foreground" />
                            <span className="sr-only">More information about {box.title}</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>{box.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

