import { useEffect, useState } from "react"

// Abacus is a free counter with a JSON API, made for static sites: /hit adds one and returns the count, /get only reads it
const counter = "https://abacus.jasoncameron.dev"
const key = "proton-ish-site/visits"
const counted = "proton-ish:visit-counted"

function countedThisSession() {
  try {
    return sessionStorage.getItem(counted) === "1"
  } catch {
    return false
  }
}

// Page visits, one per browser session; local builds only read the count. Stays null if the counter doesn't answer.
export function useVisits() {
  const [visits, setVisits] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const local = ["localhost", "127.0.0.1"].includes(location.hostname)
    const action = local || countedThisSession() ? "get" : "hit"

    fetch(`${counter}/${action}/${key}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { value?: number } | null) => {
        if (typeof body?.value !== "number") return
        setVisits(body.value)
        if (action === "hit") {
          try {
            sessionStorage.setItem(counted, "1")
          } catch {
            // Without session storage, a reload counts again
          }
        }
      })
      .catch(() => {})

    return () => controller.abort()
  }, [])

  return visits
}
