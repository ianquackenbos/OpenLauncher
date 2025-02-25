"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface Port {
  name: string
  port: string
}

export default function PortConfiguration() {
  const [ports, setPorts] = useState<Port[]>([
    {
      name: "Inference Server",
      port: "3000",
    },
  ])

  const addPort = () => {
    setPorts([...ports, { name: "", port: "" }])
  }

  const removePort = (index: number) => {
    setPorts(ports.filter((_, i) => i !== index))
  }

  const updatePort = (index: number, field: keyof Port, value: string) => {
    setPorts(
      ports.map((port, i) => {
        if (i === index) {
          return { ...port, [field]: value }
        }
        return port
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Expose Ports</h2>
        <p className="text-muted-foreground mb-6">Configure ports you want to make accessible</p>
      </div>

      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Port</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ports.map((port, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                <TableCell className="p-2">
                  <Input
                    value={port.name}
                    onChange={(e) => updatePort(index, "name", e.target.value)}
                    className="bg-background border-input"
                    placeholder="Service name"
                  />
                </TableCell>
                <TableCell className="p-2">
                  <Input
                    value={port.port}
                    onChange={(e) => updatePort(index, "port", e.target.value)}
                    className="bg-background border-input"
                    placeholder="Port number"
                    type="number"
                  />
                </TableCell>
                <TableCell className="p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePort(index)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          variant="outline"
          onClick={addPort}
          className="w-full border-dashed border-2 bg-background hover:bg-accent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Port
        </Button>
      </div>

      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Ports</Button>
    </div>
  )
}

