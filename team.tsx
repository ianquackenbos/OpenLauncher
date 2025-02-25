"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, SnailIcon as Lizard } from "lucide-react"
import Link from "next/link"
import WorkspacePanel from "./components/workspace-panel"
import { useState } from "react"

export default function TeamPage() {
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
              <Link href="#" className="text-zinc-400 hover:text-white">
                Launchables
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Explore
              </Link>
              <Link href="#" className="text-white border-b-2 border-white">
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

      <main className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Team</h1>
          <p className="text-zinc-400">Manage your team members and their permissions</p>
        </div>

        {/* Invite Section */}
        <div className="bg-zinc-900/50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 text-zinc-400 mb-4">
            <Users className="w-5 h-5" />
            <span>Invite new members by generating an invite link</span>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">Generate Invite Link</Button>
        </div>

        {/* Team Members Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members
          </h2>

          <div className="mb-4">
            <Input placeholder="Search team members" className="max-w-md bg-zinc-900 border-zinc-800 text-white" />
          </div>

          <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Name</TableHead>
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-zinc-800">
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-green-600">
                      <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                    John Stapleton
                  </TableCell>
                  <TableCell className="text-zinc-400">kubecon2022@gmail.com</TableCell>
                  <TableCell>
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-sm">Owner</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <WorkspacePanel isOpen={showWorkspacePanel} onClose={() => setShowWorkspacePanel(false)} />
    </div>
  )
}

