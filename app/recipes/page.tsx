"use client"

import { useState } from "react"
import Link from "next/link"
import { AddIndustryDialog } from "@/components/add-industry-dialog"
import * as Icons from "lucide-react"

interface Industry {
  id: string
  title: string
  description: string
  icon: keyof typeof Icons
}

export default function RecipesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [industries, setIndustries] = useState<Industry[]>([
    {
      id: "legal",
      title: "Legal",
      description: "Specialized environments for legal document processing and analysis",
      icon: "Scale",
    },
    {
      id: "healthcare",
      title: "Healthcare",
      description: "Secure environments for healthcare data analysis and research",
      icon: "Heart",
    },
    {
      id: "finance",
      title: "Finance",
      description: "Financial modeling and analysis environments",
      icon: "Banknote",
    },
    {
      id: "retail",
      title: "Retail",
      description: "E-commerce and retail analytics solutions",
      icon: "ShoppingBag",
    },
    {
      id: "education",
      title: "Education",
      description: "Learning environments and educational tools",
      icon: "GraduationCap",
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      description: "Industrial automation and manufacturing analytics",
      icon: "Factory",
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
          const Icon = Icons[industry.icon as keyof typeof Icons]
          return (
            <div
              key={industry.id}
              className={`p-6 rounded-lg border-2 ${
                selectedIndustry === industry.id
                  ? "border-primary bg-primary/10"
                  : "border-dashed border-zinc-800 hover:border-zinc-700"
              } transition-colors cursor-pointer`}
              onClick={() => setSelectedIndustry(industry.id)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Icon className="w-12 h-12 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">{industry.title}</h2>
                  <p className="text-muted-foreground text-sm">{industry.description}</p>
                </div>
              </div>
            </div>
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

