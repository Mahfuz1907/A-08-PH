"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Toaster } from "sonner"

// No external source: React serves the server snapshot during hydration and
// then re-reads the snapshot, so this flips from false -> true right after
// mount without a setState-in-effect.
const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function ThemeToaster() {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return <Toaster theme={mounted && resolvedTheme === "dark" ? "dark" : "light"} />
}
