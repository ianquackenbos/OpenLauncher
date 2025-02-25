"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import ComponentSelector from "@/components/component-selector"

export default function InstancesPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [jupyterEnabled, setJupyterEnabled] = useState(false)

  const renderDockerCompose = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Docker Compose Link</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Enter a Github or Gitlab Link to your docker compose file"
            className="bg-secondary border-input text-foreground flex-1"
          />
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
            <Upload className="w-4 h-4 mr-2" />
            Upload and Validate
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="jupyter-compose" checked={jupyterEnabled} onCheckedChange={setJupyterEnabled} />
        <Label htmlFor="jupyter-compose" className="text-sm text-muted-foreground">
          Preinstall Jupyter
        </Label>
      </div>
    </div>
  )

  const renderComponentSelector = () => (
    <div className="space-y-6">
      <ComponentSelector />
      <div className="flex items-center space-x-2">
        <Switch id={`jupyter-${selectedMode}`} checked={jupyterEnabled} onCheckedChange={setJupyterEnabled} />
        <Label htmlFor={`jupyter-${selectedMode}`} className="text-sm text-muted-foreground">
          Preinstall Jupyter
        </Label>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold mb-6">Select your Container</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Container Mode */}
        <div
          className={`p-6 rounded-lg border-2 ${
            selectedMode === "container"
              ? "border-primary bg-primary/10"
              : "border-dashed border-zinc-800 hover:border-zinc-700"
          } transition-colors cursor-pointer`}
          onClick={() => setSelectedMode("container")}
        >
          <h2 className="text-xl font-semibold mb-2">Container Mode</h2>
          <p className="text-muted-foreground text-sm">Select a docker container to bootstrap your instance</p>
        </div>

        {/* Docker Compose */}
        <div
          className={`p-6 rounded-lg border-2 ${
            selectedMode === "compose"
              ? "border-primary bg-primary/10"
              : "border-dashed border-zinc-800 hover:border-zinc-700"
          } transition-colors cursor-pointer`}
          onClick={() => setSelectedMode("compose")}
        >
          <h2 className="text-xl font-semibold mb-2">Docker Compose</h2>
          <p className="text-muted-foreground text-sm">Upload a docker compose file to start your instance</p>
        </div>

        {/* VM Mode */}
        <div
          className={`p-6 rounded-lg border-2 ${
            selectedMode === "vm"
              ? "border-primary bg-primary/10"
              : "border-dashed border-zinc-800 hover:border-zinc-700"
          } transition-colors cursor-pointer`}
          onClick={() => setSelectedMode("vm")}
        >
          <h2 className="text-xl font-semibold mb-2">VM Mode (harvester)</h2>
          <p className="text-muted-foreground text-sm">
            Start an instance without a container. Access services will be installed on the host machine
          </p>
        </div>
      </div>

      {/* Selected Mode Content */}
      {selectedMode && (
        <div className="mt-8 p-6 border border-zinc-800 rounded-lg">
          {selectedMode === "container" && renderComponentSelector()}
          {selectedMode === "compose" && renderDockerCompose()}
          {selectedMode === "vm" && renderComponentSelector()}
        </div>
      )}
    </div>
  )
}

