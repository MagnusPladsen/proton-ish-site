import { useEffect, useState } from "react"

// The newest release's version, read from GitHub. Null until it answers, or when it can't.
export function useLatestRelease() {
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch("https://api.github.com/repos/MagnusPladsen/Proton-ish/releases/latest", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((release: { tag_name?: string } | null) => {
        if (release?.tag_name) setVersion(release.tag_name.replace(/^v/, ""))
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return version
}
