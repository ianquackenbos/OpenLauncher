"use client"

import { useState } from "react"
import Link from "next/link"
import { AddIndustryDialog } from "@/components/add-industry-dialog"
import { Building2, Microscope, Briefcase, Brain, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Industry {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export default function RecipesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [industries, setIndustries] = useState<Industry[]>([
    {
      id: "legal",
      title: "Legal",
      description: "AI solutions for legal document analysis, contract review, and compliance.",
      icon: Briefcase,
    },
    {
      id: "healthcare",
      title: "Healthcare",
      description: "Medical imaging analysis, patient data processing, and diagnostic assistance.",
      icon: Microscope,
    },
    {
      id: "finance",
      title: "Finance",
      description: "Risk assessment, fraud detection, and automated trading systems.",
      icon: Building2,
    },
    {
      id: "research",
      title: "Research",
      description: "Data analysis, simulation modeling, and research automation.",
      icon: Brain,
    },
  ])

  const handleAddIndustry = (newIndustry: Industry) => {
    setIndustries([...industries, newIndustry])
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Select Industry</h1>
        <AddIndustryDialog onAddIndustry={handleAddIndustry} />
      </div>

      <p className="text-muted-foreground text-center">Choose your industry to view specialized container recipes</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry) => {
          const IndustryIcon = industry.icon
          return (
            <Link
              key={industry.id}
              href={`/recipes/${industry.id}`}
              className={cn(
                "block p-6 rounded-lg border-2 border-dashed border-border",
                "hover:border-primary hover:bg-primary/5 transition-colors",
                "cursor-pointer"
              )}
              onClick={() => setSelectedIndustry(industry.id)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <IndustryIcon className="w-12 h-12 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">{industry.title}</h2>
                  <p className="text-muted-foreground text-sm">{industry.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {selectedIndustry && (
        <div className="flex justify-center">
          <Link
            href={`/recipes/${selectedIndustry}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold"
          >
            View Recipes
          </Link>
        </div>
      )}
    </div>
  )
}

