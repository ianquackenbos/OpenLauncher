"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const clusterNames = [
  "Nebula",
  "Quantum",
  "Cosmos",
  "Phoenix",
  "Titan",
  "Odyssey",
  "Zenith",
  "Aurora",
  "Orion",
  "Polaris",
]

const configurations = [
  {
    id: "small-cluster",
    specs: "3 nodes • 12 vCPUs • 48 GiB RAM",
    provider: "LAMBDA-LABS",
    price: 0.5,
  },
  {
    id: "medium-cluster",
    specs: "5 nodes • 20 vCPUs • 80 GiB RAM",
    provider: "CRUSOE",
    price: 0.85,
  },
  {
    id: "large-cluster",
    specs: "10 nodes • 40 vCPUs • 160 GiB RAM",
    provider: "GCP",
    price: 1.7,
  },
  {
    id: "xlarge-cluster",
    specs: "20 nodes • 80 vCPUs • 320 GiB RAM",
    provider: "AWS",
    price: 3.4,
  },
]

const KubernetesLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-12 h-12 mx-auto fill-current">
    <path d="M15.9.476L.3 8.3a1.57 1.57 0 0 0-.8 1.1l-2.1 14.3a1.57 1.57 0 0 0 .4 1.3l9.1 10a1.57 1.57 0 0 0 1.3.5h16.6a1.57 1.57 0 0 0 1.3-.5l9.1-10c.3-.4.5-.8.4-1.3L33.5 9.5a1.57 1.57 0 0 0-.8-1.1L17.1.476a1.57 1.57 0 0 0-1.2 0zm.9 3.524l13.5 6.7-2.1 1.8-11.4-5.6-11.3 5.5-2-1.7zM16 10.5l11.9 5.9-2.1 1.8-9.8-4.8-9.8 4.8-2-1.7zm0 6.3l9.9 4.9-2 1.7-7.9-3.9-7.8 3.8-1.9-1.6zm-11.7 6.9l11.4 5.6.3.1.3-.1 11.4-5.6.7 2.4-12.4 6.1-12.4-6.1z" />
  </svg>
)

export default function ClusterSelector() {
  const [selectedCluster, setSelectedCluster] = useState("Nebula")
  const [selectedConfig, setSelectedConfig] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Select your Kubernetes Cluster</h2>
        <p className="text-muted-foreground mb-6">Choose a cluster and configure it below.</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {clusterNames.map((cluster) => (
            <button
              key={cluster}
              onClick={() => setSelectedCluster(cluster)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCluster === cluster
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-zinc-800 text-foreground hover:border-primary hover:bg-secondary"
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-medium mb-2">{cluster}</div>
                <KubernetesLogo />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Select a configuration:</h3>
          <Button variant="link" className="text-primary hover:text-primary/80">
            Advanced Filters
          </Button>
        </div>

        <RadioGroup value={selectedConfig} onValueChange={setSelectedConfig} className="space-y-4">
          {configurations.map((config) => (
            <div
              key={config.id}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 hover:border-primary bg-secondary"
            >
              <div className="flex items-center space-x-4">
                <RadioGroupItem value={config.id} id={config.id} />
                <div>
                  <Label htmlFor={config.id} className="text-foreground">
                    {config.id.replace("-", " ").charAt(0).toUpperCase() + config.id.replace("-", " ").slice(1)}
                  </Label>
                  <div className="text-sm text-muted-foreground">{config.specs}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">{config.provider}</span>
                <span className="text-foreground font-medium">${config.price}/hr</span>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="storage" className="text-foreground">
          Additional Storage (GiB)
        </Label>
        <Input
          id="storage"
          type="number"
          placeholder="..."
          className="mt-2 bg-secondary border-zinc-800 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Cluster Configuration</Button>
    </div>
  )
}

