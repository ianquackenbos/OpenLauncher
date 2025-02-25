"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Copy, AlertOctagon } from "lucide-react"

interface WorkspacePanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function WorkspacePanel({ isOpen, onClose }: WorkspacePanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] bg-background border-border text-foreground p-6">
        <div className="space-y-8">
          {/* Organization Section */}
          <div>
            <SheetHeader>
              <SheetTitle className="text-foreground">Your Organization</SheetTitle>
            </SheetHeader>
            <p className="text-sm text-muted-foreground mb-4">Manage your organization here</p>
            <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
              <code className="text-sm text-foreground flex-1 overflow-hidden text-ellipsis">
                org-2srBhdOcCbTd4nASxzPxEhKXN48
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Cloud Connection Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect your cloud</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your cloud account to Gitpod to deploy the instances in your cloud.
            </p>
            <div className="flex space-x-4 mb-4">
              <Button variant="outline" className="bg-secondary border-border hover:bg-accent text-foreground">
                <img src="/placeholder.svg?height=20&width=20" className="mr-2 h-5 w-5" alt="AWS" />
                Connect AWS
              </Button>
              <Button variant="outline" className="bg-secondary border-border hover:bg-accent text-foreground">
                <img src="/placeholder.svg?height=20&width=20" className="mr-2 h-5 w-5" alt="GCP" />
                Connect GCP
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Already connected your cloud?{" "}
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto">
                Click here to refresh.
              </Button>
            </p>
          </div>

          {/* Connected Clouds */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Connected Clouds:</h4>
            <div className="bg-card p-3 rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                  <img src="/placeholder.svg?height=24&width=24" alt="NVIDIA" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Paperspace Gradient</p>
                  <p className="text-xs text-muted-foreground">Added 2/13/2025, 11:29 AM</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Status:</span>
                    <span className="ml-1 text-xs flex items-center text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1"></span>
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Limit */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resource Limit</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your organization has a resource usage limit of $5 per hour
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current usage: $NaN per hour</span>
                <span className="text-muted-foreground">Available usage: $5 per hour</span>
              </div>
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "0%" }}></div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Need more resources? Reach out to us at{" "}
              <a href="mailto:info@suse.com" className="text-primary hover:text-primary/80">
                info@suse.com
              </a>
            </p>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertOctagon className="w-5 h-5 text-destructive mr-2" />
              Danger Zone
            </h3>
            <Button variant="destructive" className="w-full bg-destructive hover:bg-destructive/90">
              Delete This Organization
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

