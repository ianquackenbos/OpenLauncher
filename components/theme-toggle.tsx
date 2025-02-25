"use client"

import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-white dark:-rotate-90 dark:scale-0" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(isChecked) => setTheme(isChecked ? "dark" : "light")}
        className="bg-suse-green dark:bg-zinc-700"
      >
        <span className="sr-only">Toggle theme</span>
      </Switch>
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
    </div>
  )
}

