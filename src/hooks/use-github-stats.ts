import { useEffect, useState } from "react"

const api = "https://api.github.com/repos/MagnusPladsen/Proton-ish"

export type GitHubStats = { version: string | null; stars: number | null; downloads: number | null }

type Release = { tag_name: string; draft: boolean; prerelease: boolean; assets: { name: string; download_count: number }[] }

// Read in the visitor's browser from GitHub's public API; each value stays null until it answers, or if it can't.
// Downloads count Proton-ish.zip only: appcast.xml is fetched by the app's update checks.
export function useGitHubStats(): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({ version: null, stars: null, downloads: null })

  useEffect(() => {
    const controller = new AbortController()
    const get = (path: string) =>
      fetch(api + path, { signal: controller.signal }).then((response) => (response.ok ? response.json() : null))

    get("").then((repo: { stargazers_count?: number } | null) => {
      if (typeof repo?.stargazers_count === "number") setStats((s) => ({ ...s, stars: repo.stargazers_count! }))
    }).catch(() => {})

    get("/releases?per_page=100").then((releases: Release[] | null) => {
      if (!Array.isArray(releases)) return
      const downloads = releases
        .flatMap((release) => release.assets)
        .filter((asset) => asset.name.endsWith(".zip"))
        .reduce((sum, asset) => sum + asset.download_count, 0)
      const latest = releases.find((release) => !release.draft && !release.prerelease)
      setStats((s) => ({ ...s, downloads, version: latest ? latest.tag_name.replace(/^v/, "") : s.version }))
    }).catch(() => {})

    return () => controller.abort()
  }, [])

  return stats
}

export const formatCount = (n: number) => new Intl.NumberFormat("en", { notation: n >= 10_000 ? "compact" : "standard" }).format(n)
