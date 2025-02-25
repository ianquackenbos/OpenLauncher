"use client"

import { useState, useEffect } from "react"
import { Box, CuboidIcon as Cube, ChevronRight, ShieldCheck, Eye, Shield, Terminal, Check, Network } from "lucide-react"
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
    mlOpsFrameworks: [],
    agenticFrameworks: [],
    databases: [],
  })
  const [allSuseSelected, setAllSuseSelected] = useState(false)
  const [activeTab, setActiveTab] = useState("components")

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

  const mlOpsFrameworks = [
    {
      name: "Kubeflow",
      icon: <Box className="w-8 h-8 text-blue-500" />,
      description: "Open-source machine learning platform designed for Kubernetes",
      version: "1.7",
    },
    {
      name: "MLflow",
      icon: <Box className="w-8 h-8 text-blue-700" />,
      description: "Open-source platform for managing the end-to-end machine learning lifecycle",
      version: "2.3",
    },
  ]

  const agenticFrameworks = [
    {
      name: "LangChain",
      icon: <Network className="w-8 h-8 text-yellow-500" />,
      description: "Agent framework for building LLM-powered applications.",
      version: "0.1.0",
    },
    {
      name: "Autogen",
      icon: <Network className="w-8 h-8 text-blue-500" />,
      description: "Multi-agent orchestration for autonomous tasks.",
      version: "0.2.0",
    },
    {
      name: "Langflow",
      icon: <Network className="w-8 h-8 text-green-500" />,
      description: "Drag-and-drop UI for LangChain workflows.",
      version: "0.3.0",
    },
    {
      name: "CrewAI",
      icon: <Network className="w-8 h-8 text-purple-500" />,
      description: "AI collaboration platform for multi-agent systems.",
      version: "0.1.0",
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

  useEffect(() => {
    setAllSuseSelected(selectedItems.suse.length === suseItems.length)
  }, [selectedItems.suse])

  const toggleItem = (section: string, itemName: string) => {
    setSelectedItems((prev) => {
      const updatedSection = prev[section].includes(itemName)
        ? prev[section].filter((name) => name !== itemName)
        : [...prev[section], itemName]
      if (section === "suse") {
        setAllSuseSelected(updatedSection.length === suseItems.length)
      }
      return { ...prev, [section]: updatedSection }
    })
  }

  const toggleAllSuse = () => {
    const newSelectedState = !allSuseSelected
    setAllSuseSelected(newSelectedState)
    setSelectedItems((prev) => ({
      ...prev,
      suse: newSelectedState ? suseItems.map((item) => item.name) : [],
    }))
  }

  const renderItem = (section: string, item: any) => (
    <div
      key={item.name}
      className={`relative border-2 rounded-lg p-6 transition-colors cursor-pointer ${
        selectedItems[section].includes(item.name)
          ? "border-primary bg-primary/10"
          : "border-dashed border-zinc-800 hover:border-zinc-700"
      }`}
      onClick={() => toggleItem(section, item.name)}
    >
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-zinc-600 flex items-center justify-center">
        {selectedItems[section].includes(item.name) && <Check className="w-4 h-4 text-primary" />}
      </div>
      <div className="flex items-start gap-4">
        {item.icon}
        <div>
          <h3 className="font-medium mb-1 text-gray-900 dark:text-white">{item.name}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-xs mb-2">{item.description}</p>
          {item.version && <p className="text-gray-600 dark:text-gray-400 text-xs">Version: {item.version}</p>}
        </div>
      </div>
    </div>
  )

  const renderSection = (title: string, items: any[], section: string) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-900 dark:text-white text-xl font-semibold">{title}</h2>
        {section === "suse" && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAllSuse}
            className="text-xs text-gray-900 dark:text-white dark:border-gray-600"
          >
            {allSuseSelected ? "Deselect All" : "Select All"}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => renderItem(section, item))}
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <div className="text-gray-900 dark:text-white">
        <div className="mb-4 border-b border-border">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Select your components</h1>
          <Tabs defaultValue="components" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-secondary">
              <TabsTrigger value="components">All Components</TabsTrigger>
              <TabsTrigger value="suse-supported">SUSE Supported</TabsTrigger>
              <TabsTrigger value="custom">Custom Components</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <Tabs defaultValue="components" value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="components" className="space-y-8">
              {renderSection("SUSE", suseItems, "suse")}
              {renderSection("ML Frameworks", frameworks, "mlFrameworks")}
              {renderSection("ML Ops Frameworks", mlOpsFrameworks, "mlOpsFrameworks")}
              {renderSection("Agentic Frameworks", agenticFrameworks, "agenticFrameworks")}
              {renderSection("Databases", databases, "databases")}
              <div className="mt-8">
                <Button className="w-full py-2 text-base font-semibold bg-green-600 hover:bg-green-700 text-white">
                  Deploy
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="suse-supported" className="space-y-8">
              {renderSection("SUSE", suseItems, "suse")}
              {renderSection(
                "ML Frameworks",
                frameworks.filter((item) => item.checkmark),
                "mlFrameworks",
              )}
              {renderSection("ML Ops Frameworks", mlOpsFrameworks, "mlOpsFrameworks")}
              {renderSection(
                "Databases",
                databases.filter((item) => item.checkmark),
                "databases",
              )}
              <div className="mt-8">
                <Button className="w-full py-2 text-base font-semibold bg-green-600 hover:bg-green-700 text-white">
                  Deploy
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="custom">
              <div className="bg-secondary rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2 text-white dark:text-white">Custom Docker Image</h2>
                <p className="text-amber-600 dark:text-amber-400 text-sm mb-6 font-medium">
                  * Some custom components may produce unexpected results if they interfere with the host system. Use
                  with discretion.
                </p>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="docker-url"
                      className="block text-sm font-medium mb-2 text-white dark:text-gray-300"
                    >
                      Docker Image URL
                    </label>
                    <Input
                      id="docker-url"
                      placeholder="nvidia/cuda"
                      className="bg-background border-input text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="entrypoint"
                      className="block text-sm font-medium mb-2 text-white dark:text-gray-300"
                    >
                      Custom Docker Entrypoint Command (optional)
                    </label>
                    <Input id="entrypoint" className="bg-background border-input text-gray-900 dark:text-white" />
                  </div>

                  <Collapsible open={isCredentialsOpen} onOpenChange={setIsCredentialsOpen} className="space-y-2">
                    <CollapsibleTrigger className="flex items-center text-sm text-white hover:text-white/80 dark:text-gray-300 dark:hover:text-white">
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${isCredentialsOpen ? "transform rotate-90" : ""}`}
                      />
                      <span>Docker Registry Credentials (Optional)</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pt-4">
                      <Input
                        placeholder="Username"
                        className="bg-background border-input text-gray-900 dark:text-white"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="bg-background border-input text-gray-900 dark:text-white"
                      />
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 text-white dark:bg-buttonLight dark:text-primary dark:hover:bg-buttonHover dark:active:bg-buttonActive">
                      Use Image
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}

