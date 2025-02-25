"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ClusterSelector from "./cluster-selector"
import PortConfiguration from "./port-configuration"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CreateLaunchable() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-white">
        <Link href="/launchables" className="hover:text-foreground dark:text-white">
          Launchables
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground dark:text-white">Create</span>
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Create Launchable</h1>
          <p className="text-gray-700 dark:text-white">
            Configure 1-Click Launchables to share your environment from the software down to the hardware
          </p>
        </div>
        <Button variant="outline" className="border-zinc-800 bg-secondary hover:bg-secondary/80 text-white">
          Reset Configurations
        </Button>
      </div>

      {/* Actions */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          {[
            { id: "compute", label: "Compute" },
            { id: "container", label: "Container" },
            { id: "files", label: "Files" },
            { id: "ports", label: "Expose Ports" },
          ].map((item) => (
            <Button
              key={item.id}
              variant="outline"
              className={`border-zinc-800 ${
                activeSection === item.id
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-secondary text-white hover:bg-secondary/80"
              }`}
              onClick={() => toggleSection(item.id)}
            >
              {activeSection === item.id ? `- ${item.label}` : `+ ${item.label}`}
            </Button>
          ))}
        </div>

        {/* Configuration Area */}
        <div className="border-2 border-dashed border-zinc-800 rounded-lg p-6">
          {activeSection === "compute" ? (
            <ClusterSelector />
          ) : activeSection === "ports" ? (
            <PortConfiguration />
          ) : activeSection === "container" ? (
            <div className="text-center text-muted-foreground dark:text-white">
              Container configuration coming soon...
            </div>
          ) : activeSection === "files" ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Add files</h2>
                <p className="text-muted-foreground dark:text-white mb-4">
                  Add a Github/Gitlab repository or jupyter notebook to your launchable
                </p>
                <p className="text-sm text-muted-foreground dark:text-white mb-6">
                  (You&apos;ll be able to access a JupyterLab regardless if you upload a file or not)
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm mb-2 block text-gray-900 dark:text-white">Enter Github/Gitlab URL</label>
                  <Input
                    placeholder="https://..."
                    className="bg-secondary border-zinc-800 text-foreground dark:text-white"
                  />
                </div>
                <Button variant="link" className="text-primary hover:text-primary/80 p-0 dark:text-white">
                  Show Examples
                </Button>
                <div>
                  <Button className="bg-primary text-white hover:bg-primary/90">Add file</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground dark:text-white py-12">
              Add configurations below to your launchable
            </div>
          )}
        </div>

        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <label htmlFor="launchable-name" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Name Launchable <span className="text-destructive">*</span>
            </label>
            <Input
              id="launchable-name"
              placeholder="descriptive-launchable-name"
              className="bg-secondary border-zinc-800 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white"
            />
          </div>
          <Button className="bg-primary text-white hover:bg-primary/90 dark:bg-buttonLight dark:text-black dark:hover:bg-buttonHover dark:active:bg-buttonActive">
            Generate Launchable
          </Button>
        </div>
      </div>
      <div>
        <Button className="w-full py-6 text-xl font-semibold bg-green-600 hover:bg-green-700 text-white dark:text-black">
          Deploy
        </Button>
      </div>
    </div>
  )
}

