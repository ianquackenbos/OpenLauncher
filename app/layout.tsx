"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import WorkspacePanel from "@/components/workspace-panel"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showWorkspacePanel, setShowWorkspacePanel] = useState(false)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=SUSE:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <nav className="bg-suse-green border-b border-suse-mint/20">
              <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <Link href="/instances" className="flex items-center space-x-2">
                      <Image
                        src="/img.png"
                        alt="SUSE Logo"
                        width={32}
                        height={16}
                        className="w-8 h-4"
                      />
                      <span className="text-xl font-semibold font-suse text-white">OpenLauncher</span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-8">
                    <Link
                      href="/instances"
                      className="text-white hover:text-white/80 transition-colors font-quicksand text-base"
                    >
                      Instances
                    </Link>
                    <Link
                      href="/launchables"
                      className="text-white hover:text-white/80 transition-colors font-quicksand text-base"
                    >
                      Launchables
                    </Link>
                    <Link
                      href="/governance"
                      className="text-white hover:text-white/80 transition-colors font-quicksand text-base"
                    >
                      Governance
                    </Link>
                    <Link
                      href="/recipes"
                      className="text-white hover:text-white/80 transition-colors font-quicksand text-base"
                    >
                      Recipes
                    </Link>
                    <Link
                      href="/team"
                      className="text-white hover:text-white/80 transition-colors font-quicksand text-base"
                    >
                      Team
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <button
                    onClick={() => setShowWorkspacePanel(true)}
                    className="text-white hover:text-white/80 transition-colors font-quicksand text-base"
                  >
                    demo-workspace
                  </button>
                </div>
              </div>
            </nav>

            <main className="max-w-screen-2xl mx-auto px-6 py-8">{children}</main>
            <WorkspacePanel isOpen={showWorkspacePanel} onClose={() => setShowWorkspacePanel(false)} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"


