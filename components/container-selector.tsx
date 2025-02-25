"use client"

import { useState } from "react"
import { Box, CuboidIcon as Cube, ChevronRight, ShieldCheck, Eye, Shield, Terminal, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function ComponentSelector() {
  const [pythonVersion, setPythonVersion] = useState("3.10")
  const [cudaVersion, setCudaVersion] = useState("12.0.1")
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string[] }>({
    suse: [],
    mlFrameworks: [],
    database: [],
  })

  const suseItems = [
    {
      name: "SUSE Security",
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      description: "Comprehensive security solutions for your infrastructure",
    },
    {
      name: "SUSE Observability",
      icon: <Eye className="w-8 h-8 text-blue-500" />,
      description: "Monitor and analyze your systems in real-time",
    },
    {
      name: "SUSE Guardrails",
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      description: "Implement and enforce security policies across your environment",
    },
    {
      name: "SUSE Multi-linux Manager",
      icon: <Terminal className="w-8 h-8 text-purple-500" />,
      description: "Centralized management for multiple Linux distributions",
    },
  ]

  const frameworks = [
    {
      name: "PyTorch",
      icon: <Cube className="w-8 h-8 text-orange-500" />,
      description: "docker.io/pytorch/pytorch:2.2.0-cuda12.1-cudnn8-runtime",
      checkmark: true,
    },
    {
      name: "Keras",
      icon: <Cube className="w-8 h-8 text-red-500" />,
      description: "tensorflow/tensorflow:2.15.0-gpu",
    },
    {
      name: "TensorFlow",
      icon: <Cube className="w-8 h-8 text-blue-500" />,
      description: "tensorflow/tensorflow:2.15.0-gpu",
    },
  ]

  const databases = [
    {
      name: "Chroma",
      icon: <Box className="w-8 h-8 text-green-500" />,
      description: "chroma:latest",
      checkmark: true,
    },
    {
      name: "Postgres",
      icon: <Box className="w-8 h-8 text-green-500" />,
      description: "postgres:latest",
    },
    {
      name: "Milvus",
      icon: <Box className="w-8 h-8 text-green-500" />,
      description: "milvusdb/milvus:latest",
      checkmark: true,
    },
    {
      name: "Qdrant",
      icon: <Box className="w-8 h-8 text-green-500" />,
      description: "qdrant/qdrant:latest",
    },
    {
      name: "Pinecone",
      icon: <Box className="w-8 h-8 text-green-500" />,
      description: "pinecone:latest",
    },
    {
      name: "Weaviate",
      icon: <Box className="w-8 h-8 text-green-500" />,
      description: "semitechnologies/weaviate:latest",
    },
  ]

  const toggleItem = (section: string, itemName: string) => {
    setSelectedItems((prev) => {
      const updatedSection = prev[section].includes(itemName)
        ? prev[section].filter((name) => name !== itemName)
        : [...prev[section], itemName]
      return { ...prev, [section]: updatedSection }
    })
  }

  const renderItem = (section: string, item: any) => (
    <div
      key={item.name}
      className={`relative border-2 rounded-lg p-6 transition-colors cursor-pointer ${
        selectedItems[section].includes(item.name)
          ? "border-green-500 bg-green-500/10"
          : "border-dashed border-zinc-800 hover:border-zinc-700"
      }`}
      onClick={() => toggleItem(section, item.name)}
    >
      {item.checkmark && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="flex items-start gap-4">
        {item.icon}
        <div>
          <h3 className="font-medium mb-2">{item.name}</h3>
          <p className="text-zinc-400 text-xs">{item.description}</p>
        </div>
      </div>
    </div>
  )

  const renderSection = (title: string, items: any[], section: string) => (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => renderItem(section, item))}
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <Tabs defaultValue="components" className="w-full">
          <div className="flex justify-between mb-6">
            <TabsList className="bg-zinc-900">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="suse-supported">SUSE Supported</TabsTrigger>
              <TabsTrigger value="custom">Custom Components</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="components" className="space-y-8">
            {renderSection("SUSE", suseItems, "suse")}
            {renderSection("ML Frameworks", frameworks, "mlFrameworks")}
            {renderSection("Database", databases, "database")}
          </TabsContent>

          <TabsContent value="suse-supported" className="space-y-8">
            {renderSection("SUSE", suseItems, "suse")}
            {renderSection(
              "ML Frameworks",
              frameworks.filter((item) => item.checkmark),
              "mlFrameworks",
            )}
            {renderSection(
              "Database",
              databases.filter((item) => item.checkmark),
              "database",
            )}
          </TabsContent>

          <TabsContent value="custom">
            <div className="bg-zinc-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Custom Docker Image</h2>
              <p className="text-red-400 text-sm mb-6">
                * Some custom components may produce unexpected results if they interfere with the host system. Use with
                discretion.
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="docker-url" className="block text-sm font-medium mb-2">
                    Docker Image URL
                  </label>
                  <Input id="docker-url" placeholder="nvidia/cuda" className="bg-zinc-950 border-zinc-800" />
                </div>

                <div>
                  <label htmlFor="entrypoint" className="block text-sm font-medium mb-2">
                    Custom Docker Entrypoint Command (optional)
                  </label>
                  <Input id="entrypoint" className="bg-zinc-950 border-zinc-800" />
                </div>

                <Collapsible open={isCredentialsOpen} onOpenChange={setIsCredentialsOpen} className="space-y-2">
                  <CollapsibleTrigger className="flex items-center text-sm text-zinc-400 hover:text-white">
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${isCredentialsOpen ? "transform rotate-90" : ""}`}
                    />
                    <span>Docker Registry Credentials (Optional)</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <Input placeholder="Username" className="bg-zinc-950 border-zinc-800" />
                    <Input type="password" placeholder="Password" className="bg-zinc-950 border-zinc-800" />
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex justify-end">
                  <Button className="bg-green-600 hover:bg-green-700">Use Image</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}

