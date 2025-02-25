"use client"

import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle({ theme, setTheme }: { theme: string | undefined; setTheme: (theme: string) => void }) {
  const [mounted, setMounted] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setMounted(true)
    setChecked(theme === "dark")
  }, [theme])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-white dark:-rotate-90 dark:scale-0" />
      <Switch
        checked={checked}
        onCheckedChange={(isChecked) => {
          setChecked(isChecked)
          setTheme(isChecked ? "dark" : "light")
        }}
        className="bg-suse-green dark:bg-zinc-700"
      >
        <span className="sr-only">Toggle theme</span>
      </Switch>
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
    </div>
  )
}

