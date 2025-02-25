"use client"

import { useState, useCallback } from "react"
import { FileText, FileSearch, FileSignature, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import type React from "react"
import { cn } from "@/lib/utils"

interface Recipe {
  id: string
  title: string
  icon: React.ElementType
  frameworks: Array<{
    name: string
    logo: string
  }>
  description: string
}

const legalRecipes: Recipe[] = [
  {
    id: "contract-analysis-review",
    title: "Contract Analysis Review",
    icon: FileText,
    frameworks: [
      {
        name: "OpenWebUI",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user-UR7ALqFgNeBJKvOWNJgB8tRj72TIkh.png",
      },
      {
        name: "Ollama",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/st,small,507x507-pad,600x600,f8f8f8.jpg-rClYcvyxE59XU5TS6VbrPjhUBUFmkV.jpeg",
      },
      {
        name: "Milvus",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-mQfX4Cl5A3WEtq2cjwi0Jn4bnK1hDx.png",
      },
    ],
    description:
      "Legal teams can quickly identify red flags, compare clauses against best practices, and streamline negotiations.",
  },
  {
    id: "legal-document-summarization",
    title: "Legal Document Summarization",
    icon: FileSearch,
    frameworks: [
      {
        name: "OpenWebUI",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user-UR7ALqFgNeBJKvOWNJgB8tRj72TIkh.png",
      },
      {
        name: "Ollama",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/st,small,507x507-pad,600x600,f8f8f8.jpg-rClYcvyxE59XU5TS6VbrPjhUBUFmkV.jpeg",
      },
      {
        name: "Milvus",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-mQfX4Cl5A3WEtq2cjwi0Jn4bnK1hDx.png",
      },
    ],
    description:
      "Summarize long legal documents with Hugging Face's BART or T5 model for abstractive summarization and TensorFlow for fine-tuning the model on specific legal cases.",
  },
  {
    id: "legal-text-classification",
    title: "Legal Text Classification",
    icon: FileSignature,
    frameworks: [
      {
        name: "OpenWebUI",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user-UR7ALqFgNeBJKvOWNJgB8tRj72TIkh.png",
      },
      {
        name: "Ollama",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/st,small,507x507-pad,600x600,f8f8f8.jpg-rClYcvyxE59XU5TS6VbrPjhUBUFmkV.jpeg",
      },
      {
        name: "Milvus",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-mQfX4Cl5A3WEtq2cjwi0Jn4bnK1hDx.png",
      },
    ],
    description:
      "Use spaCy to process legal text and TensorFlow to train a custom classifier that categorizes documents into legal fields (contracts, patents, etc.).",
  },
]

export default function LegalRecipesPage() {
  const [openRecipes, setOpenRecipes] = useState<Set<string>>(new Set())
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)
  const [expandedFrameworks, setExpandedFrameworks] = useState<string | null>(null)
  const [complianceModules, setComplianceModules] = useState<{ [key: string]: boolean }>({})

  const toggleRecipe = (recipeId: string) => {
    setOpenRecipes((prev) => {
      const newOpenRecipes = new Set(prev)
      if (newOpenRecipes.has(recipeId)) {
        newOpenRecipes.delete(recipeId)
      } else {
        newOpenRecipes.add(recipeId)
      }
      return newOpenRecipes
    })
  }

  const toggleFrameworks = useCallback((recipeId: string) => {
    setExpandedFrameworks((prev) => (prev === recipeId ? null : recipeId))
  }, [])

  const toggleComplianceModules = useCallback((recipeId: string) => {
    setComplianceModules((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legal Industry AI Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legalRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className={cn(
              "overflow-hidden transition-all duration-200 cursor-pointer",
              selectedRecipe === recipe.id ? "border-primary" : "",
            )}
            onClick={() => setSelectedRecipe(recipe.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <recipe.icon
                  className={cn("w-8 h-8", selectedRecipe === recipe.id ? "text-primary" : "text-muted-foreground")}
                />
                <CardTitle className={cn(selectedRecipe === recipe.id ? "text-primary" : "")}>{recipe.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleRecipe(recipe.id)
                }}
              >
                <span>{openRecipes.has(recipe.id) ? "Hide Details" : "Show Details"}</span>
                {openRecipes.has(recipe.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              {openRecipes.has(recipe.id) && (
                <div className="mt-4 p-4 bg-muted rounded-md space-y-4">
                  <p className="text-foreground">{recipe.description}</p>
                  <div className="space-y-2">
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFrameworks(recipe.id)
                      }}
                    >
                      <span className="font-semibold">Frameworks:</span>
                      <div className="flex -space-x-2">
                        {recipe.frameworks.map((framework, index) => (
                          <div
                            key={index}
                            className={cn(
                              "w-8 h-8 rounded-full border-2 border-background bg-white flex items-center justify-center transition-all duration-300",
                              expandedFrameworks === recipe.id ? "translate-y-[-4px]" : "",
                            )}
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            <Image
                              src={framework.logo || "/placeholder.svg"}
                              alt={framework.name}
                              width={24}
                              height={24}
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        expandedFrameworks === recipe.id ? "max-h-40" : "max-h-0",
                      )}
                    >
                      {recipe.frameworks.map((framework, index) => (
                        <div
                          key={index}
                          className="bg-primary/10 text-primary text-sm py-1 px-2 rounded mb-1 last:mb-0 transition-all duration-300"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          {framework.name}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm">Activate compliance modules?</span>
                      <Checkbox
                        checked={complianceModules[recipe.id] || false}
                        onCheckedChange={() => toggleComplianceModules(recipe.id)}
                        className={cn(
                          "transition-colors duration-200",
                          complianceModules[recipe.id] ? "bg-primary border-primary" : "bg-background border-input",
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedRecipe && (
        <div className="mt-6 flex justify-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Deploy Selected Recipe</Button>
        </div>
      )}
    </div>
  )
}

