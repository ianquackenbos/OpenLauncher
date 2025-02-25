"use client"

import { useState } from "react"
import Link from "next/link"
import { SnailIcon as Lizard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WorkspacePanel from "./components/workspace-panel"
import ClusterSelector from "./cluster-selector"

export default function CreateLaunchable() {
  const [showCompute, setShowCompute] = useState(false)
  const [showWorkspacePanel, setShowWorkspacePanel] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Lizard className="w-6 h-6 text-green-500" />
              <span className="text-lg font-semibold">OpenLauncher</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-zinc-400 hover:text-white">
                Instances
              </Link>
              <Link href="#" className="text-white border-b-2 border-white">
                Launchables
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Explore
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Team
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Billing
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowWorkspacePanel(true)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              demo-workspace
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Create Launchable</h1>
            <p className="text-zinc-400">
              Configure 1-Click Launchables to share your environment from the software down to the hardware
            </p>
          </div>
          <Button variant="outline" className="text-zinc-400 border-zinc-700 hover:bg-zinc-800">
            Reset Configurations
          </Button>
        </div>

        {/* Configuration Area */}
        <div className="border border-dashed border-zinc-800 rounded-lg p-12 mb-8">
          {showCompute ? (
            <ClusterSelector />
          ) : (
            <div className="text-center text-zinc-400">Add configurations below to your launchable</div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className={`bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white ${showCompute ? "bg-green-600 hover:bg-green-700" : ""}`}
              onClick={() => setShowCompute(!showCompute)}
            >
              {showCompute ? "- Cluster" : "+ Cluster"}
            </Button>
            <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white">
              + Container
            </Button>
            <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white">
              + Files
            </Button>
            <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white">
              + Expose Ports
            </Button>
          </div>

          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <label htmlFor="launchable-name" className="block text-sm mb-2">
                Name Launchable <span className="text-red-500">*</span>
              </label>
              <Input
                id="launchable-name"
                placeholder="descriptive-launchable-name"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700">Generate Launchable</Button>
          </div>
        </div>
      </main>
      <WorkspacePanel isOpen={showWorkspacePanel} onClose={() => setShowWorkspacePanel(false)} />
    </div>
  )
}

