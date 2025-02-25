"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Copy } from "lucide-react"

export default function TeamPage() {
  const [inviteLink, setInviteLink] = useState("")
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold mb-6">Team</h1>
      <div className="space-y-8">
        {/* Invite Section */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-3 text-muted-foreground mb-4">
            <Users className="w-5 h-5" />
            <span>Invite new members by generating an invite link</span>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 mb-4"
            onClick={() =>
              setInviteLink("https://console.brev.dev/invite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
            }
          >
            Generate Invite Link
          </Button>

          {inviteLink && (
            <>
              <p className="text-sm text-muted-foreground mb-2">
                Copy the link and send it to your team to join your organization:
              </p>
              <p className="text-xs text-muted-foreground mb-2">(it expires in 7 days)</p>
              <div className="flex items-center space-x-2 bg-secondary p-2 rounded-md border border-border">
                <code className="text-sm text-foreground flex-1 overflow-hidden text-ellipsis">{inviteLink}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink)
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Team Members Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Team Members
          </h2>

          <div className="mb-4">
            <Input placeholder="Search team members" className="max-w-md bg-secondary border-input text-foreground" />
          </div>

          <div className="bg-card rounded-lg overflow-hidden border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-secondary/50">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-primary">
                      <AvatarFallback>IQ</AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">Ian Quackenbos</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">ian@suse.com</TableCell>
                  <TableCell>
                    <span className="bg-secondary text-foreground px-2 py-1 rounded text-sm">Owner</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

