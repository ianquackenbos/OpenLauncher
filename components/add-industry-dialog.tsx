"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import * as Icons from "lucide-react"
import React from "react"
import { LucideIcon } from 'lucide-react'

const iconOptions = [
  { value: "Briefcase", label: "Briefcase" },
  { value: "Building", label: "Building" },
  { value: "Factory", label: "Factory" },
  { value: "Globe", label: "Globe" },
  { value: "Home", label: "Home" },
  { value: "Library", label: "Library" },
  { value: "Scale", label: "Scale" },
  { value: "Shield", label: "Shield" },
  { value: "Ship", label: "Ship" },
  { value: "Shopping", label: "Shopping" },
]

interface AddIndustryDialogProps {
  onAddIndustry: (industry: {
    id: string
    title: string
    description: string
    icon: LucideIcon
  }) => void
}

export function AddIndustryDialog({ onAddIndustry }: AddIndustryDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && description && selectedIcon) {
      const id = title.toLowerCase().replace(/\s+/g, "-")
      const IconComponent = Icons[selectedIcon as keyof typeof Icons] as LucideIcon
      onAddIndustry({
        id,
        title,
        description,
        icon: IconComponent,
      })
      setOpen(false)
      setTitle("")
      setDescription("")
      setSelectedIcon("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-black/90" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Industry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Industry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Industry Name</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter industry name"
              className="bg-background"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Industry Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter industry description"
              className="bg-background"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={selectedIcon} onValueChange={setSelectedIcon}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    <div className="flex items-center gap-2">
                      {Icons[icon.value as keyof typeof Icons] &&
                        React.createElement(Icons[icon.value as keyof typeof Icons], {
                          className: "h-4 w-4",
                        })}
                      {icon.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Add Industry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

